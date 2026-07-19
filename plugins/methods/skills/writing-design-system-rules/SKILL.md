---
name: writing-design-system-rules
description: Use when asked to create design system rules, conventions, or guidelines for AI agents or a rules file - generating or updating CLAUDE.md, AGENTS.md, or cursor rules that encode component locations, styling conventions, token usage, and design-to-code workflow so implementations stay consistent. Use for writing the rules file, not for auditing the system or reviewing code.
---

# Writing Design System Rules

## Goal

Distill a project's unwritten design conventions — where components live, how
styling is done, which values must come from tokens — into a rules file an
agent loads every session. Good rules eliminate repetitive prompting and stop
hardcoded values at the source. Rules are only worth writing if they are
specific to *this* codebase; generic advice ("follow best practices") is
context cost with no yield.

## Workflow

1. **Analyze the codebase first.** Establish, with paths as evidence:
   * component organization — where UI components, pages, and shared pieces
     live;
   * styling approach — Tailwind, CSS modules, CSS-in-JS, plain CSS — and
     where the theme or token definitions are;
   * component patterns — prop conventions, variant typing, composition
     (`className` passthrough, slots), import aliases;
   * framework and architecture — what an implementation must slot into.
2. **If a design tool MCP is connected**, call its design-system-rules helper
   if it exposes one and merge its output with your
   codebase findings — the tool knows the design side, you know the code side.
   Skip without comment if no such tool exists.
3. **Write the rules** using the structure and quality bar in
   [references/rule-patterns.md](references/rule-patterns.md).
4. **Save to the agent's rules file** — `CLAUDE.md` by default, or the file the
   user's tooling reads (`AGENTS.md`, `.cursor/rules/`). If the file exists,
   add a clearly-titled section; never overwrite unrelated content.
5. **Validate.** Re-read the result as if you were a fresh agent: could you
   place a new component, pick a color, and name the file correctly from these
   rules alone? Fix what you couldn't.

## Quality bar

* **Specific and actionable.** "Colors are defined in `src/theme/colors.ts` —
  import these constants" beats "don't hardcode colors". Every rule tells the
  agent what to do, with a path.
* **Prioritized.** The 20% of rules that prevent 80% of inconsistency. A
  bloated rules file slows every future session; cut rules that rarely apply.
* **Explained.** When a rule looks arbitrary, state the why in a trailing
  parenthetical — agents follow reasoned rules better than bare ones.
* **Critical rules marked.** Prefix must-never-violate rules with
  `IMPORTANT:` — token usage and asset handling usually qualify.
* **Grounded.** Only write rules the codebase evidences. A convention you
  assume but did not observe is a bug you are installing permanently.

## Scope boundary

Write rules about structure and convention. Do not encode motion design
judgment (durations, easings, when to animate) as rules — that judgment is
separate work and does not belong in a rules file. Do not audit or fix the
codebase while writing rules; note observed defects for the user and move on.
The audit itself is separate work.
