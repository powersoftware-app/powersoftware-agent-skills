---
name: plan-seo-site
description: End-to-end SEO playbook for a product site, built on 哥飞 (GeFei)'s method — site-as-long-term-asset mindset, demand discovery, keyword selection (task words not attribute words, ROI formula, beginner thresholds, small-word-to-big-word strategy, search-intent read), on-page TDH & "categorize-and-list", one domain + one-level semantic subdirectory + one-page-one-keyword, internal linking, server-render & i18n (hreflang/canonical/sitemap) infrastructure, trailing-slash & main-domain normalization, launch & indexing verification via Search Console 24–48h, link-building paths, monetization, and scaling (programmatic SEO). Use when the user mentions SEO / 选词 / 关键词 / 落地页 / 语义子目录 / 收录 / GSC / hreflang / canonical / 尾斜杠 / 起一个新站 / 网站没流量 / 出海站点 / 独立开发者 SEO / 养网站 / 外链, is deciding whether to split a site into subdomains or multiple domains, or has a technically-clean site that ranks for zero keywords. Ships with a repo self-check list and a worked powersoftware.app example in reference.md.
---

# Plan a Site's SEO (哥飞 method, full lifecycle)

Teaches the agent to take a product site from **demand discovery → ranking → income** using 哥飞's
method, and to fix the most common root cause of a new site that "does everything right technically
yet ranks for nothing": building a *platform framework of empty pages* instead of *traffic entry
points around keywords real people search*.

Two layers:

1. **The transferable method** (this file) — mindset + an 8-phase lifecycle. Applies to any site.
2. **A worked example + repo self-check** ([reference.md](reference.md)) — keyword data, copy
   frameworks, a 16-point repository self-check, and the `powersoftware.app` diagnosis that the
   numbers here are drawn from.

> Scope: this is *planning + self-check* knowledge. No scripts on purpose — the only "tooling" is a
> keyword/SERP/authority read and a repo grep, both of which the agent does directly.

---

## Mindset (decide this before touching keywords)

- **Site = long-term asset** (「养网站防老」): plant one tree, then another, into an orchard.
  Diversify so no single keyword/domain/account can wipe you out. Control your traffic, users, income.
- **Webmasters and search engines are an ecosystem** — satisfy the user's need and Google pays you
  traffic. SEO is not "write a blog + buy links"; it is a full loop from demand to revenue.
- **Success = 产品力 × 共识力 × 传播力 × SEO力 × 品牌力**; search volume comes from **consensus**
  (an established name/word people already search), which is why a brand-new coined brand ranks for zero.
- **Time split**: ~40% finding demand, ~20% building, ~40% promoting/linking. Most devs invert this.
- **Ship fast beats perfect**; **never batch-publish junk pages on a new site**; build the page the
  user actually wants (tool page / info page / product page) — a tool site still needs content or
  Google can't tell what it does.

---

## Step 0 — Three non-negotiable prerequisites

If any is violated, fix it before keyword work; nothing downstream will pay off.

| Rule | Why (哥飞口径) |
|---|---|
| **Real content is server-rendered / static** (SSR/SSG), not client-only hydration. | Google can't read a blank SPA body — a technically-fancy site ranks for nothing. |
| **One domain, first-level semantic subdirectories** (`/upscale/`, `/remove-watermark/`) — never subdomains, never one-domain-per-product. | 「谷歌把每个域名（含子域名）当独立站，各自从零攒权重。」 A subdomain/new domain throws away all accumulated authority. |
| **Page depth ≤ 3** from the home page. | Deep paths dilute crawl & authority; the demand page should be reachable in a few clicks. |

---

## The two load-bearing ideas

### 1. Task words, not attribute words

Users search the **job they want done**, not **how it's built or where it runs**.

- ✅ Task word (make it the title): `remove watermark from photo`, `image upscaler software`, `photo restoration`.
- ❌ Attribute word (body/FAQ only, **never** the `<title>`/`H1`): `offline`, `desktop`, `for windows`, `local`, `no upload`, `batch`.

