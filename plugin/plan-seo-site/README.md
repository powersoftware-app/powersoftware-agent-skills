# PowerSoftware Plan SEO Site — Agent Skill Plugin

Packages the **`plan-seo-site`** Agent Skill. It teaches an AI coding agent how to get a
product site's **SEO foundation** right — the keyword-driven structure, URL design, landing
pages, multi-language handling, and indexing verification — following 哥飞 (GeFei)'s diagnostic
method.

## What this plugin does

Given a brand-new or underperforming product site, the skill guides the agent through:

1. **Two prerequisites** — real content must be server-rendered, and everything lives on **one
   domain with first-level semantic subdirectories** (never subdomains, never one-domain-per-product).
2. **The two load-bearing ideas** — *task words, not attribute words* (users search the job, not
   `offline`/`desktop`/`windows`); and *one domain + one-level semantic subdir + one page per keyword*.
3. **A 5-phase workflow** — pick keywords (volume × difficulty × SERP read × link budget × trend),
   lock the structure (main domain + trailing-slash normalization), build each landing page
   (first screen works on-page), internationalize (skeleton vs content-layer gaps), verify indexing
   (GSC 24–48h) and push links.
4. **A repository self-check list** — 15 checks (canonical, hreflang, trailing slash, robots prefix,
   main domain, content i18n, slug, landing-page type…) so the agent can grep a real repo and tell
   the "tech is fine" skeleton from the actual gaps.
5. **A worked case** — the full `powersoftware.app` diagnosis with keyword data tables and copy
   frameworks.

This is a **knowledge-only** skill: no scripts, no `npm install`, no Node needed.

## Provenance

- **Source repo**: [powersoftware-app/powersoftware-agent-skills](https://github.com/powersoftware-app/powersoftware-agent-skills)
- **Source skill directory**: [`skills/plan-seo-site/`](https://github.com/powersoftware-app/powersoftware-agent-skills/tree/main/skills/plan-seo-site)
- **Method source**: 哥飞 (GeFei) SEO public-account method (distilled from 123 article titles + excerpts,
  2026-09) + a live 哥飞 SEO Agent diagnosis of `powersoftware.app`. Article bodies are public to a real
  browser on 微信公众号 but are **anti-scraped** (WeChat TCaptcha-gates scripted `fetch()`/`iframe` loads),
  so the methodology here is distilled from titles/excerpts, the recorded diagnosis transcripts and the
  working notes — not a verbatim crawl, and nothing is paywalled.
- **Logo**: `assets/avatar.svg` — original artwork (magnifier + rising keyword bars, blue→indigo).
  No third-party asset reused.

## Included

```text
plan-seo-site/
├── .claude-plugin/plugin.json
├── .qoder-plugin/plugin.json
├── README.md
├── assets/avatar.svg
└── skills/plan-seo-site/
    ├── SKILL.md      # the method (2 layers: transferable playbook + how to use the reference)
    └── reference.md  # §A keyword data · §B copy frameworks · §C repo self-check · §D powersoftware.app case
```

## Install

**Option A — one-line installer from the source repo (recommended):**

```bash
# macOS / Linux / WSL
bash <(curl -sL https://raw.githubusercontent.com/powersoftware-app/powersoftware-agent-skills/main/install.sh) qoder plan-seo-site
```

```powershell
# Windows PowerShell
.\install.ps1 -Target qoder -Skill plan-seo-site
```

**Option B — Claude Code marketplace:**

```
/plugin marketplace add powersoftware-app/powersoftware-agent-skills
/plugin install plan-seo-site@powersoftware-agent-skills
```

**Option C — drop this plugin folder into a Qoder project:** copy the entire `plan-seo-site/`
folder into your Qoder plugin directory or reference it in your project's plugin manifest; Qoder
reads `.qoder-plugin/plugin.json` at the plugin root.

## Usage

No commands to run. Invoke the skill by asking the agent to plan/audit a site's SEO — e.g.
*"I'm launching a site for a desktop upscaler, which keywords and URL structure should I target?"*
or *"audit my site's SEO infrastructure."* The agent loads `SKILL.md`, follows the 5 phases, and
runs the §C self-check against the repo.

## Related skills

- [`publish-product`](../publish-product/README.md) — publish the product on PowerSoftware.
- [`integrate-license`](../integrate-license/README.md) — wire licensing into the client.

## License

MIT (inherited from the upstream repo).
