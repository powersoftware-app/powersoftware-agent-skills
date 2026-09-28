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

---

## §F — 哥飞 public corpus: the 79-article 公众号 archive (2023-07 → 2024-09)

Source: local archive `gefei-seo-guide/` (the curator's private backup — **not bundled with this
Skill**; 79 articles + `_index.json`, grouped 01_养网站防老(13) /
02_SEO教程(24) / 03_Adsense(4) / 04_需求挖掘(14) / 05_建站(3) / 07_内链外链(1) / 08_AI工具(1) /
09_内容(1) / 11_流量(3) / 13_案例(4) / 14_技术SEO(1) / 99_其他(10)). Everything below is **delta on
§E** — only what §E doesn't already say. (The web.cafe column set — 65 titles incl. 谷歌SEO三字经,
排名需要多久研究 — sits behind a login wall and is *not* in this archive.)

### F.1 The full 51 wealth-password roots (§E.2 listed 19 of them)

Complete list, each with meaning + user-intent + 3 collocations in the source article:
`Translator · Generator · Example · Convert · Online · Downloader · Maker · Creator · Editor ·
Processor · Designer · Compiler · Analyzer · Evaluator · Sender · Receiver · Interpreter ·
Uploader · Calculator · Sample · Template · Format · Builder · Scheme · Pattern · Checker ·
Detector · Scraper · Manager · Explorer · Dashboard · Planner · Tracker · Recorder · Optimizer ·
Scheduler · Converter · Viewer · Extractor · Monitor · Notifier · Verifier · Simulator ·
Assistant · Constructor · Comparator · Navigator · Syncer · Connector · Cataloger · Responder`.
Usage: feed a root into Semrush Keyword Magic Tool, filter **vol>600, KD 0–29 (later advice:
don't floor it — 21–49 has more real picks), CPC>0.1, exclude "near me"**, deselect
*Navigation* intent (brand-seeking words are useless to you), exclude porn terms, export CSV,
compute kdroi (F.2).

> Funnel note: these are the *enumeration* thresholds (cast a wide net across 51 roots). The final
> *first-site* pick still passes §E.3's beginner bars (`KD<10, RD<10`, volume can be as low as
> 100/mo), and §F.3's起步词 (`KD<29, ~10K/mo`) is the separate 保小图大 stepping-stone tier — three
> stages of one funnel, not conflicting numbers.

### F.2 Word-judgment SOPs (concrete walkthroughs behind §E.3)

