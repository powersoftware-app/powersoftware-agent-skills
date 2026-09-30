// publish.mjs — upload the spec's local assets, inject their objectNames, then submit.
//   node publish.mjs --spec ../templates/product.license.example.json            (TRIAL_FIRST 先用后付)
//   node publish.mjs --spec ../templates/product.license.payfirst.example.json    (PAY_FIRST 先付后用)
//   node publish.mjs --spec ../templates/product.license.quota.example.json           (QUOTA 按量额度 · TRIAL_FIRST)
//   node publish.mjs --spec ../templates/product.license.quota.payfirst.example.json   (QUOTA 按量额度 · PAY_FIRST)
//   node publish.mjs --spec ../templates/product.server.example.json             (SERVER_SOFTWARE 服务端软件)
//   node publish.mjs --spec ../templates/product.digital-good.example.json        (DIGITAL_GOOD 数字商品)
//   node publish.mjs --spec ../templates/product.promotion.example.json           (ONLY_PROMOTION 仅推广)
//   node publish.mjs --spec ....json --dry-run     (upload + assemble only, no submit)
//   node publish.mjs --spec ....json --form PLUGIN (override the software form / 软件形态)
//   node publish.mjs --spec ....json --product-id 123  (edit this product explicitly)
//   node publish.mjs --spec ....json --new             (force CREATE a new product)
// Duplicate guard: re-publishing the SAME product must carry its productId so /product/submit
// EDITS instead of inserting a duplicate. The id is auto-read from `ps-product.json` (matched by
// productName) unless overridden by --product-id / --new / spec.product.productId. See below.
// Software form resolution order: --form  >  spec.product.baseInfo.productForm  >  auto-detect
// from the current working directory. If none yields a value, the script STOPS and tells the
// agent to ask the user which form to publish (see the resolution block below).
// The spec separates `assets` (local file paths) from `product` (the payload). Media MUST be
// uploaded first: the payload stores the returned objectName (a relative URI), never a local path.
import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname, basename, join } from 'node:path';
import { parseArgs, loadConfig, api, uploadFile, ok, fail } from './lib.mjs';

const args = parseArgs();
const cfg = loadConfig();
if (typeof args.spec !== 'string') fail('usage: node publish.mjs --spec path/to/product.json [--dry-run]');

const specPath = resolve(args.spec);
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const baseDir = dirname(specPath);
const assets = spec.assets || {};
const product = spec.product || {};
const baseInfo = product.baseInfo || fail('spec.product.baseInfo is required');
const introduce = product.introduce || (product.introduce = {});
const at = (p) => resolve(baseDir, p); // resolve asset path relative to the spec file

// ---- Resolve software form (形态): --form > spec > auto-detect(cwd) > ask the user -------
const PRODUCT_FORMS = ['CLIENT_SOFTWARE', 'SERVER_SOFTWARE', 'ONLY_PROMOTION', 'DIGITAL_GOOD', 'PLUGIN'];
// LICENSE products are only allowed on these two forms; NON-license products may use any of the 5.
const LICENSE_FORMS = ['CLIENT_SOFTWARE', 'PLUGIN'];

const readdirSafe = (d) => { try { return readdirSync(d); } catch { return []; } };

/**
 * Best-effort software-form detection from a project directory. Deliberately conservative:
 * returns null when there is no strong signal, so the caller prompts the user instead of guessing.
 */
function detectProductForm(dir) {
  const has = (p) => existsSync(join(dir, p));
  const read = (p) => { try { return readFileSync(join(dir, p), 'utf8'); } catch { return ''; } };
  // Browser extension (MV2/MV3) -> PLUGIN
  if (/"manifest_version"\s*:\s*[23]/.test(read('manifest.json'))) return 'PLUGIN';
  // Desktop client frameworks / installer tooling -> CLIENT_SOFTWARE
  const pkg = read('package.json');
  if (/"(electron|electron-builder|@tauri-apps[\\/]api|@tauri-apps[\\/]cli)"\s*:/.test(pkg)) return 'CLIENT_SOFTWARE';
  if (has('src-tauri') || has('electron-builder.yml') || has('electron-builder.json5') || has('electron-builder.json')) return 'CLIENT_SOFTWARE';
  if (readdirSafe(dir).some((f) => /\.(nsi|nsh)$/i.test(f))) return 'CLIENT_SOFTWARE';
  return null;
}