Your differentiation ("runs 100% locally, images never leave your PC, one-time purchase") is a
**reason you write into the body and FAQ** — it is not a searchable title.

### 2. One page = one keyword

- Each page targets **exactly one** keyword; don't stack several big words on one page.
- The semantic directory is **top-level** (`/upscale/`), never buried (`/en/product/xxx/yyy`).
- Language prefixes (`/en-US/`) are **i18n routing**, they carry **no keyword value** — don't confuse
  them with demand-word landing directories.

---

## Lifecycle — track these phases

Copy this checklist and mark progress:

```
- [ ] Phase 1: Discover demand & pick keywords (6 sourcing methods; ROI formula; beginner bars; small→big)
- [ ] Phase 2: Read the SERP & intent (who ranks, what page type; winnable vs red-ocean; link budget; trend)
- [ ] Phase 3: Lock the structure (one domain, first-level subdirs; main-domain + trailing-slash normalization)
- [ ] Phase 4: Build the page (first screen works; TDH; categorize-and-list; internal links; structured data)
- [ ] Phase 5: Internationalize (skeleton good = don't rebuild; fix content-layer titles; narrow to one locale first)
- [ ] Phase 6: Launch checklist (GSC + GA + Sitemap + Robots; submit so Google finds a linkless new page)
- [ ] Phase 7: Verify indexing (GSC 24–48h after publish; wrong-keyword trap; seed-word mining)
- [ ] Phase 8: Links, monetize & scale (link paths; AdSense/paid/affiliate; programmatic SEO; multi-site)
```

### Phase 1 — Discover demand & pick keywords

Six sourcing methods: (1) seed a **word root** through Semrush/Ahrefs and filter; (2) Google Trends
for related/rising terms; (3) mine a big site's keyword list for incremental traffic; (4) read **ad**
data — words incumbents pay to bid on are worth money; (5) Google autocomplete + related searches;
(6) SimilarWeb on competitors → their **non-brand** keywords.

**Wealth-password word roots** (suffix patterns that mark a tool/demand): `Generator, Translator,
Converter, Calculator, Checker, Editor, Maker, Creator, Detector, Online, Processor, Designer,
Analyzer, Builder, Viewer, Extractor, Optimizer, Simulator, Assistant` (full list + notes in
[reference.md](reference.md) §E).

Score each candidate:

- **ROI = (volume × CPC) / KD** → `>200` strongly recommended · `50–200` viable · `<50` skip. (CPC is
  a proxy for commercial value; a high-volume / zero-CPC word is often informational.)
- **Beginner bars** (first site = learn the loop, not max revenue): `KD < 10`, `referring domains
  needed < 10`, and even **100/mo volume is fine** to start.
- **Small-word → big-word strategy**: take rankings on low-difficulty long-tails first, then let them
  feed authority back to the head term. New words reward **speed**; old words reward **judgment + patience**.
- Confirm it's a **task word** (idea #1). Reject attribute-only phrases as titles.

Output: a tiered candidate table (word / volume / KD / CPC / weakest occupant / verdict). See
[reference.md](reference.md) §A for a fully worked table.

### Phase 2 — Read the SERP & intent

Directly search the word and look at the **top 10**:

- **What page type ranks** (tool page? listicle? forum? store?) → build that type (「用户真正要什么就
  做什么页面」).
- A **new/low-DR site already in the top 10** ⇒ winnable (strongest signal).
- A slot held by a **Reddit/forum post or a big site's off-topic "convenience" page** ⇒ **content
  vacuum** ⇒ a focused page can take it — **prefer these over the biggest word**.
- 9/10 slots are purpose-built pages by high-DR incumbents ⇒ **red ocean**, not your first fight.
- **Budget links** to crack top 10 (e.g. ~55–120 referring domains, median 80). **Check the trend** —
  a shrinking big word is a worse asset than a stable/rising one; spread bets.

### Phase 3 — Lock the structure

- **Main domain**: pick ONE canonical host; everything (sitemap, canonical, internal links) agrees;
  the other form **301s in a single hop** to the final language page — no `bare → www → /en-US/` double
  jump. Third parties link the bare domain by convention, so factor that in.
