---
name: find-profitable-demand
description: Find, validate and monetize a profitable demand for an indie / 出海 website, built on 哥飞 (GeFei)'s "跑通闭环" method — the mindset before touching keywords (养网站防老, 数量胜于质量不憋大招, 先做练手站, SEO是实践不是点金术), a demand-sourcing toolkit (站找站·站找词顺藤摸瓜, mine products that are already running ads, KGR blue-ocean formula, split a big site's traffic to find new demand e.g. Character.ai/Gumroad, vercel.app subdomains & outbound links reveal unclaimed needs, 财富密码 word roots, 从一本书名发现一批工具站), a hard validation gate (搜索量来自共识 · 一个关键词值不值得做的真实判断 · ROI=第一美元算术), a fast ship-the-MVP launch loop (练手站→半小时上游戏站/10分钟上导航站→Vercel+Cloudflare→GSC), traffic & link-building paths (内链外链四句话五步检查, 开源项目白嫖外链, Nofollow也有用, 达人营销, Reddit涨karma, AI-SEO/GEO 让 AI 引用你), monetization (AdSense 申请细节 / 付费 / 联盟 / 把广告收入从 800 提到 2000 刀) and a portfolio-scaling / 正反馈 review habit. Ships with a real case library (Chatbase, Fyxer, Deformity, Chessigma, Teachizy, Character.ai, 日语站…) as evidence in reference.md. Use when the user asks 做什么站 / 找需求 / 挖掘需求 / 选题 / 蓝海词 / KGR / 这个关键词值不值得做 / 练手站 / 出海赚钱 / 变现 / AdSense / 日入千刀 MRR / 正反馈 / build in public / 案例 / 独立开发者如何赚钱 / 从 0 到第一个订单, is stuck choosing WHICH product/site to build, or wants proof a niche makes money. This skill decides WHAT to build and whether it pays; for HOW to rank it once you have the keyword/URL, use the sibling skill plan-seo-site.
---

# Find a Profitable Demand (哥飞 method: 跑通闭环, demand-first)

This is the **"what should I build, and will it make money"** half of 哥飞's playbook.
It comes **before** [`plan-seo-site`](../plan-seo-site/SKILL.md), which is the **"how do I
rank the page for the keyword I picked"** half. The two are complementary:

- **This skill** — choose the demand, validate it pays, ship the MVP, get the first dollar.
- **plan-seo-site** — turn a chosen keyword into a ranked, indexed, monetized landing page.

> Root problem it solves: most indie devs start from *"what can I build / what do I know"*
> and end up with a well-made site that nobody searches and nothing pays. 哥飞's fix: start
> from **a demand real people already express**, prove a **competitor monetizes it**, ship the
> smallest page that satisfies it, then run the full **需求 → 建站 → 流量 → 变现** loop once before scaling.

Two layers:
1. **The transferable method** (this file) — mindset + a 6-step loop. Applies to any site.
2. **The evidence** ([reference.md](reference.md)) — a case library of real 出海 sites and what
   each one proves, plus the demand-sourcing catalog and the ROI / KGR arithmetic.

---

## Mindset (decide this before hunting for a demand)

- **Site = long-term asset (养网站防老 / 养网站如种果树).** Plant one tree, then another, into an
  orchard. No single keyword / domain / account should be able to wipe you out. You are buying a
  *portfolio of small cash-flowing trees*, not chasing one lottery ticket.
- **Quantity beats quality; don't 憋大招 (hold back for a masterpiece).** A University of Florida
  study (a class graded on *volume* of photos, not quality) matches 哥飞's field experience: ship
  many small bets, learn from each, let the winners compound. Dozens of members found their winner
  on their 5th–20th site, not the first.
- **Start with a 练手站 (practice site), not a one-shot money site.** The first site's job is to make
  you run the *whole loop* once — pick → build → get indexed → earn the first dollar — not to maximize
  revenue. Give yourself permission to build a site that ignores keywords entirely just to learn the pipeline.
- **SEO is a money-earning *skill*, not 点金术 (a magic touch).** It needs sustained effort across a
  full loop; anyone promising 10× your ticket price in week one is a scammer. 哥飞 only promises
  "赚回门票钱" first.
- **You and Google are an ecosystem.** A webmaster needs the search engine and the search engine
  needs webmasters; satisfy the user and Google pays you traffic.
- **Success = 产品力 × 共识力 × 传播力 × SEO力 × 品牌力** — SEO is one multiplier, not the whole equation.
- **The low-hanging fruit is gone, but there is still fruit.** Don't despair that it's "too late";
  new words, new scenes and small unloved needs are still open every month.
- **耐心 + 平常心 + 立刻行动.** 哥飞's recurring refrain (《给自己一点时间…多一点耐心》《出海的决心、耐心、
  细心和平常心》《只要行动，就会有收获；只有行动，才会有收获》): the loop rewards persistence across many
  small sites, not one clever bet — so *act now* on a small practice site rather than planning forever.

---

## The loop — track these phases

Copy this checklist and mark progress for **each** candidate site:

```
- [ ] Phase 1: Source a demand (站找站·站找词 / ads / big-site split / word-roots / outbound)
- [ ] Phase 2: Validate it PAYS (consensus volume · competitor monetization · first-dollar ROI · KGR)
- [ ] Phase 3: Ship the MVP site (练手站 first; 半小时上游戏站/10分钟上导航站; Vercel+Cloudflare+GSC)
- [ ] Phase 4: Drive traffic (SEO → plan-seo-site; links; promo; Reddit; AI-SEO/GEO)
- [ ] Phase 5: Monetize (AdSense / paid / affiliate; tune revenue per visit)
- [ ] Phase 6: Close the loop & scale (verify 收入>成本, then plant the next tree; 正反馈 review)
```

### Phase 1 — Source a demand (先收集，再判断)

哥飞's rule: **collect keywords/demands first, plan the site structure later.** Ten proven
sourcing moves (full catalog with worked examples in [reference.md](reference.md) §A):

1. **站找站 · 站找词 (site-finds-site, site-finds-word)** — one successful site always sits next to
   clones and neighbors; follow the chain to the next keyword. "找不到下一个关键词" is solved by
  藤摸瓜 from a site that already ranks, not by staring at a blank page.
2. **Mine products that are already running ads** — if someone pays Google/Facebook to bid on a term,
   that term converts money. Ads = the strongest "this pays" signal there is.
3. **Split a big site's traffic** — take a 1.75亿-visit site (Character.ai) or 2445万 site (Gumroad),
   list its top pages, and find the *incremental* needs it serves that you can serve better/narrower.
4. **vercel.app subdomains & outbound links** — browse the subdomain directory and the *outbound*
   domains of niche sites to spot freshly-appeared, still-unclaimed products/keywords.
5. **财富密码词根 (money word-roots)** — feed `Generator / Translator / Converter / Calculator /
   Checker / Editor / Maker / Background / Size / AI …` (the 51-root list) into a keyword tool and filter.
6. **从一本书名 / 一个帖子 → 一批工具站** — a book title or a forum post encodes a whole family of
   tool/content needs; expand it into many pages.
7. **老词用长尾反吃主词** — old head terms are crowded, but a specific long-tail phrasing can rank
   fast and pull the head term up with it.
8. **新词 (new words) + KGR 蓝海** — brand-new terms have almost no competing supply; race to
   cover them (see the KGR gate in Phase 2).

### Phase 2 — Validate that it PAYS (the hard gate — most people skip this)

Do **not** build until the demand clears these checks:

- **搜索量来自共识 (volume comes from consensus).** People must *already* search an established
  word. A name you invented has ~0 searches → no traffic → this is why a brand-new brand ranks
  for nothing. Pick the word the market already uses, then name the brand.
- **Competitor monetization** — is at least one non-giant site already earning on it (ads, subs,
  affiliate)? If real money changes hands there, the demand is proven.
- **真实网页供应量 / KD** — high Keyword Difficulty is survivable *if the actual number of pages
  competing for the intent is small*. Look at true supply, not just the KD number.
- **KGR for blue-ocean / new words** — search `"allintitle: <your new phrase>"`; take the count of
  pages with the phrase in their title, divide by the monthly search volume. **KGR < 1 (ideally the
  allintitle count ≤ 3)** ⇒ a genuinely winnable low-competition word. This is 哥飞's way to *quantify*
  a new word instead of guessing.
- **第一美元算术 (first-dollar ROI)** — to get 1 order/day at a 1% conversion you need ~100 clicks/day;
  at a 5% CTR that's a word with ~2000 impressions/day. Score a candidate by **(volume × CPC) / KD**:
  `>200` strongly do · `50–200` viable · `<50` skip. Beginner bar: KD < 10, referring domains < 10,
  and even 100/mo volume is fine *just to close the loop the first time*.

Output: a one-line verdict per candidate (word · volume · who monetizes it · KGR · verdict). A
worked table is in [reference.md](reference.md) §B.

### Phase 3 — Ship the MVP (fast, then iterate)

Speed matters more than perfection on a practice site. Two 哥飞 recipes he demos end-to-end:

- **半小时上线一个小游戏站** — build page → deploy on **Vercel** → add the **2 Cloudflare DNS records**
  → submit to **GSC**. (Feedback is fast on new-word game sites.)
- **10分钟上线一个导航 + 博客站** — the **GitBase** pattern (GitHub-backed static CMS) + a
  无需数据库、有后台、可动态更新内容的开源 CMS.