const cliForm = typeof args.form === 'string' && args.form ? args.form : null;
let form = cliForm || baseInfo.productForm || null;
let formSource = cliForm ? '--form' : (baseInfo.productForm ? 'spec' : null);
if (!form) {
  const detected = detectProductForm(process.cwd());
  if (detected) { form = detected; formSource = 'auto-detect'; }
}
if (!form) {
  fail(
    'cannot determine the software form (productForm / 软件形态).\n' +
    `  Not passed via --form, not set in spec.product.baseInfo.productForm, and no clear signal in the working directory (${process.cwd()}).\n` +
    '  → ASK THE USER which form this product is, then re-run with: --form <VALUE>\n' +
    `  Valid values: ${PRODUCT_FORMS.join(' | ')}\n` +
    `  NOTE: any form can be published; only LICENSE products are restricted to ${LICENSE_FORMS.join(' | ')}.`
  );
}
if (!PRODUCT_FORMS.includes(form)) {
  fail(`invalid productForm '${form}'. Valid: ${PRODUCT_FORMS.join(' | ')}. If unsure, ask the user.`);
}
const isLicense = baseInfo.licenseEnabled === true || baseInfo.salesModel === 'TRIAL_FIRST'
  || (Array.isArray(baseInfo.licenseEditions) && baseInfo.licenseEditions.length > 0);
if (isLicense && !LICENSE_FORMS.includes(form)) {
  fail(`a LICENSE product (licenseEnabled / TRIAL_FIRST) must be ${LICENSE_FORMS.join(' or ')} — got '${form}'. Ask the user to correct the form, then re-run with --form CLIENT_SOFTWARE (or PLUGIN).`);
}
// ---- License billing model (授权计费模型): EDITION 版本分层（默认） / QUOTA 按量额度包 -------------
// Mirrors ProductSchema superRefine so an invalid spec fails locally with an actionable message
// instead of a remote i18n error. Absence of the field means EDITION (存量语义), which is fine.
const pricingModel = baseInfo.licensePricingModel ?? 'EDITION';
if (isLicense && pricingModel !== 'EDITION' && pricingModel !== 'QUOTA') {
  fail(`invalid licensePricingModel '${pricingModel}' — must be 'EDITION' (版本分层：按时长/买断分档，升级可补差价) or 'QUOTA' (按量额度：售卖额度包，用完再买、额度累加), or omit it (= EDITION).`);
}
const isQuota = isLicense && pricingModel === 'QUOTA';
if (isQuota) {
  // QUOTA：每行版本必须带 quotaAmount（额度包数量 1–9999999）；行唯一键 = code|billingPeriod|quotaAmount；
  // 额度包价格不要求递增（递增是 EDITION 专属规则）；trialDays 可缺省（按次试用用 trialCount）。
  const editions = Array.isArray(baseInfo.licenseEditions) ? baseInfo.licenseEditions : [];
  if (editions.length < 1) {
    fail('QUOTA (按量额度) needs ≥1 licenseEditions row — each row is a quota pack (额度包). Add packs, e.g. { code, billingPeriod, quotaAmount, productPrice }.');
  }
  const keys = new Set();
  for (const e of editions) {
    if (e.quotaAmount == null || Number(e.quotaAmount) < 1) {
      fail(`QUOTA edition '${e.code ?? '?'}' is missing quotaAmount — every pack row needs quotaAmount >= 1 (次数，如 20/100).`);
    }
    const key = `${e.code ?? ''}|${e.billingPeriod ?? 'PERMANENT'}|${e.quotaAmount}`;
    if (keys.has(key)) {
      fail(`licenseEditions duplicate row '${key}' — under QUOTA the unique key is code + billingPeriod + quotaAmount (同一版本+有效期可配多个额度包).`);
    }
    keys.add(key);
  }
} else if (isLicense && pricingModel === 'EDITION') {
  // EDITION（版本分层）试用只按天：trialCount 不是该模型的维度，后端表单不展示、落库不注入，随请求下发只会造成隐性配置。
  const withCount = (baseInfo.licenseEditions ?? []).filter((e) => Number(e.trialCount) > 0);
  if (withCount.length) {
    const stripped = baseInfo.licenseEditions.map((e) => { if (Number(e.trialCount) > 0) { const { trialCount, trialCountPeriod, ...rest } = e; return rest; } return e; });
    baseInfo.licenseEditions = stripped;
    ok(`EDITION（版本分层）不启用按次试用：已自动忽略 ${withCount.length} 行的 trialCount/trialCountPeriod（按次试用请用 licensePricingModel="QUOTA"，按天试用用 trialDays）。`);
  }
}
// Price pre-check mirrors the platform validator (ProductSchema superRefine): for
// CLIENT_SOFTWARE / SERVER_SOFTWARE / DIGITAL_GOOD / PLUGIN that are NOT TRIAL_FIRST (PAY_FIRST or
// unset → defaults PAY_FIRST), receivePayment.productPrice must be >= 1 (no ¥0 buyout) — regardless
// of whether the product enables licenses. QUOTA (按量额度) is exempt: revenue comes from the quota
// packs (licenseEditions row prices), so the product itself may be a ¥0 download. ONLY_PROMOTION has
// no price requirement. Fail early.
const PRICE_REQUIRED_FORMS = ['CLIENT_SOFTWARE', 'SERVER_SOFTWARE', 'DIGITAL_GOOD', 'PLUGIN'];
if (baseInfo.salesModel !== 'TRIAL_FIRST' && pricingModel !== 'QUOTA' && PRICE_REQUIRED_FORMS.includes(form)) {
  const pp = product.receivePayment?.productPrice;
  if (pp == null || Number(pp) < 1) {
    fail(`${form} (PAY_FIRST 先付后用) needs spec.product.receivePayment.productPrice >= 1 — no ¥0 buyout; ask the user for the product price and re-run. (ONLY_PROMOTION / TRIAL_FIRST do not require a price.)`);
  }
}
baseInfo.productForm = form; // back-fill so the payload carries the resolved form
ok(`productForm = ${form} (source: ${formSource}).`);

