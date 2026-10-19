---
name: integrate-license
description: Integrate PowerSoftware (powersoftware.app / powersoftware.cn) license codes into a client software or browser-extension product — machine-code binding, trial claim (+ trial anti-abuse device signal), activation, edition gating, purchase-page redirect, in-app issuance/upgrade (HMAC), and update checking — using the official zero-dependency powersoftware-license-sdk (Node.js / Python / Java). Use when adding license or paywall verification to a desktop/CLI product or a browser extension (MV3), when the user mentions 授权 / 授权码 / 激活 / 试用 / 幂栈 / licenseCode / activationToken / claimTrial / verifyCached, or is wiring the product published via the publish-product skill.
---

# Integrate PowerSoftware License (client software)

Teaches the agent to wire a **client software product** into the PowerSoftware license system
correctly in one pass. The SDK is a *library* (source-copy, zero dependency, three languages);
this skill is the *knowledge* — which scenario applies, which calls go where, and the rules that
are easy to get wrong. SDK source is fetched at runtime from its authoritative repo (see Step 2);
**never copy SDK code from this skill — there is none here on purpose.**

Companion skill: [`publish-product`](../publish-product/SKILL.md) publishes the
product first and yields the `productUniqueCode` used here.

## Step 0 — Pick the scenario (decide this before writing any code)

| | **Scenario A — platform full funnel (TRIAL_FIRST)** | **Scenario B — orders off-platform** |
|---|---|---|
| Who charges | PowerSoftware (Alipay / PayPal) | The developer's own payment |
| Who issues codes | Platform automatically after payment | Your **server** calls the API (HMAC-signed) |
| Needs `apiSecret`? | ❌ No | ✅ Yes — server-side **only** |
| Needs your own server? | ❌ No, pure client | ✅ Yes |
| Trial (`claimTrial`) | ✅ Supported | ❌ None |
| Platform purchase page | ✅ SDK one-liner redirect | ❌ Developer handles UX |

- Indie dev / small team without a backend → **A**.
- Already has own payment, just wants platform issuance + verification → **B**.

Ask the user which one if their product setup doesn't make it obvious.

## Prerequisites

- A published license product on the platform → `productUniqueCode` (visible on the publish
  page, not a secret). Scenario A additionally needs `salesModel: TRIAL_FIRST` with trial days
  and editions configured.
- Scenario B only: `licenseApiSecret` from the developer console.
- Node.js 18+ on the machine running the scripts below (for `fetch-sdk.mjs` / `smoke.mjs`).

## Step 1 — Hard rules (violating any of these = failed integration)

1. **`apiSecret` never ships to the client.** It exists only in Scenario B server code. A client
   build containing it is a leak, not a bug to fix later.
2. **`machineCode` comes only from the SDK function.** It persists locally
   (`~/.powersoftware/.machine-id`) and is cross-language consistent — never hand-roll or cache
   a transformed version.
3. **The edition ladder must include `TRIAL: 99`.** Trial licenses are full-feature; omitting
   TRIAL from the level map silently reduces a trial user to BASIC features. Classic trap.
4. **Persist only `licenseCode` + `activationToken` + last verify result** (plain JSON file /
   OS keychain). Never persist a decryptable full license payload.
5. **Trial quota is server-accounted too** — bill trial uses through `consume(..., kind='trial')`
   and read `trialUsed`/`trialRemaining`; reset-period buckets (`DAILY`/`WEEKLY`/`MONTHLY`) roll on
   the server's `trialPeriodKey` (a new period opens a new bucket → resets naturally). The local
   count is only an offline display cache; never gate on it, and never judge the period by the local
   clock (users would refresh the quota by changing system time). Show when the trial clears via
   `trialNextResetTime` (the UTC boundary when the current bucket rolls over) — the trial-side
   counterpart of `quotaNextExpiry`; `null` for `TOTAL`/disabled.
6. **HMAC is applied by the SDK** (`generateForSoftware` / `upgradeForSoftware`). Do not
   self-sign.
7. **`checkUpdate` must fail silently** — network errors can never block the app.
8. **Honor `licenseUpgradeMode`**: `SAME_CODE` → code never changes; `NEW_CODE` → overwrite the
   stored code with the new one returned after upgrade/renewal. `NEW_CODE` is **deprecated since
   2026-10** — new products are always `SAME_CODE`; keep the NEW handling only for legacy products.