- **Trailing slash (silent killer)**: `/x` and `/x/` both returning 200 with no mutual 301 splits one
  page's authority into two GSC rows. Pick one form, 301 the other, align all internal links +
  canonical. This alone often clears most "Crawled – currently not indexed".
- Reserve the first-level semantic subdirs from Phase 1; give product pages a readable **slug** too,
  but choose the value as a **demand word or genuinely unique brand** — never an already-taken word.
- **Brand-name collision pre-check — run this BEFORE you coin a name.** A brand must be SERP-ownable:
  if an established mark already ranks for your exact name, your brand searches show *them* and Google
  can't aggregate you into one entity (this is what killed `CleanCanvas` — a Shopify theme dev owns it).
  So: (1) search the exact candidate on Google — anything you don't own near the top disqualifies it;
  (2) check domain availability across `.com/.app/.ai` (query.domains); (3) avoid "generic-root +
  AI/tool-suffix" coinages (they collide) and names Google silently "corrects" (`Pixelfold` → `Pixel Fold`).
  A taken or purely descriptive name caps the whole brand-word channel at zero — no i18n work can save it.

### Phase 4 — Build the page (TDH, not TDK)

- **T**itle (core word as far left as possible), **D**escription, **H**eadings (H1 matters most; H2–H6
  are the skeleton). Meta `keywords` is dead — Google doesn't trust it.
- **First screen must *work***, not just describe: embed the tool (interactive demo / before-after).
  "Intro + download button" loses the click, then the rank. Increase **dwell time** with free trial,
  no-login use, beyond-expectation experience — Google reads interaction data to judge whether the
  page satisfies the query.