// ---- Product-name brandability advisory (SEO 品牌词: 短 / 独特 / 可拼写 / 可被搜) ----------------
// ADVISORY ONLY — the platform does NOT validate name quality; a purely descriptive name still
// publishes fine. We surface concrete reasons so the agent can raise it ONCE before submitting.
// The final naming call belongs to the user. Silencable with --ok-name (for re-runs / acknowledged names).
function nameQualityIssues(raw) {
  const issues = [];
  const s = String(raw ?? '').trim();
  if (!s) return issues; // empty name is a hard platform error, not a naming tip
  const cjk = (s.match(/[\u4e00-\u9fff]/g) || []).length;
  const latinWords = (s.match(/[A-Za-z][A-Za-z0-9]*/g) || []);
  const GENERIC = ['\u670d\u52a1', '\u8f6f\u4ef6', '\u5de5\u5177', '\u52a9\u624b', '\u5e73\u53f0', '\u7cfb\u7edf', '\u7ba1\u5bb6', '\u5927\u5e08', '\u795e\u5668', '\u7cbe\u7075', '\u63d2\u4ef6', '\u5ba2\u6237\u7aef',
    'service', 'services', 'software', 'tool', 'tools', 'assistant', 'platform', 'system', 'manager', 'app'];
  const low = s.toLowerCase();
  const hits = [...new Set(GENERIC.filter((t) => low.includes(t.toLowerCase())))];
  if (cjk > 6 || (cjk === 0 && latinWords.length > 3)) {
    issues.push('\u504f\u957f\u3001\u8bfb\u8d77\u6765\u50cf\u4e00\u53e5\u529f\u80fd\u63cf\u8ff0\uff08\u54c1\u724c\u540d\u5b9c\u77ed\uff1a\u4e2d\u6587 \u22646 \u5b57 / \u82f1\u6587 \u22643 \u8bcd\uff09\uff0c\u7528\u6237\u590d\u8ff0\u548c\u641c\u7d22\u65f6\u6253\u4e0d\u5168');
  }
  if (hits.length) {
    issues.push(`\u542b\u901a\u7528/\u63cf\u8ff0\u6027\u8bcd\u300c${hits.join('\u3001')}\u300d\u2014\u2014\u8fd9\u4e9b\u8bcd\u4eba\u4eba\u5728\u7528\uff0cGoogle \u96be\u628a\u6d41\u91cf\u805a\u5408\u6210\u201c\u4f60\u201d\u8fd9\u4e2a\u54c1\u724c\u5b9e\u4f53\uff0c\u4e14\u7b49\u4e8e\u548c\u5168\u7ad9\u62a2\u8bcd`);
  }
  return issues;
}
const nameIssues = args['ok-name'] ? [] : nameQualityIssues(baseInfo.productName);
if (nameIssues.length) {
  console.log(
    '\n\u26a0 \u4ea7\u54c1\u540d\u54c1\u724c\u6027\u63d0\u793a / Product-name advisory\uff08\u4e0d\u5f71\u54cd\u63d0\u4ea4\uff0c\u662f\u5426\u6539\u540d\u7531\u4f60\u5b9a\uff09:\n' +
    `  \u5f53\u524d productName = '${baseInfo.productName}'\n` +
    nameIssues.map((i) => `  - ${i}`).join('\n') + '\n' +
    '  \u2192 \u5efa\u8bae\uff1a\u6ce8\u518c\u540d\u53ef\u4e0d\u52a8\uff0c\u4f46\u8865\u4e00\u4e2a\u77ed\u3001\u72ec\u7279\u3001\u53ef\u62fc\u5199\u7684\u54c1\u724c\u522b\u540d\uff08\u5982 SchemaSync\uff09\u7528\u4e8e\u843d\u5730\u9875/\u8be6\u60c5\u9875\u951a\u6587\u672c\u4e0e\u5916\u94fe\uff0c\u957f\u671f\u5582\u54c1\u724c\u5b9e\u4f53\u3002\n' +
    '  \u2192 \u8ba4\u53ef\u73b0\u540d\u5e76\u8df3\u8fc7\u672c\u63d0\u793a\uff1a\u52a0 --ok-name \u91cd\u8dd1\u3002\n'
  );
}