9. **QUOTA products: the code is the wallet, spend is server-side, paid quota is per-lot with its own
   expiry.** Read the lot-aggregated `quotaRemaining` (Σ live lots) / `quotaUsed` as the trusted
   balance (`quotaAmount` is only a display total = Σ granted lot `cap`); bill each use through
   `consume`, which deducts the earliest-expiring live lot first (FIFO). Never sum quota across the
   machine's codes, and never gate on local counts — `consume` charges only the current code's lots,
   never its machine siblings. **The code is never `expired` by quota** (exhausting/expiring all lots
   only drives `remaining=0` to prompt repurchase). For quota validity, read `quotaNextExpiry` (the
   earliest-expiring live paid lot); when it is `null`, show "perpetual" if `quotaRemaining > 0` else
   "used up".
10. **Read fields per pricing model.** A product is either `EDITION` (tiers) or `QUOTA` (usage).
    Fields not applicable to the current model are always `null` — render `-` and never assume presence:
    `quotaAmount`/`quotaUsed`/`quotaRemaining`/`quotaNextExpiry`/`trialCount`/`trialUsed`/`trialRemaining`/`trialNextResetTime`
    are QUOTA-only (`null` for EDITION); `softwareMajorVersion`/`trialDays`/`trialExpiryTime`/`licenseDeductionEnabled`
    are EDITION-only. `billingPeriod` is dual-meaning (EDITION = subscription period; QUOTA = per-lot
    validity). Full mapping in [reference.md](reference.md).

## Step 2 — Fetch the SDK into the project

```bash
node scripts/fetch-sdk.mjs --lang node            # or: python | java | all
node scripts/fetch-sdk.mjs --lang python --dest ./vendor
```

Zero dependencies (built-in `fetch`, Node 18+). Downloads the SDK source files of the requested
language(s) straight from the GitHub **API** (`api.github.com` trees + blob, with a contents-API
manifest fallback — deliberately **not** `raw.githubusercontent.com`, which is unreliable on some
networks). From `github.com/powersoftware-app/powersoftware-license-sdk` (default `main`, pin a
tag/sha with `--ref`), preserving repo layout, e.g. into `./vendor/powersoftware-license-sdk/`:

```text
node/src/index.js                                   # single file: machineCode / sign / LicenseClient
python/ps_license_sdk/{__init__,client,machine}.py
java/src/main/java/com/powersoftware/sdk/{LicenseClient,MachineCode,Json}.java
```

Placement per language:
- **Node**: keep as-is (ESM; rename to `.mjs` if the consuming project is CJS); TS projects just
  import the `.js` (add a local `d.ts` or `@ts-ignore` if `checkJs` complains).
- **Python**: the `ps_license_sdk/` dir goes onto `sys.path` next to the app code.
- **Java**: keep the package path or re-declare `package` to the project's own (README of SDK repo).

## Step 3 — Write the integration (Scenario A flow)

Target call order in the client:

```text
first launch ──→ claimTrial(mc) ──→ save {licenseCode, activationToken}
paid feature ──→ verifyCached(code, mc, token)   # 60s in-process cache
                  valid & edition sufficient → run feature
                  invalid/expired → show hint + open purchaseUrl(mc) in browser
user buys, pastes code ──→ activate(code, mc) ──→ overwrite saved token
```

Minimal Node example (Python/Java are isomorphic — same method names in snake_case/camelCase):

```js
import { LicenseClient, machineCode } from './vendor/powersoftware-license-sdk/node/src/index.js';

const client = new LicenseClient({ productUniqueCode: 'PRO-2026-001' });  // apiSecret NOT needed in A
const mc = machineCode();

const t = await client.claimTrial(mc);                       // first run only
await client.verifyCached(t.licenseCode, mc, t.activationToken); // → { valid, edition, expiryTime, trialExpiryTime }
const url = client.purchaseUrl(mc);                          // unauthorised → purchase page
```

Feature gating and edition comparison, credential-storage shape, `trialExpiryTime` grace
period, billing-period/renewal semantics, error-code UX: see [reference.md](reference.md).
Scenario B server-side issuance (`generateForSoftware` with `clientOrderId` idempotency) is also
covered there.

## Step 4 — Smoke test before declaring done

```bash
node scripts/smoke.mjs --product PRO-2026-001
node scripts/smoke.mjs --base https://www.powersoftware.cn/frontApi   # CN site
```

