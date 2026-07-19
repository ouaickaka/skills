---
name: reviewing-accessibility
description: Use when asked to audit or review accessibility, check a11y, verify WCAG compliance, or evaluate color contrast, keyboard navigation, focus behavior, touch target size, form labeling, alt text, or screen reader behavior in a UI, component, or design before handoff. Use for accessibility-specific review, not general code review or motion review.
---

# Reviewing Accessibility

## Goal

Audit a UI against WCAG 2.1 AA and report findings a developer can act on:
each tied to a criterion, a location, and a fix. Findings require evidence
from the source or an observation; do not manufacture issues because the
skill is active, and do not state as fact what static review cannot verify.

Read [references/wcag-checklist.md](references/wcag-checklist.md) for the
criterion quick reference and the report template.

## Review procedure

1. **Inventory the interactive surface.** Every control, form field, image,
   and dynamic region in scope. Findings anchor to this inventory with
   `file:line`.
2. **Check semantics first.** Interactive elements built from `div`/`span`
   with click handlers fail keyboard access (2.1.1) and name/role/value
   (4.1.2) at once — the most common and most damaging defect class.
3. **Check every input's label** (3.3.2). Placeholder text is not a label:
   it vanishes on input and many screen readers skip it.
4. **Check text alternatives** (1.1.1). Meaningful images need alt text;
   decorative ones need `alt=""` so readers skip them. Icon-only buttons need
   an accessible name.
5. **Check contrast arithmetically** (1.4.3 / 1.4.11). When both colors are
   in the source, compute or closely estimate the ratio and show it against
   the 4.5:1 (normal text) or 3:1 (large text, UI components) threshold.
6. **Check keyboard paths.** Tab order, visible focus (2.4.7), Escape to
   dismiss, no focus traps in modals, no positive `tabindex`.
7. **Check target sizes.** Touch targets below 44×44 CSS pixels (2.5.5 — a
   level beyond AA; report as recommended, not as an AA failure).
8. **Label what static review cannot see.** Actual screen reader
   announcement, zoom reflow at 200%, and real focus behavior need a browser
   and assistive technology. Report these as "verify with VoiceOver/NVDA",
   not as confirmed findings — static review catches only a subset of real
   issues; the rest need assistive-technology verification.

## Findings threshold

Report a finding only when you can name the exact location, the WCAG
criterion it violates, who it blocks, and the smallest fix. Severity:

* **Critical:** blocks a class of users entirely — keyboard-inaccessible
  control, unlabeled form field, focus trap.
* **Major:** substantially degrades access — failing contrast, missing
  visible focus, undersized targets.
* **Minor:** friction with a workaround.

An interface can pass. Do not pad a clean review with speculative issues.

## Output

Use the report template in
[references/wcag-checklist.md](references/wcag-checklist.md): findings
grouped by WCAG principle with criterion, severity, and fix per row, then
prioritized fixes ordered by user impact. Review is read-only — recommend
fixes, apply nothing unless the user separately asks.

## Scope boundary

Review accessibility only — not visual style, component architecture, or
business logic. Motion accessibility splits: `prefers-reduced-motion`
handling and vestibular safety are judged separately and are not covered
here; this skill covers everything non-motion. If a diff needs both, keep
the motion findings and the accessibility findings clearly labeled.
