# plan-seo-site — Reference

Supporting detail for [`SKILL.md`](SKILL.md). Two kinds of content: the **method material**
(§A keyword data, §B copy frameworks, §C repo self-check) and the **worked case** (§D, the
powersoftware.app diagnosis that everything else is drawn from). All numbers are *snapshots*
(Ahrefs DR, SimilarWeb, Google Ads Planner `us/en`, 哥飞-version KD) taken 2026-09 — re-pull
before relying on them; they are examples of *how to read the data*, not live truth.

---

## §A — Worked keyword-research data (how to read a 哥飞 table)

### A.1 The candidate table (columns are the point)

| keyword | us volume | 哥飞 KD | weakest top-10 occupant | verdict |
|---|---:|---:|---|---|
| remove watermark from photo | 22,200 | 48.6 | #3 watermark.phd — **DR 11, 11 months old** | winnable (a new site already ranks) but **red ocean**: 9/10 slots purpose-built |
| remove text from image | 9,900 | 56 | #9 clearcrowds.com DR 5 | stable base (~10k for a year) |
| photo restoration software | 480 | 42 | #6 uglyhedgehog.com DR 26 | good: `software` intent, fits a desktop client |
| **image upscaler software** | 720 | **41.8** | **#2 is a Reddit post** | **best first pick**: has volume + medium KD + **content vacuum**, +70%/yr |
| batch watermark remover | 70 | 44.7 | all inner-page slots | small but desktop's real edge (batch) |
| passport photo maker | 6,600 | pre-screen 70 | — | **avoid**: shrinking 6,600→3,600 |
| offline watermark remover / watermark remover desktop / image upscaler offline | ~0–10 / not in planner | — | — | **attribute words: no volume** — body/FAQ only, never a title |