Rules: register a real domain (`.com/.ai/.net/.org`, buy via Cloudflare/Spaceship), keep it
**server-rendered/static**, one domain, first-level semantic subdirs — the *technical* URL/on-page
choices are `plan-seo-site`'s job; here the goal is just **a live page that answers the demand.**
Every site should also be checked for whether it can carry an *ownable data asset* — the moat
(GSC data, a directory, a dataset competitors can't quickly copy).

### Phase 4 — Drive traffic

- **SEO (the core free channel)** → hand off to [`plan-seo-site`](../plan-seo-site/SKILL.md) for the
  keyword→page→index→rank execution.
- **外链 (link building)** — 四句话：任何链接都传权重(内链/外链皆然)；内链靠首页指向每个重要页 +
  相关页互链 + 描述性锚文本；五步检查内页；**Nofollow 也别嫌弃**，对权重提升有用。白嫖来源：很多
  开源项目/导航站/榜单愿意收录你；一个易实操技巧可一次性加几十条。高预算玩法见案例(3个月花30万刀外链)。
- **推广渠道 (7 ways 哥飞 lists)** — SEO · SEM(投广告) · 投流 · 邮件营销 · 发帖宣传(X/即刻, 发"收藏癖"
  内容裂变) · 软文营销 · 红人/达人营销(可四两拨千斤)。
- **Reddit 冷启动** — 3 天从负数涨到 300+ karma 再发，把 Reddit 既当需求验证场(搜关键词看用户在骂什么)
  又当首批流量。
- **AI-SEO / GEO (new channel)** — AI search (DeepSeek/ChatGPT/Perplexity) now answers with *you or a
  competitor*. Get cited by leaving **conclusion-style, confident** info across the web (podcasts,
  events, public writing → they get retrieved). Don't only optimize for keywords anymore; make your
  site the *sample room* (自己的网站有流量 = 工具的样板间证据).

### Phase 5 — Monetize

- **AdSense** — beginner-friendly; mind the application details (内容量、导航与政策页、审核前别堆重复页);
  一个新站上线第13天即可过审放广告。Tune **revenue per visit**: 哥飞 walks one member from ~\$800/mo →
  ~\$2000/mo Adsense by optimizing placement + traffic quality.
- **User payment** — subscription / one-time (see also the `publish-product` + `integrate-license`
  skills to actually sell a license-enabled product).
- **Affiliate / 联盟** and a **multi-site matrix** for compounding passive income.

### Phase 6 — Close the loop, then plant the next tree

A site "counts" only when it has completed **one full loop: 需求 → 页面 → 曝光 → 排名 → 收入 > 成本**.
- Add the next site **only after** the first loop is proven (per `plan-seo-site` Phase 7 — one page
  end-to-end before the next page).
- Review **正反馈** regularly (monthly 公众号/社群 一览, 新词新站比赛): members' wins (月入千刀/万刀俱乐部,
  140万UV/10天) are pattern templates, not vanity numbers — extract *which phase* each win came from.
- Diversify across many small sites; keep a persistent link library and push a few referring domains weekly.

---

## Common pitfalls (each is a real 哥飞-observed failure)

| Pitfall | Reality |
|---|---|
| Start from "what can I build / what I know". | Start from a demand people already express and a competitor already monetizes. |
| Build a site around a brand name you invented. | 搜索量来自共识 — a coined brand has ~0 searches; it ranks for nothing. Pick the market word first. |
| Chase the biggest keyword. | Red ocean. Prefer the vacuum / blue-ocean word (KGR, low real supply). |
| Judge a word only by KD. | KD is a proxy; look at **真实网页供应量** and who already earns on it. |
| Expect one site to make you rich. | 养网站防老 — portfolio of small trees; winners usually come on the 5th–20th site. |
| 憋大招：polish one site for months. | 数量胜于质量 — ship many small bets, iterate on signal. |
| First site = a money site, skip the loop. | Make a 练手站 first just to run 需求→上线→收录→第一美元 once. |
| Only write blog posts / launch and forget indexing. | Build the page the user wants; submit GSC + get a link so Google can find a linkless page (see plan-seo-site). |
| Ignore revenue per visit after traffic arrives. | Tuning AdSense/placement can double income on the same traffic. |
| Treat AI search as someone else's problem. | AI now cites you or a competitor — do AI-SEO/GEO deliberately. |

---

## Resources

- [reference.md](reference.md)
  - §A — **Demand-sourcing catalog**: each of Phase-1's moves with 哥飞's worked examples
    (站找站, ads-mining, Character.ai/Gumroad big-site split, vercel.app/出站挖掘, 财富密码词根,
    书名/帖子→工具站, 老词长尾反吃).
  - §B — **Validation arithmetic**: KGR formula & worked numbers, 第一美元 ROI arithmetic,
    共识/真实供应量 reads, a candidate-verdict table.
  - §C — **Case library** (the proof): Chatbase, Fyxer, Deformity, Chessigma, Teachizy,
    Character.ai 套壳, 日语站, Gumroad 高流量页, StickerBaker, plus member 万刀俱乐部 wins — each
    tagged with *which loop phase it teaches*.
  - §D — **Launch recipes & stack**: 半小时游戏站 / 10分钟导航站, Vercel+Cloudflare+GSC flow,
    GitBase / 无数据库开源 CMS, monetization (AdSense 申请细节 & 收入优化) notes.
- Sibling skill [`plan-seo-site`](../plan-seo-site/SKILL.md) — the SEO execution half of the method
  (keywords→URL→on-page→indexing→programmatic SEO). Use this skill to pick the demand, then that one
  to rank it.
