# PowerSoftware Find Profitable Demand — Agent Skill Plugin

Packages the **`find-profitable-demand`** Agent Skill. It teaches an AI coding agent how to pick,
validate and monetize a **profitable demand** for an indie / 出海 (chuhai) website, following
哥飞 (GeFei)'s **"跑通闭环" (run the full loop)** method — the *demand-first* half that comes
**before** [`plan-seo-site`](../plan-seo-site/README.md).

## What this plugin does

Given "I want to build a site / product that makes money", the skill guides the agent through:

1. **Mindset** — 养网站防老 (site = long-term asset), 数量胜于质量不憋大招, start with a 练手站,
   SEO is a skill not 点金术, 站长与搜索引擎是生态.
2. **Demand sourcing** — 站找站·站找词, mine products already running ads, split a big site's
   traffic (Character.ai/Gumroad), vercel.app subdomains & outbound links, 财富密码词根, 书名→工具站.
3. **A hard validation gate** — 搜索量来自共识, 真实网页供应量, **KGR** blue-ocean formula, and the
   **第一美元 ROI** arithmetic — *don't build until it pays*.
4. **Fast MVP launch** — 半小时上游戏站 / 10分钟上导航站 (Vercel + Cloudflare + GSC), open-source CMS.
5. **Traffic & monetization** — link paths, 7 promo channels, AI-SEO/GEO; AdSense / paid / affiliate.
6. **A real case library** — Chatbase, Fyxer, Deformity, Chessigma, Teachizy, … each tagged with the
   loop phase it proves.

This is a **knowledge-only** skill: no scripts, no `npm install`, no Node needed.

**Division of labor:** this skill decides **WHAT to build and whether it pays**;
[`plan-seo-site`](../plan-seo-site/README.md) decides **HOW to rank the keyword/URL** once chosen.

## Provenance

- **Source repo**: [powersoftware-app/powersoftware-agent-skills](https://github.com/powersoftware-app/powersoftware-agent-skills)
- **Source skill directory**: [`skills/find-profitable-demand/`](https://github.com/powersoftware-app/powersoftware-agent-skills/tree/main/skills/find-profitable-demand)
- **Method source**: distilled from 123 article titles + excerpts harvested from 哥飞's public-account
  article list (2026-09), plus one full body. The bodies are public to a real browser on 微信公众号 but are
  **anti-scraped** (WeChat serves a TCaptcha shell to scripted `fetch()`/`iframe` loads), so they could not
  be captured at scale — **nothing is paywalled**. Figures are *as reported by 哥飞/his members*, not verified truth.
- **Logo**: `assets/avatar.svg` — original artwork (sprouting plant + magnifier over a coin, blue→indigo).

## Included

```text
find-profitable-demand/
├── .claude-plugin/plugin.json
├── .qoder-plugin/plugin.json
├── README.md
├── assets/avatar.svg
└── skills/find-profitable-demand/
    ├── SKILL.md      # the 6-phase 跑通闭环 loop
    └── reference.md  # §A sourcing catalog · §B validation arithmetic · §C case library · §D launch & monetization
```

## Install

**Option A — one-line installer from the source repo (recommended):**

```bash
# macOS / Linux / WSL
bash <(curl -sL https://raw.githubusercontent.com/powersoftware-app/powersoftware-agent-skills/main/install.sh) qoder find-profitable-demand
```

```powershell
# Windows PowerShell
.\install.ps1 -Target qoder -Skill find-profitable-demand
```

**Option B — Claude Code marketplace:**

```
/plugin marketplace add powersoftware-app/powersoftware-agent-skills
/plugin install find-profitable-demand@powersoftware-agent-skills
```

**Option C — drop this plugin folder into a Qoder project:** copy the entire `find-profitable-demand/`
folder into your Qoder plugin directory; Qoder reads `.qoder-plugin/plugin.json` at the plugin root.

## Usage

No commands to run. Invoke the skill by asking the agent to help you choose/validate a site idea —
e.g. *"what should my next 出海 site target?"*, *"is this keyword worth building a site around?"*, or
*"how do indie hackers find a profitable demand?"*. The agent loads `SKILL.md`, runs the 6-phase loop,
and cites the case library in `reference.md`.

## Related skills

- [`plan-seo-site`](../plan-seo-site/README.md) — the SEO **execution** half (rank the keyword you picked).
- [`publish-product`](../publish-product/README.md) — publish a validated paid product on PowerSoftware.
- [`integrate-license`](../integrate-license/README.md) — wire licensing into the client.

## License

MIT (inherited from the upstream repo).
