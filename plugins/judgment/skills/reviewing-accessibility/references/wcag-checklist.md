# WCAG 2.1 AA Quick Reference and Report Template

## Criteria checklist

### Perceivable
- **1.1.1** Non-text content has a text alternative
- **1.3.1** Info and structure conveyed semantically (headings, lists, landmarks)
- **1.4.3** Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large ≥ 18.66px bold / 24px)
- **1.4.11** Non-text contrast ≥ 3:1 (UI component boundaries, graphics)

### Operable
- **2.1.1** All functionality available via keyboard
- **2.1.2** No keyboard traps
- **2.4.3** Logical focus order
- **2.4.7** Visible focus indicator
- **2.5.5** Touch target ≥ 44×44 CSS pixels (beyond AA — report as recommended, not as an AA failure)

### Understandable
- **3.2.1** No unexpected context change on focus
- **3.3.1** Errors identified and described in text
- **3.3.2** Labels or instructions for all inputs

### Robust
- **4.1.2** Name, role, value programmatically determinable for all UI components

## Common defect classes (check first)

1. `div`/`span` with onClick — fails 2.1.1 and 4.1.2 together
2. Input with placeholder but no label — 3.3.2
3. Insufficient text contrast — 1.4.3
4. Missing alt on meaningful images / no accessible name on icon buttons — 1.1.1, 4.1.2
5. Focus trap in modals; Escape not handled — 2.1.2
6. Missing landmarks/heading structure — 1.3.1
7. Undersized touch targets — 2.5.5 (recommended tier)

## Contrast arithmetic

Relative luminance L = 0.2126R + 0.7152G + 0.0722B (channels linearized).
Ratio = (L_lighter + 0.05) / (L_darker + 0.05). Useful anchors:
`#767676` on white ≈ 4.54:1 (just passes); `#999999` on white ≈ 2.85:1
(fails); `#595959` on white ≈ 7:1.

## Report template

```markdown
## Accessibility Audit: [Name]
**Standard:** WCAG 2.1 AA

### Summary
**Issues found:** X | **Critical:** X | **Major:** X | **Minor:** X
One paragraph: overall state, worst blocker, what needs manual AT verification.

### Findings
One table per WCAG principle (Perceivable / Operable / Understandable / Robust):

| # | Issue (`file:line`) | WCAG Criterion | Severity | Fix |
|---|---|---|---|---|

### Color contrast
| Element | Foreground | Background | Ratio | Required | Pass |
|---|---|---|---|---|---|

### Needs manual verification
Screen reader announcements, 200% zoom reflow, real focus behavior —
listed explicitly so they are not mistaken for cleared checks.

### Priority fixes
1. **[Critical fix]** — who it blocks and what it unblocks.
2. **[Major fix]** — what it improves and for whom.
```