// ---- Phase 4: upload assets, collect objectNames ------------------------------

if (assets.coverImage) {
  baseInfo.coverImage = await uploadFile(cfg, at(assets.coverImage), 'product_cover_picture');
} else if (!baseInfo.coverImage) {
  fail('spec.assets.coverImage (or a pre-uploaded baseInfo.coverImage objectName) is required');
}

if (Array.isArray(assets.detailImages)) {
  const names = [];
  for (const img of assets.detailImages) names.push(await uploadFile(cfg, at(img), 'product_detail_picture'));
  introduce.images = names; // validator requires 3–20 images
  if (names.length < 3) fail(`introduce.images needs 3–20 detail images, got ${names.length}`);
}

// Installer / source package -------------------------------------------------
// `form` was resolved (and back-filled into baseInfo) before any upload, above.
async function injectExecutable(localPath) {
  const objectName = await uploadFile(cfg, at(localPath), 'product_file');
  return { name: basename(localPath), url: objectName };
}
if (form === 'SERVER_SOFTWARE' || form === 'DIGITAL_GOOD') {
  if (assets.sourceCodeFile) baseInfo.sourceCodeFile = await injectExecutable(assets.sourceCodeFile);
} else if (form === 'CLIENT_SOFTWARE' || form === 'PLUGIN') {
  // Allow either a pre-built clientSoftware tree with local `file` markers, or a single installer.
  if (Array.isArray(baseInfo.clientSoftware)) {
    for (const sys of baseInfo.clientSoftware) {
      for (const pkg of sys.softwarePackages || []) {
        if (pkg.executableFile && pkg.executableFile.file) {
          const ef = await injectExecutable(pkg.executableFile.file);
          pkg.executableFile = { name: ef.name, url: ef.url };
        }
      }
    }
  } else if (assets.installer) {
    const meta = spec.installerMeta || {};
    const ef = await injectExecutable(assets.installer);
    baseInfo.clientSoftware = [{
      system: meta.system || 'Windows',
      softwarePackages: [{ platform: meta.platform || 'EXE', executableFile: ef }],
    }];
  }
}

