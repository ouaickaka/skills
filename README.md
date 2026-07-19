# ouaic

[![skills.sh](https://skills.sh/b/ouaickaka/skills)](https://skills.sh/ouaickaka/skills)

A marketplace of skills for coding agents, split by the failure mode each one fixes. Discipline holds behavior steady, methods supply expert procedures, and judgment sharpens reviews and decisions.

## Quickstart

Choose one of these prompts:

Fetch the install guide (recommended):

```text
Fetch the install guide. Summarize what it says, ask for approval, then run only the approved install commands.

curl -fsSL https://raw.githubusercontent.com/ouaickaka/skills/main/docs/install.md
```

Paste the commands directly:

```text
Install ouaic. These plugins add discipline, methods, and judgment skills for the agent.

Use the harness ask tool to learn which plugins the user wants and which harness they use. Claude Code uses AskUserQuestion, OMP uses ask, and OpenCode uses question (needs permission.question: "allow" in opencode.json). For ChatGPT/Codex, Grok Build, Pi, or an unavailable question tool, ask in text.

For Claude Code: tell the user to run /plugin marketplace add https://github.com/ouaickaka/skills.git in their chat (terminal: claude plugin marketplace add https://github.com/ouaickaka/skills.git). Then install each chosen plugin with /plugin install <name>@ouaic (terminal: claude plugin install <name>@ouaic), where <name> is discipline, methods, or judgment. Only install the plugins the user chose. Verify with claude plugin list.
For OMP: tell the user to run /marketplace add https://github.com/ouaickaka/skills.git in their chat (terminal: omp plugin marketplace add https://github.com/ouaickaka/skills.git). Then install each chosen plugin with /marketplace install <name>@ouaic (terminal: omp plugin install <name>@ouaic), where <name> is discipline, methods, or judgment. Only install the plugins the user chose. Verify with omp plugin list.
For ChatGPT/Codex: run codex plugin marketplace add ouaickaka/skills, restart the ChatGPT desktop app, and install each chosen plugin from the Ouaic marketplace in the Plugins Directory. Verify with codex plugin marketplace list.
For Grok Build: install discipline, methods, or judgment from the xAI Plugin Marketplace after Ouaic is published there. If it is not visible, explain that the official listing is not available yet; xAI does not document a direct third-party marketplace command.
For Pi: run pi install git:github.com/ouaickaka/skills. Pi installs all available skills as one package; use pi config to enable or disable individual skills. Verify with pi list.
For OpenCode: add "plugin": ["ouaic@git+https://github.com/ouaickaka/skills.git"] to opencode.json, restart, and verify by asking to list the skills.
```

## How it works

Discipline skills activate on their own when the agent reaches a situation they were built for. Methods and judgment skills are invoked when the task calls for them, by you or by the agent.

If the agent is about to delete a branch that has uncommitted work, it pauses to check first. If you ask for a change that quietly contradicts a rule the team already agreed on, it flags the conflict before touching anything. When a task wraps up and the agent is about to claim everything is fine, it runs the tests again and shows you the raw output, not a sanitized summary.

These skills are not a linter and not a test suite. They are a layer of discipline and craft between the agent and the work, the kind of thing a careful teammate brings without being asked.

## What is inside

**Discipline.** Behavioral correctives that fire when the agent is about to guess, skip a check, bulldoze working state, or hide a failure. The agent knows better; these make it act like it.

**Methods.** Expert procedures for tasks where the agent's untrained default is to improvise: it invents a name by free association, or splits a module by processing order. Each method replaces improvisation with a proven procedure.

**Judgment.** Evaluators for reviews and decisions where the untrained default misses what matters: accessibility gaps, motion that fights the interface, audits that skim instead of dig.

## Philosophy

Every skill here was kept only after evidence that an agent without it fails: each one is tested against a baseline run, and shipped only when the baseline demonstrably gets it wrong. The categories follow the same evidence. Some failures are lapses of discipline, some are missing procedures, some are misjudged calls, and each kind needs a different sort of skill.

These skills do not try to make the agent smarter. They add what a careful, experienced teammate brings: confirm before destroying, prove before claiming, follow the craft instead of winging it, and report what actually happened.