- **Categorize-and-list** (「分门别类罗列」, 哥飞's six-character mantra): present options by country /
  type / feature as clear lists — matches how users and Google parse a tool site.
- **Internal linking** (importance ≥ external): home links to every important page; related pages
  cross-link; **descriptive anchor text**; breadcrumbs. A live "latest pages" list on the home page +
  good internal links beats a sitemap alone (a sitemap is a *suggestion*).
- FAQ answers come from the **real "People Also Ask"** on that SERP — never invented.
- Structured data: `SoftwareApplication` (+ `operatingSystem`) + `FAQPage` + `BreadcrumbList`. When the
  brand word collides with an unrelated incumbent, wire the JSON-LD **entity graph** — give `Organization`/
  `WebSite` a stable `@id`, and point every `SoftwareApplication` back with `publisher: { @id }` — so Google
  reads the coined name as *your* org's software (free relevance/entity fix, not authority; see [reference.md](reference.md) §C.1).

### Phase 5 — Internationalize correctly

The **skeleton** (language-prefixed URLs, self-referencing canonical, full `hreflang` incl.
`x-default`, `xhtml:link` sitemap, SSR) is "don't-lose-points" plumbing — if present, don't rebuild.
Use **real URLs + hreflang** for languages, **not JS locale switching**. The gap is almost always the
**content layer**: product/page **titles & summaries untranslated** (source-language leaking into the
`en-US` site; English `<title>` = bare brand). Fix at the data model, but **split the two slots — never
treat "the title" as one uniform body field:**
- **Brand name (`productName`) = a language-invariant constant.** A real brand is *not* translated; keep
  one coined mark across every locale. Machine-translating a brand into 6 variants shatters the entity
  into 6 half-localized names nobody searches. If the name is genuinely localizable (a descriptive word),
  curate each locale by hand — never blind-translate it.
- **Descriptive tagline / summary / demand copy = localize normally** through the same i18n mechanism
  body fields use (and the searchable demand wording belongs on landing pages, not in the brand slot).
**Narrow first:** don't spread a thin site across 6 locales —
win one market, keep `hreflang` for all (cost≈0), add a language once it produces impressions.

### Phase 6 — Launch checklist

A brand-new page with **neither a GSC submission nor any backlink is nearly impossible for Google to
discover**. On launch: register the domain (suffix `.com/.ai/.net/.org`; buy via Cloudflare/Spaceship),
deploy (Vercel for speed/cost as a beginner, Cloudflare's stack later), then **must-do**: Google Search
Console + Analytics, submit Sitemap, set Robots.txt, optional structured data.

### Phase 7 — Verify indexing & mine seeds

- After a page is indexed, **GSC should show impressions within 24–48h** (fastest for a new site).
  If not, the page didn't cover the word — re-check copy length, keyword density, and whether T/D/H
  actually contain the target word.
- **Wrong-keyword trap**: impressions for *other companies' names* are misaligned traffic (low CTR);
  the only real signal is impressions on your task words. Mine those for **seed words** to expand the
  same family.
- Only after **one page completes the full loop (pick → page → impression → ranking)** add the next.

### Phase 8 — Links, monetize & scale

- **Link-building path** (start where you're already known): newsletters/directories → Product Hunt →
  AI navigation sites → tech media / self-recommendation → social platforms. Nofollow links still have
  value — don't disdain them. Build a persistent link library; push a few referring domains weekly, don't stop.
- **Monetize**: AdSense (beginner-friendly), user payment (subscription/one-time), affiliate, and a
  multi-site matrix for passive income.
- **Scale**: keep publishing quality inner pages; **programmatic SEO** for enumerable demand (generate
  many pages from a template); review competitors in SimilarWeb/Ahrefs; expand languages; use AI to
  generate *useful* content — Google accepts useful, rejects junk.

---

## Common pitfalls (each is a real observed failure)

| Pitfall | Reality |
|---|---|
| "My site is technically clean, so SEO is fine." | *问题不在技术* — a framework of empty pages ranks for nothing. |
| Home `<title>` = the brand name only. | A new brand has ~0 searches → home ranks for nothing. Put a positioning keyword in it. |
| Title uses `offline / desktop / for windows / batch`. | Attribute-word family has no volume. Body/FAQ yes, title no. |
| Only ever write blog posts. | Build the page the user wants (tool/list/product); a tool site still needs explanatory content. |
| Split products into subdomains or separate domains. | Google treats each as a new site from zero. Use first-level subdirs. |
| 6 languages × a handful of pages. | Authority diluted per locale. Win one locale first. |
| Landing page = intro + a big download button. | Users clicked expecting to *do the task*; bounce kills the rank. Make it work on-page. |
| Chase the single biggest keyword. | If 9/10 incumbents built pages for it, it's a red ocean. Prefer the vacuum word. |
| `/en-US` vs `/en-US/` both 200. | Splits one page's ranking into two GSC rows. 301 to one form. |
| Batch-publish junk pages on a new site. | A new site gets penalized for thin spam; ship a few strong pages first. |
| Product/brand name already taken or purely descriptive. | The brand-word channel (returning visitors who search your name) never opens, and Google can't build an entity for a name someone else owns. Coin a SERP-ownable mark (Phase 3 pre-check). |
| Machine-translating the **brand name** per locale. | A brand is language-invariant; 6 translated variants split your entity 6 ways. Localize the *description*, keep the *brand* constant. |

---

## Resources

- [reference.md](reference.md)
  - §A — worked keyword-research data (哥飞 KD / volume / CPC / SERP verdict tables).
  - §B — landing-page copy frameworks (`/remove-watermark/`, `/upscale/` full templates).
  - §C — **repository self-check list** (16 checks: canonical, hreflang, trailing slash, robots prefix,
    main domain, content i18n, slug, landing type, internal links…) to run against a real repo.
  - §D — the `powersoftware.app` case snapshot (findings, missing fields, execution order).
  - §E — the condensed 哥飞 method handbook (mindset, sourcing, wealth-password roots, ROI formula,
    beginner bars, small→big strategy, TDH, categorize-and-list, Google's pipeline, tools, learning path).
  - §F — delta from the full 79-article 公众号 archive (all 51 wealth-password roots + Semrush filter
    params, word-judgment SOPs w/ kdroi walkthrough & search-intent三分, 保小图大 ladder, on-page TD/
    meta/SERP-样式 recipes, Googlebot & canonical/robots normalization, programmatic pacing, failure
    lessons like ChatGPT4o.ai, multilingual static recipe).
