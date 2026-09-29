---
name: publish-product
description: Publish a software product end-to-end on the PowerSoftware platform (powersoftware.app / powersoftware.cn). Use when repeatedly listing/uploading products (license-enabled or not), onboarding a partner account, or automating the product-publish flow. For license products it covers both TRIAL_FIRST (try-before-buy) and PAY_FIRST (pay-before-use) sales models, plus user registration, partner application (with a mandatory human approval gate), cover/detail image + installer upload, and product submission.
---

# Publish a Product (PowerSoftware)

Playbook to repeatedly publish software products of ANY form on PowerSoftware — **license** products
(`CLIENT_SOFTWARE` / `PLUGIN`, TRIAL_FIRST or PAY_FIRST) and **non-license** products
(`SERVER_SOFTWARE` / `DIGITAL_GOOD` / `ONLY_PROMOTION`). The
platform's upload page has two prerequisites that this skill encodes:

1. **The account must be registered AND approved as a partner** (`DEVELOPER` role) — and the
   approval is a **manual review by platform operators**, which the agent must NOT try to bypass.
2. **Images/installer must be uploaded first**; the product payload only stores the returned
   `objectName` (a relative URI). You cannot save a product without its cover image.

All endpoints live under `{baseUrl}/frontApi` and are authenticated by the `SESSION_ID` cookie.
Ready-made dependency-free Node scripts (Node 18+) are in [`scripts/`](scripts/). Field-by-field
payload rules, enums and error codes are in [reference.md](reference.md).

## Prerequisites / config