- **kdroi in practice**: `kdroi = volume × CPC / KD` (= §E.3's "Optimization ROI", same formula).
  Calculator example: 357 words exported,
  keep 4 columns in order **B=volume, C=KD, D=CPC** (A=keyword), `=B2*D2/C2`, sort desc → winners
  are hyper-specific long-tails
  (`audiobook speed calculator` 3177, `construction loan calculator` 806), not the head word.
- **Search-intent in practice**: hover Google autocomplete at *every cursor position* of the seed
  word → collect ~40 suggestions → dedupe (~27 words) → feed the whole list to GPT with prompt
  「关键词：搜索意图：」 format, then ask per-word follow-ups ("what service does the user actually
  want") and "how should the page satisfy it".
- **Intent → page-type mapping (3 states)**: 解惑 → article/ explainer page · 下载 → give the file ·
  办事 → working tool on-page. Goal: the user's job is done **in your one page** without going back.
- **Kill list (Semrush traps)**: ① *seasonal/spike words* — always verify on Google Trends over the
  full year (`fantasy football team names` 53.8K but one season only); ② *Google answers directly*
  ("how many…" SERP shows the answer → nothing left to win); ③ *video-SERP words* ("half double
  crochet" → all YouTube results — go make videos, don't build a site); ④ *CPC outliers are
  brand-help false positives* (`squarespace change page background color` $17 CPC, 20 vol —
  filter vol>600); ⑤ Semrush KD/volume lag → **KD from Ahrefs, volume verified on Trends** for new words.
- **Decline worked example (UUID)**: narrow via autocomplete → Ahrefs KD 71 sites-to-top-10 →
  Trends vs `GPTs` shows small & flat → top-3 occupants only 430K/130K/30K monthly visits → ROI
  too low, *don't do it*. (Checking a word is cheap; the output is sometimes "no".)
- **New-word rule**: a word is "new" if its Trends first-appearance is **≤12 months** back (set
  range from 2022-01-01 to today, narrow to find the exact birth date — ChatGPT = 2022-11-30).
  New words = everyone on the same starting line; speed beats authority.
- **Fresh-crawler probes**: `site:domain` + time filter "Past hour" shows how often Googlebot
  visits a site (V2EX: very often → good place to leave your link). `vercel.app` subdomains in
  Similarweb → Organic landing pages → 12m → check **"newly discovered"** = live proof of new-word
  demand before anyone ranks it.

### F.3 保小图大 — the small-word-to-big-word growth ladder (§E.3 stated the principle; this is the mechanism)

1. Beginner village: pick a KD<29, ~10K/mo word, **register a domain containing the keyword**
   (domain-with-keyword is itself a ranking lever; keep URLs keyworded too), build one
   举全站之力 page (even a single-page site should be 十几屏 of related questions covered).
2. Once ranked (even top-3), **add sibling words**: title + homepage sections + categorized inner
   pages for each sibling. Google re-evaluates; existing small-word authority transfers.
3. When siblings hold, **add the parent word** the same way. The original small-word domain is fine.
4. Authority ladder to remember when choosing placement: `主域名 > 子域名 > 子目录 > 内页`.
5. Portfolio math (the actual strategy): 10 sites × $1k/mo beats chasing one $10k site.
   A precise-traffic site with ~10K visits/mo can clear $1k AdSense — 看得上小钱才能赚大钱.

### F.4 On-page rules beyond §E.4

- **TD templates** — site home: `网站名-Slogan-关键词1-关键词2`; subdirectory home:
  `子栏目名-子关键词1-子关键词2-网站名`; inner page: `内页功能-子栏目名-网站名`. Description:
  plain sentences describing what the page gives; add a CTA line ("Learn…"). Keywords meta: omit.
  Title 50–60 chars, keyword leftmost, **append brand/site name on every page** (even if truncated).
  H1 may equal Title when you can't write a better one.
- **Headings discipline**: exactly one H1 per page; H2s multiple; H3 under each H2; headings are
  the page skeleton for Google's semantic parse *and* a preview for users — add an in-page TOC on
  long pages. Show a TOC where useful; never sequential empty headings.
- **Meta-tags that matter (the 10)**: Title · Description (150–160 chars, CTR not rank) · Headings ·
  img `alt` (accessibility + Google-Images traffic; big descriptive images on the page → gallery/
  thumbnail SERP features) · `rel="nofollow"` on UGC/paid outbound links (pair with
  `noopener noreferrer`) · per-page robots meta (`noindex` for admin/thin pages — don't accidentally
  block important ones) · canonical (F.5) · JSON-LD schema (Google markup helper
  `google.com/webmasters/markup-helper`) · Open Graph (`og:title/url/description/image(+alt/w/h)`;
  Twitter cards separate) · `viewport` (mobile-friendliness ≈ 5% of ranking factors, indirect but real).
- **Restructuring a live site**: the golden rule — **never change existing URLs** (indexed +
  externally linked). New demand → new pages under the old domain's subdirectories (act like a new
  site without a new domain). Fix in place only: TD quality, internal-link tree, missing sitemap,
  missing canonical, heading structure. Click depth: hard cap 4 from home, ideally ≤3.
- **Internal-link checklist** (beyond §E.4): text links, never image-only; anchor = target page's
  keyword phrase; new page appears on the **home latest list for ≥5 days**; when shipping a new
  page, add links *from* it to old key pages and *from* old pages *to* it; every category lists all
  its inner pages; every inner page links up (parent category) and home; footer carries key pages.
  Result: sitelinks in SERP (Google extracts frequently-clicked inner links as mini-navigation).
- **SERP-feature recipes (10 styles)**: mini-nav sitelinks ← home links to high-traffic inner pages ·
  sitelinks searchbox ← prominent site search · FAQ accordion ← on-page Q&A list · gallery /
  right-thumbnail ← one big image with alt · **rating stars** ← one on-page rating + aggregate
  JSON-LD (users read it as Google's score of the page — highest CTR trick, "样式9") · knowledge
  box footer ← structured key/value table on page · image-pack ← image-intent query + alt'd big
  images. Feed Google JSON-LD (`application/ld+json`) per its structured-data docs instead of
  hoping it extracts.

### F.5 Googlebot mechanics & normalization (delta on §E.5 / §C)

- Crawler = **GET → raw HTML → parse text + extract links**; it does *not* run JS for small sites
  (render service is a privilege for big useful sites). Hence: SSR mandatory; tool sites still need
  textual descriptions (Google won't execute your tool to learn what it does — it trusts-then-verifies
  via user behavior, demoting overstated copy).
- **JS language-switching voids multilingual SEO**: URL unchanged → only one language ever indexed.
  Language must live in the URL (subdirectory prefixes).
- Sitemap = a *suggestion* Google may ignore; it prefers crawling links. Counter-example that
  scales: **100K+ pages indexed in <1 month with no sitemap at all** — home always lists newest
  content + one paginated "all pages" page. Crawl budget is earned by freshness, not by XML.
- **canonical rules**: purpose is duplicate *URLs* (www vs apex, `/x/` vs `/x/index.php`, tracking
  params `?r=reddit`/`?via=ls`), not duplicate content. Every page self-references **its own**
  canonical; **never point the whole site at home**; each language variant canonicals to *itself*
  (`/en/shequn/` → itself, not `/shequn/`). With correct canonical, all parameter-variant backlink
  equity consolidates to one URL. Pick one host: small site → bare domain main, www 301→bare; large
  site with cookie-safety needs → www main, bare 301→www; **always one 301 hop, no double jump**.
- **robots.txt in multilingual sites**: a `Disallow: /people/` only covers the default locale —
  write **one line per language prefix** (`/ja/people/`, `/fr/people/`, …), update whenever a locale
  is added; never use `/*/people/` wildcards (collateral blocks like `/abc/def/people/`). Rule of
  thumb: any page not built for traffic should be blocked from crawl. (Next.js: generate robots.ts.)
- **Index-acquisition launch sequence** (the 48h proof: domain reg 7-20 → first Google traffic 7-21
  → #1 ranking by day 45): ① GA snippet in a `display:none` div at the very end of `<body>`
  (never let analytics block render); ② sitemap + GSC submission; ③ drop the link where Googlebot
  camps (V2EX post about the product = 10-year-old trick, still works because V2EX's Google weight
  grew) — fastest 1h, normally ≤1 day; if days pass with nothing, read GSC's coverage warnings for
  quality/noindex faults before anything else.
- **The ranking summary in three lines** (哥飞's compression): ① title/h1/on-page keywords get the
  page *into the candidate pool* for the query; ② backlinks get it *into the top 10*; ③ site
  experience (dwell, bounce, pogo-sticking) *decides its position* there. Consequence: **nofollow
  backlinks still count** — Google changed the algorithm (organic shares are often nofollow); take
  every link you can get, don't optimize for dofollow only.

### F.6 Content-type tool sites & programmatic SEO (delta on §E.8)

- **Content-type AI tool site flywheel** (哥飞's named pattern): free tool → user output published
  to a public plaza → real-user pages indexed → search/image traffic → new users. Monetize as
  free-tool + paid value-add (HD download / keep private / no watermark). Build it **templated** —
  one codebase relaunches as sticker / avatar / video site; input×output can be text/image/video/URL → page.
  This is *not* spam in Google's eyes: real tool + real UGC serving real queries.
- **Henry's tree content strategy** (zero-experience elite dev, revenue doubling monthly): home
  targets the hard head keyword but *won't rank at first* — so drill **L2 words into subdirectories,
  L3 words into one-page-one-keyword inner pages**, ship them one at a time and *win each before the
  next*; watch L2 dirs gain rankings, then the home head word; then expand L4 and sideways channels.
  (Same ladder as §E.3 small→big, but expressed as site architecture.)
- **Programmatic without AI text** (distance.to: 12.97M visits/mo, 1.29M indexed pages): a tiny
  demand ("distance from X to Y") × combinatorial entities (200+ countries → 40K pairs; down to
  states/cities → millions). One template + **structured** DB rows (plain text won't compose) +
  dynamic render per request + ~10min cache; pages are pointers, not files. Data: plan schema first,
  scrape public sources (never copyrighted/private), merge multiple sources. Scale-up SOP:
  ship **10 pages/day**, check GSC — are they crawled, do they surface queries? Tune the template
  until yes, then 100/day → 200 → 500 → 1000 as crawl appetite proves out. Don't let "most of the
  description is identical" across pages; every page answers a query someone actually types.
  Sub-domain vs sub-directory for locales: both work, but **new sites: sub-directory** — cold-start
  cheaper (even Canva does `/ja_jp/…`).
- **The long-page pattern** (kayak `car rental nyc` page: ~12 keyword-adjacent modules — form, why
  us, price tiers, tips, FAQs, reviews/directory, locations, guide list, when-to-book, brands,
  vehicle types — ≈620K Google clicks/yr from one URL): don't fear length; fear irrelevance.
  Modules each carry their own data + copy, all orbiting the one keyword.
- **Failure lesson (ChatGPT4o.ai, 哥飞's own)**: a "latest Q&As" home module that leaked *full text*
  turned the home from 400 to 3,000 words → core keyword density diluted, semantic read drifted
  away from GPT-4o → Google cut impressions and ranking; removing the module didn't recover fast.
  Rule: home lists should carry **titles/anchors only**, keep body text on the inner pages; guard
  home-topic purity as a P0 asset. Corollary — Google likes pages that are *long on the keyword's
  facets* but *short on everything else*.
- **"Features Google likes" audit list (15)**: fast load · mobile-friendly · good internal-link
  structure (nav+breadcrumb+home latest-list) · long dwell · low bounce · pages/session ·
  original (no scraping; rewrite via GPT in your own template) · authoritative (whole-site depth on
  one topic — big sites' inner pages can't out-cover a dedicated site) · useful · **topically
  coherent** (all pages relate to the core keyword — not more pages, but *related* pages) ·
  regularly updated · tool pages carry text · per-page TD · proper H tree · img alt.

### F.7 Multilingual static recipe (pre-framework era, still the semantics to replicate)

Pick locales by **per-country volume of the word itself** in Semrush (phone-number-generator: GH/US/
NG/UK/IN/PH all English-speaking → English alone suffices — verify before translating anything).
Subdirectory = ISO 639-1 code (`/hi/`, `/tl/`); language switcher labeled in the language's own name
(हिन्दी / Filipino); each locale page: `lang` attr swapped, styles path `../`, cross-language links
via `../<code>/<same-page>`; translate TD + visible text (URLs/filenames stay English-keyworded);
**back-translation check**: have GPT translate the result *return to English* and compare.

### F.8 What's still gated

The web.cafe columns (养网站防老 11 · 进阶教程 10 · 挖掘需求 18 · 新手入门 17 · 高手分享 9 = 65
articles) incl. 谷歌SEO三字经(注解版) and the Ahrefs time-to-rank study are login-gated and **not
in this archive**; key numbers claimed there (51词, 趋势找新词, 内链内容型工具站, 排名时长) are
reconstructed here from the 公众号 originals. If raw text is later unlocked, diff against F.1–F.7
rather than re-derive.
