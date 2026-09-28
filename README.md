# PowerSoftware Agent Skills

<p align="center">
  <b>🌐 Language / 语言</b> &nbsp;·&nbsp; <a href="./README.md">English</a> &nbsp;|&nbsp; <a href="./README.zh.md">中文</a>
</p>

A collection of [Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) for automating recurring operational tasks on the [PowerSoftware](https://www.powersoftware.app) software-distribution platform.

Skills are plain Markdown playbooks (+ optional scripts) that teach an AI coding agent *how* to perform a workflow. They follow the common `SKILL.md` format, so they work in Qoder, Claude Code, and any MCP/skill-compatible agent.

## 🤖 Let your AI coding agent install it (recommended)

Copy the prompt below and paste it into Qoder / Claude Code (or any skill-capable agent). The agent detects your OS and network, runs the installer, and confirms the result — you don't type any commands yourself:

```text
Please install the PowerSoftware Agent Skills for me.

1. Target skills directory:
   - Qoder personal scope: ~/.qoder-cn/skills
   - Claude Code:          ~/.claude/skills
   (If it's unclear which agent you are, ask me first.)
2. Install the skills you need: publish-product, integrate-license, and/or plan-seo-site.
3. Get the installer. The installer itself already tries Gitee first and falls back to GitHub.
   The most reliable route — especially in mainland China — is to clone the repo and run the
   installer locally. Either mirror works:
   - Gitee mirror (recommended in mainland China):
       git clone https://gitee.com/powersoftware-app/powersoftware-agent-skills
   - GitHub (authoritative source):
       git clone https://github.com/powersoftware-app/powersoftware-agent-skills.git
   Then run the installer from inside the cloned folder:
   - macOS / Linux / WSL:  cd powersoftware-agent-skills && bash install.sh <target-dir> <skill-name>
   - Windows PowerShell:   cd powersoftware-agent-skills; .\install.ps1 -Target <target-dir> -Skill <skill-name>
   Or skip cloning with the one-line remote installer (needs the raw host reachable):
   - Gitee:  bash <(curl -sL https://gitee.com/powersoftware-app/powersoftware-agent-skills/raw/main/install.sh)
   - GitHub: bash <(curl -sL https://raw.githubusercontent.com/powersoftware-app/powersoftware-agent-skills/main/install.sh)
   - Gitee:  iwr -useb https://gitee.com/powersoftware-app/powersoftware-agent-skills/raw/main/install.ps1 | iex
   - GitHub: iwr -useb https://raw.githubusercontent.com/powersoftware-app/powersoftware-agent-skills/main/install.ps1 | iex
4. Prerequisites: git on PATH and Node.js 18+ (for the skill scripts). Install them if missing.
5. When finished, list the installed skill folders to confirm, and show me each skill's
   "Next steps".
```

## One-line install

**macOS / Linux / WSL**

```bash
bash <(curl -sL https://raw.githubusercontent.com/powersoftware-app/powersoftware-agent-skills/main/install.sh)
```

**Windows PowerShell**

```powershell
iwr -useb https://raw.githubusercontent.com/powersoftware-app/powersoftware-agent-skills/main/install.ps1 | iex
```

Defaults to the **Qoder personal skills** directory (`~/.qoder-cn/skills`). Pass a target shortcut (`qoder` / `claude`) or an explicit path, plus a skill name, to install elsewhere:

```bash
bash install.sh claude <skill-name>
bash install.sh /path/to/your-repo/.qoder/skills <skill-name>
```

Replace `<skill-name>` with `publish-product`, `integrate-license`, `plan-seo-site`, or `find-profitable-demand`.

> Can't reach GitHub? The repo is mirrored on Gitee — clone it and run the installer locally:
> `git clone https://gitee.com/powersoftware-app/powersoftware-agent-skills && cd powersoftware-agent-skills && bash install.sh`.

## Install as a Claude Code plugin (marketplace)

This repo is also registered as a **Claude Code Plugin marketplace** via [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json). Inside Claude Code, run:

```
/plugin marketplace add powersoftware-app/powersoftware-agent-skills
/plugin install publish-product@powersoftware-agent-skills
/plugin install integrate-license@powersoftware-agent-skills
/plugin install plan-seo-site@powersoftware-agent-skills
/plugin install find-profitable-demand@powersoftware-agent-skills
```

After install, just mention the skill by name — Claude Code loads it dynamically whenever you ask to publish a product on PowerSoftware.

## Skills

| Skill | What it does |
|-------|--------------|
| [`publish-product`](skills/publish-product/SKILL.md) | End-to-end playbook to **publish a software product** (license-enabled or not) on PowerSoftware: register a user → apply as partner (with a mandatory human review gate) → upload cover/detail images & installer → submit the product for review. Ships with dependency-free Node scripts. |
| [`integrate-license`](skills/integrate-license/SKILL.md) | Playbook to **wire a client software product into the PowerSoftware license system** with the official zero-dependency SDK (Node / Python / Java): choose the integration scenario, fetch the latest SDK from GitHub at runtime, implement machine-code / trial / activation / edition-gating / purchase-redirect, and smoke-test the wiring. Ships with dependency-free Node scripts. |
| [`plan-seo-site`](skills/plan-seo-site/SKILL.md) | Knowledge-only playbook to **plan a product site's SEO infrastructure and keyword-driven landing pages** using 哥飞's method: one domain + one-level semantic subdirectory + one-page-one-keyword, task-words not attribute-words, keyword KD / referring-domain budget, content i18n & hreflang/canonical checks, trailing-slash & main-domain normalization, and Search Console indexing verification. Includes a 15-point repository self-check and a worked `powersoftware.app` case. No scripts needed. |
| [`find-profitable-demand`](skills/find-profitable-demand/SKILL.md) | Knowledge-only, demand-first playbook to **find, validate and monetize a profitable demand** for an indie / 出海 site using 哥飞's 跑通闭环 method: demand-sourcing (站找站·站找词, mine running-ads products, split big-site traffic, 财富密码词根, KGR blue-ocean), a hard validation gate (共识搜索量 / 真实网页供应量 / 第一美元 ROI), fast MVP launch, traffic & link paths, AdSense/paid monetization, plus a real case library. Decides *what* to build; `plan-seo-site` decides *how to rank it*. No scripts needed. |

> Prefer Qoder's plugin installer instead of copying files? Qoder-native plugin packages are also published at [`plugin/publish-product/`](plugin/publish-product/README.md), [`plugin/integrate-license/`](plugin/integrate-license/README.md), [`plugin/plan-seo-site/`](plugin/plan-seo-site/README.md) and [`plugin/find-profitable-demand/`](plugin/find-profitable-demand/README.md) — drop the whole folder into your Qoder plugins directory or your project's plugin manifest.

## Install a skill

Pick the skills directory for your agent and copy / symlink a skill folder into it:

**Qoder**
```bash
# project scope (shared with your team via git)
cp -r skills/publish-product  <your-repo>/.qoder/skills/
# personal scope (all your projects)
cp -r skills/publish-product  ~/.qoder-cn/skills/
```

**Claude Code / generic**
```bash
cp -r skills/publish-product  ~/.claude/skills/
```

The `scripts/` folder needs **Node.js 18+** (uses built-in `fetch`). No `npm install` required.

## Quick start (publish-product)

```bash
cd skills/publish-product/scripts
cp config.example.json config.local.json   # fill in baseUrl / email / password
node register.mjs --send-code              # email gets a 6-digit code
node register.mjs --code 123456            # completes registration
node login.mjs                             # stores SESSION_ID cookie
node apply-partner.mjs --send-code
node apply-partner.mjs --code 123456 --profile ../templates/partner.example.json
# ⛔ wait for an operator to approve your partner application, then:
node login.mjs                             # re-login to pick up the DEVELOPER role
node publish.mjs --spec ../templates/product.license.example.json
```

## Quick start (integrate-license)

```bash
cd skills/integrate-license/scripts
node fetch-sdk.mjs --lang node --dest ../../<your-project>/vendor   # pull the latest SDK source
node smoke.mjs --product <productUniqueCode> \
  --sdk ../../<your-project>/vendor/powersoftware-license-sdk/node/src/index.js
# then follow SKILL.md Steps 3–5 to wire trial / verifyCached / activate into your app
```

## Security notes

- `config.local.json`, `.ps-session.json` and anything under `assets/` are git-ignored — never commit credentials or session cookies.
- The partner application requires **manual approval by platform operators**; the skill intentionally pauses and cannot (and should not) bypass that gate.

## License

MIT