const hasExecutable = (baseInfo.clientSoftware || []).some((s) =>
  (s.softwarePackages || []).some((p) => p.executableFile && p.executableFile.url));
if ((form === 'CLIENT_SOFTWARE' || form === 'PLUGIN') && !hasExecutable) {
  fail('CLIENT_SOFTWARE/PLUGIN needs at least one installer: set spec.assets.installer or a clientSoftware[].executableFile.file');
}
// SERVER_SOFTWARE / DIGITAL_GOOD carry their downloadable package in `sourceCodeFile`
// (businessType product_file), NOT the client `clientSoftware` tree. The platform requires it.
if ((form === 'SERVER_SOFTWARE' || form === 'DIGITAL_GOOD') && !baseInfo.sourceCodeFile) {
  fail(`${form} needs a package: set spec.assets.sourceCodeFile (uploaded as baseInfo.sourceCodeFile).`);
}
// DIGITAL_GOOD additionally needs a category id and must NOT carry any deploy fields.
if (form === 'DIGITAL_GOOD') {
  if (baseInfo.digitalGoodsTypeId == null) {
    fail('DIGITAL_GOOD needs baseInfo.digitalGoodsTypeId (数字商品类型 id — from GET /frontApi/digitalGoodsType/all).');
  }
  const rp = product.receivePayment || {};
  if (rp.deployPrice != null || rp.deployIncome != null || baseInfo.afterSalesFreeDay != null || baseInfo.serverSoftwareDeployRole != null) {
    fail('DIGITAL_GOOD must NOT carry deploy/promotion fields (deployPrice, deployIncome, afterSalesFreeDay, serverSoftwareDeployRole) — remove them.');
  }
}
// SERVER_SOFTWARE optional deploy fee must not exceed 2× the product price (platform rule).
if (form === 'SERVER_SOFTWARE' && product.receivePayment?.deployPrice != null && product.receivePayment?.productPrice != null
  && Number(product.receivePayment.deployPrice) > Number(product.receivePayment.productPrice) * 2) {
  fail('SERVER_SOFTWARE deployPrice must be <= productPrice × 2 (platform rule).');
}

ok('assets uploaded & payload assembled.');

// ---- Reuse an existing productId so re-publishing EDITS instead of creating a duplicate ----
// `/product/submit` treats a payload WITHOUT productId as "create new" and WITH productId as
// "edit". If this product was published before, Phase 6 recorded its identity (incl. productId)
// in `ps-product.json`. Re-publishing the SAME product MUST carry that productId, otherwise every
// run inserts a brand-new product. Resolution order (highest priority first):
//   --product-id <id>                 edit this explicit id
//   --new                             force CREATE, ignore any recorded id
//   spec.product.productId            already present in the spec file
//   ps-product.json (workspace)       auto-reuse, but ONLY when productName matches
{
  const pjPath = typeof args['product-json'] === 'string'
    ? resolve(args['product-json'])
    : join(process.cwd(), 'ps-product.json');
  let recorded = null;
  if (existsSync(pjPath)) { try { recorded = JSON.parse(readFileSync(pjPath, 'utf8')); } catch { recorded = null; } }
  const sameName = !!recorded
    && String(recorded.productName ?? '').trim() === String(baseInfo.productName ?? '').trim();

  let id = null;
  let idSource = null;
  if (args.new) {
    idSource = '--new (force create)';
  } else if (typeof args['product-id'] === 'string') {
    id = Number(args['product-id']); idSource = '--product-id';
  } else if (product.productId !== undefined && product.productId !== null) {
    id = Number(product.productId); idSource = 'spec.product.productId';
  } else if (sameName && recorded.productId != null) {
    id = Number(recorded.productId); idSource = basename(pjPath);
  }

  if (Number.isFinite(id) && id > 0) {
    product.productId = id; // triggers the EDIT branch — no duplicate created
    ok(`editing EXISTING product productId=${id} (source: ${idSource}) — will NOT create a duplicate.`);
    console.log('   ⚠ 编辑分支要求 softwareVersion 高于线上版本；若版本未提升，后端会拒绝（请提升 spec.baseInfo.softwareVersion）。');
  } else {
    delete product.productId; // ensure the CREATE branch
    if (args.new) ok('--new set: creating a NEW product (any recorded id ignored).');
    else if (recorded && !sameName) console.log(`   ℹ 工作空间已有 ${basename(pjPath)}（productName=${recorded.productName ?? '?'}），但产品名不同 — 视为新产品，将新建。若其实是同一产品，请核对 productName 或用 --product-id 指定。`);
    else ok('no prior productId found — this will CREATE a new product.');
  }
}

