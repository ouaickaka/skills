---
name: reviewing-interface-motion
description: Use when explicitly reviewing animation, transition, spring, hover motion, popover or modal entrances, drag or swipe behavior, reduced motion handling, or motion related changes in a UI diff. Use for motion specific review rather than general visual design or unrelated component code.
---

# Reviewing Interface Motion

## Goal

Judge whether existing motion improves the interaction without adding latency, spatial confusion, inaccessible movement, or avoidable rendering work. Findings require evidence; do not manufacture criticism merely because the skill is active.

Read [references/standards.md](references/standards.md) before reviewing. It is the independently maintained motion policy reference; this file owns the review procedure.

## Review procedure

1. **Identify the interaction.** Note what triggers the motion, how often it occurs, and whether it is direct manipulation, keyboard driven, or occasional system feedback.
2. **Question existence before tuning.** Motion with no orienting, feedback, state, or continuity purpose should usually be removed rather than polished.
3. **Inspect the complete state transition.** Review enter, exit, rapid retriggering, interruption, transform origin, and the element’s visible start and end states.
4. **Inspect declared timing.** Account for every configured duration and easing. Flag a slow starting entrance such as `ease in` when it delays visible response, and flag a long direct UI duration such as 450 ms when the interaction supplies no distance or purpose that earns it.
5. **Check input cost.** Motion must not delay focus, command execution, dismissal, or repeated expert workflows.
6. **Check rendering behavior.** Flag unbounded property transitions and avoidable layout or paint work when a compositor friendly equivalent preserves behavior.
7. **Check access paths.** Review reduced motion behavior and gate hover only movement to devices that actually support hover and fine pointing.
8. **Observe when possible.** Source can reveal definite defects, but “feels sluggish” and “drops frames” require browser observation or profiling. Label unobserved risk instead of stating it as fact.

## Findings threshold

Report a finding only when you can name:

* the exact location;
* the observable or source established defect;
* the interaction consequence;
* the smallest correction.

Do not flag a deliberate choice solely because it differs from a preferred house value. Duration, easing, spring parameters, and visual personality are contextual defaults, not laws.

## Output

One finding per bullet, highest impact first: `path:line`, severity, then the problem and fix stated in a sentence or two — clear beats compressed.

Severity:

* **Block:** repeated action latency, broken interruption, inaccessible essential interaction, severe spatial discontinuity, or avoidable high cost animation on a hot path.
* **Major:** wrong origin, unnecessary layout animation, missing reduced motion handling, or motion whose purpose is unclear and materially harms the interaction.
* **Minor:** bounded polish issue with no functional or accessibility consequence.

Close with exactly one verdict:

```text
Verdict: Block
```

or

```text
Verdict: Approve
```

If the code meets the standard, return `Verdict: Approve` without inventing findings. An empty findings list is a valid review result.

## Scope boundary

Review motion only. Do not review unrelated component architecture, static visual hierarchy, naming, business logic, or formatting. Do not implement the feature unless the user separately asks for changes.
