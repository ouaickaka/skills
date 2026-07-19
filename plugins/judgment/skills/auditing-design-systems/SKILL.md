---
name: auditing-design-systems
description: Use when asked to audit, document, or extend a design system - checking token coverage, naming consistency, or component completeness, writing component documentation with variants, props, states, and accessibility notes, or proposing a new component or token. Use for design system structure work, not for motion review or general code review.
---

# Auditing Design Systems

## Goal

Assess and grow a design system by evidence, not taste. An audit reports what
the codebase actually contains — hardcoded values counted, components
enumerated — never impressions. Documentation records how a component actually
behaves, including its gaps. An extension proposes; it does not silently add.

## What a design system is made of

Check each layer; problems in a lower layer surface as inconsistency in the
ones above.

* **Design tokens** — colors, typography, spacing, borders, shadows, motion
  durations and easings. The atomic decisions. A value hardcoded where a token
  exists is the core defect an audit hunts.
* **Components** — buttons, inputs, cards. Each has variants, states
  (default, hover, focus, disabled, loading, error), sizes, behavior, and
  accessibility contracts.
* **Patterns** — forms, navigation, data display, feedback. Compositions of
  components solving recurring problems.

## Modes

Pick the mode from what the user asked; if ambiguous, audit first — the other
two depend on knowing what exists.

### Audit

1. Locate the token source (theme file, CSS variables, tokens package) and the
   component inventory. Name the paths in the report.
2. Measure token coverage: search for hardcoded colors, spacing, font sizes,
   durations in component code. Count them; cite `file:line` for the worst
   offenders.
3. Check naming consistency across tokens and components against the dominant
   convention in the codebase.
4. Check component completeness: for each core component, which states and
   variants exist, which are missing.
5. Report using the audit template in
   [references/templates.md](references/templates.md), ending with prioritized
   recommendations. An audit is read-only — recommend fixes, do not apply them.

### Document

For each component: what it is for, variants, props (name, type, default,
description), states, accessibility (keyboard, ARIA, focus behavior), and
usage dos and don'ts. Use the documentation template in
[references/templates.md](references/templates.md). Document what the code
does, not what it should do — gaps go in the notes, not silently corrected.

### Extend

1. State the problem the new component or token solves and why existing
   pieces cannot.
2. Survey what exists first — the best extension is often a new variant of an
   existing component, not a new component.
3. Propose the API (props, variants, tokens consumed) using the extension
   template in [references/templates.md](references/templates.md), with open
   questions listed. Build it only after the user accepts the proposal.

## Principles

* **Consistency over creativity.** The system's value is predictability; a
  locally better one-off weakens the whole.
* **Flexibility within constraints.** Tokens and variants are the sanctioned
  escape hatches; use them before inventing new surface area.
* **Coverage over perfection.** Documenting 80% of components beats perfecting
  docs for 20%.

## Scope boundary

Judge structure — tokens, naming, completeness, documentation. Do not judge
motion quality here: whether a duration or easing *feels* right, or whether
motion should exist at all, is outside this skill's scope. An
audit only checks that motion values are tokenized, not that they are good.