if (args['dry-run']) {
  console.log(JSON.stringify(product, null, 2));
  process.exit(0);
}

// ---- Phase 5: submit --------------------------------------------------------
const resp = await api(cfg, '/product/submit', { body: product, auth: true });
if (resp.success !== true) fail(`product/submit rejected: ${resp.message || resp.code || JSON.stringify(resp)}`);

const productId = resp.content?.productId;
const productUniqueCode = resp.content?.productUniqueCode;
ok(`product submitted for review, productId=${productId}. Status -> PENDING_RELEASE (platform review).`);

// ---- Phase 6: surface the 产品唯一编码 (productUniqueCode) ------------------
// The submit response now carries productUniqueCode — the stable, never-changing identifier the
// client license SDK is initialised with: new LicenseClient({ productUniqueCode }). It is NOT a
// secret (visible on the product page). Echo it and record it in the workspace so the license
// integration (see the integrate-license skill) can pick it up. Older deployed backends may not
// return it yet — degrade gracefully rather than fail the publish.
console.log('\n================= 发布成功 / Published =================');
console.log(`  产品名称 productName     : ${baseInfo.productName ?? '(n/a)'}`);
console.log(`  软件版本 softwareVersion  : ${baseInfo.softwareVersion ?? '(n/a)'}`);
console.log(`  商品ID   productId        : ${productId ?? '(n/a)'}`);
if (productUniqueCode) {
  console.log(`  产品唯一编码 productUniqueCode: ${productUniqueCode}   ← 授权接入用这个`);
} else {
  console.log('  产品唯一编码 productUniqueCode: (接口未返回 — 部署版本可能尚未支持；请到开发者后台产品页查看，并更新 ps-frontend-service)');
}
console.log('======================================================\n');

// Record the identity in the current workspace (the project being published) so the license
// integration can read it. Override the target with --emit <path>; suppress entirely with --no-emit.
if (productUniqueCode && !args['no-emit']) {
  const outPath = typeof args.emit === 'string' ? resolve(args.emit) : join(process.cwd(), 'ps-product.json');
  const record = {
    productUniqueCode,
    productId: productId ?? null,
    productName: baseInfo.productName ?? null,
    productForm: form,
    softwareVersion: baseInfo.softwareVersion ?? null,
    licenseEnabled: isLicense,
    updatedAt: new Date().toISOString(),
  };
  try {
    writeFileSync(outPath, JSON.stringify(record, null, 2) + '\n', 'utf8');
    ok(`wrote product identity -> ${outPath}`);
  } catch (e) {
    console.error(`⚠ could not write ${outPath}: ${e.message}（上方展示不受影响 / display above is unaffected）`);
  }
  console.log(
    '下一步 / Next: 把 productUniqueCode 应用到当前工作空间的授权接入处（integrate-license）：\n' +
    `  new LicenseClient({ productUniqueCode: '${productUniqueCode}' })\n` +
    '  若当前工作空间未接入授权、或没有对应的授权位置，则只需把上面的编码提供给用户。'
  );
}