Read every row as: *volume* (is anyone searching) × *difficulty* (哥飞 KD, the "how hard to crack
top 10" score) × *SERP shape* (the decisive qualitative read) × *trend*.

### A.2 The two difficulty vocabularies are NOT comparable

`哥飞 KD` (精评, "difficulty to reach top 10 for THIS SERP") and a generic `pre-screen` score are
different scales. Never say "41 < 54 so word A is easier than word B" if one is 哥飞 KD and the
other is pre-screen. Always label the source in the cell.

### A.3 Referring-domain budget to crack the top 10

| word | RDs needed (range, median) |
|---|---|
| remove watermark from photo | 55–120 (median 80) |
| photo restoration software | 45–90 (median 60) |
| image upscaler software | 45–90 (median 60) |
| remove watermark free | 130–280 (median 180) |

A site at DR 0.6 starting from zero: sequence by cheapest-budget + vacuum first.

### A.4 Trend beats level

`remove watermark from photo` is the biggest word but fell 27,100 → 14,800 over a year (−45%).
`image upscaler software` is 30× smaller (720) but rose +70% and has a vacuum. **Prefer the
rising, underserved word as the first page**, treat the shrinking giant as a long game.

### A.5 Wrong-keyword signal (from Search Console after launch)

First-90-days: 8 clicks / 721 impressions, CTR 1.1%. The top queries were **other companies'
names** (`powersuite software`, `power software solutions`, …) — misaligned exposure from a
brand-colliding domain, not demand. The only genuine need-word that ranked top-10 was a **seed
word** (`iopaint`, #9) → mine its family for low-difficulty siblings. Lesson: impressions mean
nothing unless they land on your task words.

---

## §B — Landing-page copy frameworks (one page, one keyword)

### B.1 `/remove-watermark/` — target `remove watermark from photo`

```
Title:       Remove Watermark From Photo – Free AI Watermark Remover   (≈58 chars, word in front)
H1:          Remove Watermark From Photo
Description: Remove watermarks, logos, timestamps and text from your photos with AI. Free,
             no sign-up, and it runs entirely on your computer — your images never get uploaded.
```

First screen (survival depends on it):
- Left: drag-drop upload / usable in-page demo (reuse the local web UI, model runs in-browser).
- Right: one differentiation line + `Get the desktop app`.
- Trust line: `Free · No sign-up · Runs 100% offline on your PC`.
- Second line: `No upload · No watermark on your output · Unlimited batch`.

Body (only this word):
- `H2 How to Remove a Watermark From a Photo` — 3 steps: Upload → AI detects → Download.
- `H2 Before and After` — image `alt = remove watermark from photo`.
- `H2 Remove Watermarks, Logos, Timestamps and Text` — each sub-type carries one phrase.
- `H2 Batch: Remove Watermarks From Many Photos at Once` — desktop's edge vs web-tool quotas.
- `H2 Why Local Beats Uploading` — privacy comparison table (local vs cloud).
- `H2 FAQ` (mark up as `FAQPage`) — from the real People-Also-Ask: *how to remove for free /
  can ChatGPT do it / is it legal / iPhone photos / does it reduce quality*.
- CTA + internal links to `/upscale/`, `/photo-restoration/`, `/background-remover/`.

Structured data: `SoftwareApplication` (`operatingSystem: Windows, macOS`) + `FAQPage` + `BreadcrumbList`.

**Never:** `offline/desktop/windows/pc` in the title; or an intro-plus-download-button page.

### B.2 `/upscale/` — target `image upscaler software` (the recommended FIRST page)

```
Title:       Image Upscaler Software – Upscale Photos 8x With AI   (≈52 chars)
H1:          Image Upscaler Software — Upscale Photos Up to 8x With AI
Description: Upscale images up to 8x without losing quality. Batch-process hundreds of photos,
             and it all runs on your own computer — your images are never uploaded.
```

Same skeleton as B.1 (first-screen demo + before/after; H2 How-to / Before-After / `2x,4x,8x` tiers /
Batch / Why-Local / FAQ). FAQ from this SERP's real PAA: *best software for upscaling / truly free
upscaler / can ChatGPT upscale / upscale without losing quality*. Note the #1 (`upscayl.org`)
puts `Linux, MacOS and Windows` in its title — list your supported OSes in title/description
(but do NOT make `windows` the standalone title; that word has no volume).

---

## §C — Repository self-check (run this against an actual repo)

The goal: separate the **skeleton** (usually already fine — don't rebuild) from the **content &
structure gaps** (usually the real problem). Inspect these; for each, mark ✅ present / ◐ partial
/ ✗ missing, and only fix ✗/◐.

| # | Check | Where to look | Correct state |
|---|---|---|---|
| 1 | SSR/SSG real content | framework config (`output`, render mode) | body text in returned HTML |
| 2 | Language-prefixed URLs | i18n config | locale prefixes on all routes (this is routing, NOT keyword value) |
| 3 | Self-referencing canonical | base layout `<link rel=canonical>` | each locale page → itself |
| 4 | hreflang set + x-default | base layout | all locales cross-link + `x-default` |
| 5 | sitemap with `xhtml:link` | sitemap endpoint | SSR, cross-lingual links per URL |
| 6 | **Trailing slash** | middleware/redirect rules | `/x` → `/x/` (or reverse) **301**, one form only; internal links + canonical aligned |
| 7 | **Main domain** | middleware/DNS/redirect | one host canonical; the other form **301 in ONE hop** (no bare→www→locale double jump) |
| 8 | robots prefix | `public/robots.txt` | `Disallow` paths carry the **language prefix** (else silently ineffective) |
| 9 | Home `<title>` | home page template | has a positioning keyword, not only the brand |
| 10 | Product/page **title i18n** | backend content model / i18n field set | **brand name (`productName`) = language-invariant, NOT machine-translated** (one coined mark across all locales); only tagline/summary/demand copy localize via the i18n field set. No source-language leaking, and no per-locale brand variants that split the entity |
| 11 | Product **slug** | DB schema + URL rewrite | readable semantic slug; old numeric URL 301s to it |
| 12 | **Landing-page type** | routes + content model | first-level semantic subdirs exist (`/upscale/`), one page one keyword, with keyword/TD/H/FAQ/CTA fields |
| 13 | Landing registry → sitemap | data file + sitemap | new landings auto-appear in sitemap |
| 14 | Structured data | page head | `SoftwareApplication`+`FAQPage`+`BreadcrumbList` |
| 15 | Analytics | head/env | GSC property matches the chosen host variant; confirm GA4/Clarity if used |
| 16 | **Brand name ownable** | exact-match Google + query.domains | the coined brand ranks for *itself* (no incumbent owns the term), `.com/.app/.ai` available, not a word Google "corrects" (Pixelfold→Pixel Fold). A taken/descriptive brand caps the brand-word channel at 0 |

Typical finding: rows 1–5, 14–15 are ✅ (the "tech is fine" part), while 6–13 and 16 are the actual gaps.
The highest-leverage single fix is usually **#6 trailing slash** (it silently creates duplicate
GSC rows and blocks indexing of a whole site at DR<1).

**Governance rule for the two kinds of page** (so directories stay manageable):
- **Traffic-thick landing pages → source of truth in the repo** (a template + a `landings.json`
  registry; add-a-landing = copy template, set TDK, register slug → auto into sitemap). Words are
  chosen by operations, not typed into an admin CMS.
- **Platform-thin product pages → the database** (add `slug` + put title/summary into the i18n
  field set). Cross-link: landing CTA → product slug page; product page → landing (anchor text
  contains the target word).

---

## §D — Case snapshot: powersoftware.app

A multilingual software marketplace (幂栈网 / PowerSoftware), 6 locales, product **CleanCanvas**
(local AI image tool: watermark / background / restoration / ID photo). Snapshot 2026-09.

**Verdict:** technically clean (SSR, hreflang, canonical, sitemap all good — the diagnosis said
*问题不在技术*), but the SEO *root* was wrong: whole site ranked for **1** keyword (`power software`,
pos 53, 40 vol, 0 traffic); DR 0.6; a platform framework of empty pages, no demand-word pages.

**The four questions the owner asked, answered:**
- *Missing i18n "international title" fields?* The skeleton is fine; the gap is content-layer —
  product `productName`/`secondName` are not in the backend i18n field set (10 body fields are;
  titles leak Chinese into the en-US site), and home `<title>` is a bare brand.
- *Missing semantic sub-directories?* Yes, entirely — there are only locale prefixes + numeric
  routes (`/product/detail/2`); zero demand-word landing pages.
- *How to manage them?* §C governance: `landings.json` registry in the repo for landing pages;
  a `slug` column for products.
- *Do sub-directories satisfy SEO?* No — necessary, not sufficient. They only **concentrate
  authority**; ranking = content that covers the word + on-page function + referring-domain votes.

**Corrections found only after reading Search Console (later rounds):**
- `/clean-canvas/` **abandoned** — `cleancanvas` is already taken (a Shopify theme dev at SERP top
  5). Use the **demand word** as the URL (`/remove-watermark/`); the slug *mechanism* still applies,
  only the *value* changes.
- **Main-domain direction flipped**: earlier "bare domain is main"; after GSC showed the bare/www
  forms split into two properties, the rule became **one host, one version, collapse the double hop**.
- **Trailing slash promoted to the #1 P0** (see §C #6) — the real cause of the duplicate-weight &
  not-indexed pile-up.
- **Page order corrected**: build `/upscale/` **before** `/remove-watermark/` (the latter returns
  404 while links were already being pointed at it — so also fix that 404 first).
- Brand/domain layer (not a code field but the foundation): the `.cn` bare domain 530s (missing
  apex host header); the Chinese brand 幂栈网 is established but its own site is suppressed to #7;
  English brand needs a **coined word** (both "generic-root + AI-suffix" candidate batches failed;
  avoid already-taken marks; watch that Google "corrects" coinages like Pixelfold → Pixel Fold).

This case is the source for every §A number and §B framework above.

---

## §E — 哥飞 method handbook (condensed reference)

Detail backing [`SKILL.md`](SKILL.md). Distilled from 哥飞's public method (articles, community
shares, the 「养网站防老」 series). Re-pull any metric before relying on it.

### E.1 Demand-sourcing methods (Phase 1)

1. Seed a **word root** into Semrush/Ahrefs and filter (volume, KD, intent).
2. **Google Trends** for related & rising terms (also to check whether a "not-in-planner" word is
   genuinely no-volume or just too new to be logged).
3. Analyze a **big site's** keyword portfolio for incremental-traffic words you can add.
4. Read **ad** data — words incumbents bid on are commercially valuable.
5. Google **autocomplete + related searches**.
6. **SimilarWeb** on a competitor → their **non-brand** keywords (what actually drives them traffic).

### E.2 Wealth-password word roots (tool/demand suffix patterns)

`Generator · Translator · Converter · Calculator · Checker · Editor · Maker · Creator · Detector ·
Online · Processor · Designer · Analyzer · Builder · Viewer · Extractor · Optimizer · Simulator ·
Assistant`. Combine a task noun with one of these roots to enumerate candidates fast
(e.g. `image + upscaler`, `watermark + remover`, `photo + restoration`).

### E.3 Selection formulas & bars

| Tool | Rule |
|---|---|
| **Optimization ROI** | `ROI = (volume × CPC) / KD` → `>200` strongly recommend · `50–200` viable · `<50` skip. CPC proxies commercial intent; high-volume/zero-CPC is usually informational. |
| **Beginner bars** | `KD < 10`, `referring domains needed < 10`, volume can be as low as **100/mo** — the first site's goal is to *learn the loop*, not maximize revenue. |
| **Two difficulty vocabularies** | `哥飞 KD` (精评, difficulty to crack THIS top-10) and a generic `pre-screen` score are **different scales** — never compare across them; label the source. |
| **Small→big strategy** | Rank low-difficulty long-tails first, let them feed authority back to the head term. New words reward **speed**; old words reward **judgment + patience**. |

### E.4 On-page vocabulary

- **TDH** (replaces legacy TDK): **T**itle (core word leftmost) · **D**escription · **H**eadings
  (H1 most important; H2–H6 are the skeleton). Meta `keywords` tag is dead — Google doesn't trust it.
- **分门别类罗列** (categorize-and-list, the six-character mantra): display content grouped by
  country / type / feature, as clear lists — matches how users and Google read a tool site.
- **Internal links** (≥ external in importance): home → every important page; related pages ↔ each
  other; **descriptive anchor text**; **breadcrumbs**; a home "latest pages" list beats relying on the
  sitemap (a sitemap is only a *suggestion*). Keep page depth ≤ 3.
- **Dwell time**: free trial, use-without-login, beyond-expectation experience — Google uses
  interaction data to judge whether the page satisfies the query.

### E.5 How Google works (why a bare new page stays invisible)

`crawl → parse → index → process links → pass authority → keyword recall → rank`. A brand-new page
with **neither a GSC submission nor any backlink** is very hard for Google to discover — hence the
Phase 6 launch checklist (GSC + GA + Sitemap + Robots) and the Phase 8 first-links push.

### E.6 Launch & hosting choices

- **Domain**: mainstream suffixes (`.com/.ai/.net/.org`); buy via Cloudflare or Spaceship.
- **Deploy**: Vercel for beginners (fastest, cheapest), Cloudflare's stack later.
- **Must-do on launch**: Search Console · Analytics · Sitemap · Robots.txt · (optional) structured data.

### E.7 Link-building paths (start where you're already known)

newsletters/aggregators → Product Hunt → AI navigation/directory sites → tech media & self-recommend
→ social platforms (find people with the need). **Nofollow links still have value.** Build a
persistent link library; a few referring domains every week, consistently. New sites can see first
traffic in ~48h once a page is indexed and covered.

### E.8 Monetize & scale

AdSense (beginner) · user payment (subscription / one-time) · affiliate · multi-site matrix for
passive income. Scale by publishing quality inner pages + **programmatic SEO** (template-generate
enumerable demand) + language expansion. AI may generate content, but Google accepts *useful* and
rejects *junk*.

### E.9 Toolkit

Semrush / Ahrefs (keywords) · SimilarWeb (traffic/competitor) · Google Trends (trend check) ·
AITDK (on-page breakdown) · Search Console + Analytics · ChatGPT/Claude (content & code) · Vercel.

### E.10 Learning path

- **Wk 1–2**: build the right mental model, pick a direction (navigation / AI-tool / game / content /
  niche-tool site), learn demand discovery.
- **Wk 3–4**: ship the first site via the 「养网站防老」 steps, launch + submit GSC, start links.
- **Mo 2–3**: study monetization, iterate from data, review success cases.
- **Mo 4+**: replicate what worked, build a site matrix.