- Node.js 18+.
- Copy [`scripts/config.example.json`](scripts/config.example.json) → `scripts/config.local.json`
  and set `baseUrl`, `email`, `password`.
  - The default **baseUrl is the overseas prod site** `https://www.powersoftware.app/frontApi`
    (the platform's primary site; CN users reach the same backend via `powersoftware.cn`).
    Turnstile on login/register is currently disabled server-side, so scripted flows work
    against `.app` directly. If a `captcha required` error ever reappears (Turnstile re-enabled),
    switch `baseUrl` to the **CN site** `https://www.powersoftware.cn/frontApi`, whose
    login/register skip Turnstile by design.
- `config.local.json`, `.ps-session.json` and `assets/` are git-ignored — never commit them.

Run all commands from the `scripts/` directory.

## Workflow — track these phases

Copy this checklist and mark progress. **Phase 2 is a hard stop.**

```
- [ ] Phase 0: Check whether a partner account already exists (skip 1–3 if so)
- [ ] Phase 1: Register a user
- [ ] Phase 2: Apply as partner  ⛔ then WAIT for manual operator approval
- [ ] Phase 3: Re-login to acquire the DEVELOPER role
- [ ] Phase 3.5: Determine the software form (productForm) — detect from the project, else ASK THE USER
- [ ] Phase 3.6: For license products, confirm the billing model (licensePricingModel) — EDITION 版本分层 or QUOTA 按量额度
- [ ] Phase 4: Upload assets (cover + 3–20 detail images + installer) → collect objectNames
- [ ] Phase 5: Submit the product for review
- [ ] Phase 6: Surface the productUniqueCode and apply it to the workspace's license integration
```

### Phase 0 — Do you already have a partner account?

If yes, just `node login.mjs` and go to Phase 3's role check. Registration and partner
onboarding are one-time per email; do not repeat them.

### Phase 1 — Register a user

```bash
node register.mjs --send-code      # emails a 6-digit code (FRONTEND_USER_REGISTER)
node register.mjs --code 123456    # completes registration
node login.mjs                     # stores the SESSION_ID cookie
```

Password rules: 6–20 chars, must contain both a letter and a digit.

### Phase 2 — Apply as partner (⛔ human gate)

```bash
node apply-partner.mjs --send-code                                   # emails a code (FRONTEND_UPDATE_DEVELOPER_INFO)
node apply-partner.mjs --code 123456 --profile ../templates/partner.example.json
```

This submits an onboarding application in `PENDING` state and notifies operators via DingTalk.

**⛔ STOP HERE — this is a mandatory manual review that must not be automated.** Tell the user:

> Partner application submitted. An operator must approve it at the admin console
> (`https://admin.powersoftware.app`). When you tell me it's approved, I'll continue.

The `DEVELOPER` role is granted **only at login time** when the developer `auditStatus === PASS`.
Submitting `/developer/save` alone does **not** grant publish rights. Additional account rules:
CN country requires `alipayAccount`; every other country requires `paypalAccount`. `currency`
is a 3-letter code.

### Phase 3 — Re-login to acquire the DEVELOPER role

After the user confirms approval:

```bash
node login.mjs
```

`login.mjs` prints `developer: true|false`. Proceed only when it is `true`; otherwise the
approval hasn't landed yet — wait and re-login.

### Phase 3.5 — Determine the software form (productForm)

`productForm` drives which fields are valid and which asset the installer maps to, so resolve it
**before** uploading. `publish.mjs` resolves it in this order and back-fills the payload:

1. `--form <VALUE>` on the command line (explicit override, wins).
2. `spec.product.baseInfo.productForm` if the spec already sets it.
3. **Auto-detect from the current working directory** — the software being published. Signals:
   a `manifest.json` with `manifest_version` → `PLUGIN`; Electron/Tauri/`electron-builder`/NSIS
   markers → `CLIENT_SOFTWARE`.

All five forms are publishable. `productForm` picks the valid fields and which asset becomes the
downloadable package:

| productForm | 中文 | package asset | license? |
|---|---|---|---|
| `CLIENT_SOFTWARE` | 客户端软件 | `assets.installer` → `clientSoftware[]` | optional |
| `PLUGIN` | 浏览器插件 | `assets.installer` → `clientSoftware[]` | optional |
| `SERVER_SOFTWARE` | 服务端软件 | `assets.sourceCodeFile` → `sourceCodeFile` | no |
| `DIGITAL_GOOD` | 数字商品 | `assets.sourceCodeFile` → `sourceCodeFile` | no |
| `ONLY_PROMOTION` | 仅推广 | (none — links out only) | no |

Only **license** products are restricted to `CLIENT_SOFTWARE` / `PLUGIN`; the other three forms are
always non-license. See "Product rules the payload must satisfy" below for each form's required
fields and the matching template.

**If none of the three resolution steps yields a value** (no analysable project directory, or its
signals are absent/ambiguous), do **NOT** guess. `publish.mjs` stops with a prompt — relay it and
ask the user to choose a form, then re-run with the chosen `--form`. Ask in the user's own terms,
listing all five, e.g.:

> 这个产品是什么形态？(1) 桌面/客户端软件 CLIENT_SOFTWARE  (2) 浏览器插件 PLUGIN
>  (3) 服务端软件 SERVER_SOFTWARE  (4) 数字商品 DIGITAL_GOOD  (5) 仅推广 ONLY_PROMOTION
> —— 告诉我选哪个（需要授权码的话只能选 1 或 2）。

Only after the user answers, re-run `node publish.mjs --spec … --form <their choice>`.

### Phase 3.6 — License billing model: 版本分层 vs 按量额度 (`licensePricingModel`)

Only for **license** products (`licenseEnabled: true`). `baseInfo.licensePricingModel` chooses how
the license is sold. **ASK the user which model fits their product — do not default silently**
(absence of the field = `EDITION`):

| model | 中文 | how it sells | trial dimension | upgrade |
|---|---|---|---|---|
| `EDITION`（缺省） | 版本分层 | editions × `billingPeriod`（按时长/买断分档，如 BASIC/PRO × MONTHLY/YEARLY/PERMANENT） | **day-based** — `trialDays` only; `trialCount` is NOT a dimension of this model | 已购抵扣/补差价 — `licenseDeductionEnabled` defaults **true** |
| `QUOTA` | 按量额度 | quota packs — every `licenseEditions` row is a pack with `quotaAmount`（如 20 次 / 100 次）; buy-again **stacks** onto the remaining balance | **count-based** — per-edition `trialCount` (+ optional `trialCountPeriod`: `TOTAL` 累计 / `MONTHLY` 每自然月); `trialDays` not required | 不补差价 — `licenseDeductionEnabled` is forced off server-side (全价复购) |

QUOTA row rules (mirrored by `publish.mjs` pre-checks): every edition row MUST carry
`quotaAmount ≥ 1`; the unique key is `code + billingPeriod + quotaAmount` (the same edition may
offer several packs, e.g. 20/100/500 under one `code`); pack prices are **not** required to
ascend (ascending is an EDITION-only rule). Do NOT set `licenseDeductionEnabled: true` under
QUOTA (ignored); under EDITION set it `false` only if the user explicitly wants full-price upgrades.

Templates: EDITION → [`product.license.example.json`](templates/product.license.example.json) /
[`product.license.payfirst.example.json`](templates/product.license.payfirst.example.json);
QUOTA → [`product.license.quota.example.json`](templates/product.license.quota.example.json) /
[`product.license.quota.payfirst.example.json`](templates/product.license.quota.payfirst.example.json).

### Phase 4 → 5 — Upload assets, then submit (ordering is mandatory)

The product references media by `objectName`; nothing can be saved before upload succeeds.
`publish.mjs` handles the whole order for you: it uploads every local asset in the spec,
injects the returned `objectName`s into the payload, then submits.

```bash
node publish.mjs --spec ../templates/product.license.example.json            # TRIAL_FIRST 先用后付（授权 · EDITION 版本分层）
node publish.mjs --spec ../templates/product.license.payfirst.example.json   # PAY_FIRST 先付后用（授权 · EDITION 版本分层）
node publish.mjs --spec ../templates/product.license.quota.example.json          # TRIAL_FIRST（授权 · QUOTA 按量额度包）
node publish.mjs --spec ../templates/product.license.quota.payfirst.example.json # PAY_FIRST（授权 · QUOTA 按量额度包）
node publish.mjs --spec ../templates/product.server.example.json             # SERVER_SOFTWARE 服务端
node publish.mjs --spec ../templates/product.digital-good.example.json       # DIGITAL_GOOD 数字商品
node publish.mjs --spec ../templates/product.promotion.example.json          # ONLY_PROMOTION 仅推广
```

What it does under the hood (see [reference.md](reference.md) for the raw endpoints):

1. For each asset (cover, each detail image, installer): `checkFileExists` (md5 dedup) →
   if new, `getPreSignedUrl` → HTTP `PUT` bytes → keep the returned `objectName`.
   - `businessType` MUST be the enum value: `product_cover_picture`, `product_detail_picture`,
     `product_file` (never a bare word like `FILE`).
   - Images: png/jpg/jpeg/gif/webp, ≤ 10 MB. Installer: exe/msi/zip/… ≤ 100 MB.
2. Assemble payload: cover → `baseInfo.coverImage`; detail images → `introduce.images`
   (needs 3–20); installer → `baseInfo.clientSoftware[].softwarePackages[].executableFile` (or
   `sourceCodeFile` for server/digital-good).
3. **Reuse the existing `productId` (avoid duplicates).** `/product/submit` creates a NEW product
   when the payload has no `productId`, and EDITS when it does. If this product was published
   before, its `productId` was recorded in `ps-product.json`; `publish.mjs` reads it back and puts
   it into the payload so re-publishing UPDATES the same product instead of inserting a duplicate.
   Resolution order: `--product-id <id>` > `--new` (force create) > `spec.product.productId` >
   `ps-product.json` (auto, only when `productName` matches). The edit branch requires a higher
   `softwareVersion` than what is live — bump `baseInfo.softwareVersion` for a new release.
4. `POST /product/submit`.

### Product rules the payload must satisfy

Every product needs a cover image + 3–20 detail images + `introduce` text. On top of that, the
rules depend on the form — and for license products, on the sales model. Confirm the form and,
where relevant, the sales model (`baseInfo.salesModel`) with the user before filling the spec.

#### License products (`CLIENT_SOFTWARE` / `PLUGIN`, `licenseEnabled: true`)

**`TRIAL_FIRST` (先用后付 — try before you buy):**

- `licenseEnabled = true`, `licensePlatformPayment = true`,
  under **EDITION**: `trialDays` in 1–365 (day-based trial is the EDITION trial dimension);
  under **QUOTA**: omit `trialDays`, use per-edition `trialCount` instead (see Phase 3.6),
- `receivePayment.productPrice = 0` (or omitted),
- `licenseEditions` has ≥ 1 row; with platform payment (EDITION), prices must be **strictly
  ascending**; EDITION unique key `(code + billingPeriod)`, QUOTA unique key
  `(code + billingPeriod + quotaAmount)` with `quotaAmount ≥ 1` on every row,
- `softwareVersion` must be `x.y.z`,
- at least one executable package must exist.

**`PAY_FIRST` (先付后用 — pay before you use):**

- `licenseEnabled = true`; `salesModel: "PAY_FIRST"` (it is also the backend default when the
  field is omitted),
- `receivePayment.productPrice ≥ 1` — this is the upfront product price the buyer pays BEFORE
  first use; a ¥0 buyout is rejected (`publish.mjs` pre-checks this locally),
- **no** `trialDays` (only `TRIAL_FIRST` uses it; omit the field),
- `licenseEditions` still ≥ 1 row. Under **EDITION**: unique `code + billingPeriod`; prices
  strictly ascending when `licensePlatformPayment = true`; the trial dimension is day-based only —
  `trialCount` is NOT used (PAY_FIRST has no trial at all). Under **QUOTA**: every row carries
  `quotaAmount`; prices not required to ascend; per-edition `trialCount` may grant count-based
  trials of a pack,
- `softwareVersion` must be `x.y.z`, and at least one executable package must exist.

Templates: [`product.license.example.json`](templates/product.license.example.json) (TRIAL_FIRST /
EDITION) · [`product.license.payfirst.example.json`](templates/product.license.payfirst.example.json)
(PAY_FIRST / EDITION) · [`product.license.quota.example.json`](templates/product.license.quota.example.json)
(TRIAL_FIRST / QUOTA) · [`product.license.quota.payfirst.example.json`](templates/product.license.quota.payfirst.example.json)
(PAY_FIRST / QUOTA).

#### Non-license products

No `licenseEnabled` / `licenseEditions` / `licensePlatformPayment` fields — set none of them.
(Version tiering and quota packs are **license** billing models only — a non-license product can
only sell a flat `receivePayment.productPrice`.)

**`SERVER_SOFTWARE` (服务端软件)** — [`product.server.example.json`](templates/product.server.example.json):

- `softwareVersion` `x.y.z`; a downloadable package via `assets.sourceCodeFile` (→ `baseInfo.sourceCodeFile`),
- `receivePayment.productPrice ≥ 1`; optional `deployPrice`, which must be `≤ productPrice × 2`,
- `serverSoftwareDeployRole`: `MYSELF` or `PLATFORM`; `canDownloadSourceCode` boolean.

**`DIGITAL_GOOD` (数字商品)** — [`product.digital-good.example.json`](templates/product.digital-good.example.json):

- `digitalGoodsTypeId` required (numeric, from `GET {baseUrl}/digitalGoodsType/all`),
- `softwareVersion` `x.y.z`; a downloadable package via `assets.sourceCodeFile` (→ `baseInfo.sourceCodeFile`),
- `receivePayment.productPrice ≥ 1`,
- **must NOT** carry deploy/promotion fields (`deployPrice`, `deployIncome`, `afterSalesFreeDay`,
  `serverSoftwareDeployRole`) — the validator rejects them.

**`ONLY_PROMOTION` (仅推广)** — [`product.promotion.example.json`](templates/product.promotion.example.json):

- no downloadable package, no `softwareVersion`, and **no** `receivePayment.productPrice` requirement,
- just cover + 3–20 detail images + `introduce`; point buyers to `sourceStation` / `shopLink`.

On success the product enters `PENDING_RELEASE` (platform review) — that is expected; publishing
to the storefront is a further operator action, not part of this skill.

### Product-name advisory (brandability / 品牌词)

`publish.mjs` prints a **non-blocking** warning when `productName` reads like a feature
description rather than a brand — i.e. it is long (中文 >6 字 / 英文 >3 词) or contains generic
tokens (`服务 / 软件 / 工具 / 助手 / service / software / tool / …`). This is SEO guidance, **not** a
platform rule: a descriptive name still publishes fine, and the final naming call is the user's.

When it fires, relay it to the user ONCE. Landing pages capture *demand-word* traffic (a stranger
searching the job to be done); the product name captures *brand-word* traffic (a returning user or
someone who heard the name and searches it). A long/generic name means that second channel never
opens. Recommended fix that does NOT require renaming the registered product: **coin a short,
distinctive, spellable brand alias** (e.g. `SchemaSync`) and use it as the anchor text on the
landing/detail pages and backlinks, so authority accumulates onto one searchable entity. To silence
the warning on re-runs (name already acknowledged), add `--ok-name`.

### Phase 6 — Surface the `productUniqueCode` and apply it to the workspace

A successful `POST /product/submit` returns `{ productId, productUniqueCode }`. The
**`productUniqueCode` (产品唯一编码)** is the stable, never-changing identifier a client uses to
talk to the license system — it is exactly the value the SDK is initialised with
(`new LicenseClient({ productUniqueCode })`) and the argument `integrate-license`'s `smoke.mjs
--product <code>` expects. It is **not** a secret (it is shown on the product page).

`publish.mjs` already (a) prints it in a clear "发布成功" block and (b) records it to
`ps-product.json` in the current working directory (the project being published). Override the
target with `--emit <path>` or suppress the file with `--no-emit`. Then, as the agent, do this:

1. **Always relay the code to the user** — state the `productUniqueCode` explicitly in your reply
   (not just "published successfully").
2. **Apply it to the workspace's license integration, if one exists.** Detect a license hookup in
   the current project — e.g. a `LicenseClient(...)` construction, a `productUniqueCode` literal
   or placeholder (such as `PRO-2026-001`), an env var like `PS_PRODUCT_UNIQUE_CODE`, or a
   `ps-product.json`. If found, write the **real** returned `productUniqueCode` into that single
   source of truth (replace the placeholder), so the client points at the just-published product.
   Keep it consistent everywhere it appears; never ship it as if it were secret.
3. **If there is no workspace, or the project has no license integration, only display it.** Do
   not invent a config file or edit unrelated code. Hand the user the code and, when they want to
   wire it up, point them to the [`integrate-license`](../integrate-license/SKILL.md) skill.

If the response did **not** include `productUniqueCode` (an older deployed backend that predates
this field), `publish.mjs` says so — in that case still finish the publish, tell the user the code
was not returned, and where to read it (developer console → product page).

## Common failures

| Message | Cause / fix |
|---------|-------------|
| `need_developer_role` | Not logged in as an approved partner → finish Phase 2, then re-login (Phase 3). |
| `coverImage.require` | Cover `objectName` missing — Phase 4 upload didn't complete. |
| `images.size` | `introduce.images` must hold 3–20 images. |
| `licenseEditions.periodDuplicate` | Two editions share the same unique key — `code`+`billingPeriod` under EDITION, `code`+`billingPeriod`+`quotaAmount` under QUOTA. |
| `licenseEditions.priceAscending` | Platform-payment EDITION edition prices not strictly increasing (QUOTA packs are exempt). |
| `quotaAmount` missing / `< 1` | QUOTA (按量额度) pack row without a quota count → set `quotaAmount` (e.g. 20/100) on every `licenseEditions` row. |
| `invalid licensePricingModel` | Not `EDITION`/`QUOTA` → use one of them or omit the field (= EDITION). |
| `productPrice.required` / `trialFirstZero` | Price vs `salesModel` mismatch: `PAY_FIRST` needs `productPrice ≥ 1`; `TRIAL_FIRST` needs `0` (see rules above). |
| suffix / size rejected | Wrong `businessType`, non-whitelisted file type, or oversize file. |
| `cannot determine the software form` | No `--form`, no `baseInfo.productForm`, and nothing analysable in the cwd → **ask the user** which form, then re-run with `--form <VALUE>`. |
| `LICENSE product ... must be CLIENT_SOFTWARE or PLUGIN` | A license/TRIAL_FIRST product was given a non-client form → confirm the real form with the user (usually CLIENT_SOFTWARE) and re-run. |
| `sourceCodeFile.require` | SERVER_SOFTWARE / DIGITAL_GOOD missing a package → set `spec.assets.sourceCodeFile`. |
| `digitalGoodsType.required` | DIGITAL_GOOD missing `baseInfo.digitalGoodsTypeId` (numeric, from `GET {baseUrl}/digitalGoodsType/all`). |
| `digitalGoods.deployFields` | DIGITAL_GOOD carried deploy/promotion fields → remove `deployPrice`/`deployIncome`/`afterSalesFreeDay`/`serverSoftwareDeployRole`. |
| `deployIncome.greater` | SERVER_SOFTWARE `deployPrice` > `productPrice × 2` → lower it. |

## Resources

- [reference.md](reference.md) — full endpoint list, enum values, payload schema, error codes.
- [scripts/](scripts/) — `register.mjs`, `login.mjs`, `apply-partner.mjs`, `publish.mjs`, `lib.mjs`.
- [templates/partner.example.json](templates/partner.example.json) — partner onboarding profile.
- [templates/product.license.example.json](templates/product.license.example.json) — TRIAL_FIRST (先用后付) · EDITION 版本分层 license product spec.
- [templates/product.license.payfirst.example.json](templates/product.license.payfirst.example.json) — PAY_FIRST (先付后用) · EDITION 版本分层 license product spec.
- [templates/product.license.quota.example.json](templates/product.license.quota.example.json) — TRIAL_FIRST · QUOTA 按量额度包 license product spec.
- [templates/product.license.quota.payfirst.example.json](templates/product.license.quota.payfirst.example.json) — PAY_FIRST · QUOTA 按量额度包 license product spec.
- [templates/product.server.example.json](templates/product.server.example.json) — SERVER_SOFTWARE (服务端软件) non-license spec.
- [templates/product.digital-good.example.json](templates/product.digital-good.example.json) — DIGITAL_GOOD (数字商品) non-license spec.
- [templates/product.promotion.example.json](templates/product.promotion.example.json) — ONLY_PROMOTION (仅推广) non-license spec.