Verifies: machine-code stability + format, `purchaseUrl` well-formedness, a real API round-trip
via `checkUpdate` (unknown code → `hasUpdate:false` by design — a valid connectivity probe that
mints nothing), and a correctly-shaped error from `/license/verify`. **Exit 0 = environment is
wired.** Then test the product-specific path with a real trial product (trial claim is once per
machine — use a fresh `PS_LICENSE_HOME` to re-test).

## Step 5 — Integration checklist

```
- [ ] Scenario chosen with the user (A vs B); product is published, productUniqueCode known
- [ ] SDK fetched via fetch-sdk.mjs (not hand-copied), placed per language notes
- [ ] init: apiSecret empty (A) / server-only (B)
- [ ] claimTrial → first launch, persist licenseCode+activationToken
- [ ] verifyCached → every paid-feature entry point, with edition gate incl. TRIAL:99
- [ ] activate → user-pasted code path, overwrites token
- [ ] purchaseUrl → purchase-page redirect, .app/.cn site decision implemented
- [ ] LicenseError → errorCode UX mapping (expired→buy, machineLimit→unbind, revoked→support…)
- [ ] local credential store implemented
- [ ] checkUpdate wired asynchronously, failures silent (optional)
- [ ] (B) server issue endpoint with clientOrderId idempotency (optional)
- [ ] node scripts/smoke.mjs exits 0
```

## Browser-extension products

Different runtime (no disk / no exec for machine fingerprinting) → the SDK ships a second entry
file, `node/src/webextension.js`, and its own guide in the SDK repo:
`docs/浏览器插件授权接入指南_v3.md` (+ `.en.md`). Follow that guide — the scenario logic, edition
gating and error UX rules from this skill still apply. Extension-specific deltas not to get wrong:

- `machineCode()` is **async** and returns an `EXT-<uuid>` Install ID (no hardware fingerprint;
  the server infers `machineType=PLUGIN` from the prefix). It is persisted to `storage.local` **and**
  `storage.sync` (sync wins on conflict), so it follows the browser account across devices.
- **Uninstall / reinstall wipes extension storage** — this is the loss to design around: the Install
  ID and the stored credential both disappear. Mitigate by keeping `licenseCode` in `storage.sync`
  too, then on startup silently `activate()` it against the new Install ID (no user input); route
  `machineLimit` to the personal-center unbind guidance. A user never signed into the browser
  account just mints a fresh `EXT-` ID on every reinstall.
- **Trial anti-abuse: report the device signal, or grants get shortened.** `claimTrial(mc, did)`
  takes an optional 2nd arg — `deviceId()` → `DID-<uuid>`, persisted to `storage.local` only
  (key `psDeviceId`; deliberately **never** synced) — which the SDK sends as the `x-device-id`
  header. It is a *second dimension*, not a duplicate of the Install ID: `EXT-` follows the browser
  account (one per person, same value on home + office), whereas `DID-` must stay glued to the
  physical browser so the server can tell "one machine reinstalled" from "one install on each of N
  machines". Absent or off-pattern (`^DID-[A-Za-z0-9_-]{6,64}$`) → treated as unreported → the server
  falls back to subnet-only (`/24`) anti-abuse, and the trial grant may be shortened or repeat claims
  rejected (`trialAlreadyPurchased`). To also survive uninstall, the guide has a first-party `ps_did`
  cookie variant (needs `cookies` + `host_permissions`).
- Quota spend is server-accounted for paid lots *and* trial buckets (`consume(..., kind='trial')`,
  balance = `trialRemaining`); the local counter is a display cache only — same rule as desktop
  (rules 5/9, [reference.md](reference.md)).

## Resources

- [reference.md](reference.md) — endpoints, response fields, error codes, storage shape, gating
  snippets, Scenario B design.
- [scripts/fetch-sdk.mjs](scripts/fetch-sdk.mjs) — pulls latest SDK source from GitHub (executed,
  not read).
- [scripts/smoke.mjs](scripts/smoke.mjs) — integration smoke check (executed).
- Authoritative upstream docs (bilingual): SDK repo `powersoftware-license-sdk` →
  `客户端软件授权接入指南_v3`, `授权SDK规范_v3`, `授权接口文档_v3`. When this summary and the
  guide disagree, the guide wins — and report the drift.
