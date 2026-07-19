# Design System Output Templates

Use the template matching the mode. Keep table cells short; explanation goes in
surrounding prose.

## Audit report

```markdown
# Design System Audit

## Summary
One paragraph: overall health, the single biggest risk, and where the token
source and component inventory live (paths).

## Naming consistency
| Area | Convention found | Deviations | Example |
|---|---|---|---|
| Tokens | | | `file:line` |
| Components | | | `file:line` |

## Token coverage
| Category | Tokenized | Hardcoded count | Worst offenders |
|---|---|---|---|
| Color | | | `file:line` |
| Spacing | | | `file:line` |
| Typography | | | `file:line` |
| Motion | | | `file:line` |

## Component completeness
| Component | Variants | States covered | Missing |
|---|---|---|---|

## Recommendations
Numbered, highest impact first. Each names the defect, the fix, and the effort.
```

## Component documentation

```markdown
# <Component>

**Purpose:** one sentence.

## Variants
| Variant | When to use |
|---|---|

## Props
| Prop | Type | Default | Description |
|---|---|---|---|

## States
| State | Behavior |
|---|---|

## Accessibility
- Keyboard:
- ARIA:
- Focus:

## Do / Don't
| Do | Don't |
|---|---|

## Notes
Gaps, known issues, undocumented behavior found in the code.
```

## Extension proposal

```markdown
# Proposal: <name>

## Problem
What need exists and why current components/tokens cannot meet it.

## Existing patterns considered
What was surveyed and why each falls short (or why a variant suffices —
in which case propose the variant instead).

## Proposed API
Props, variants, sizes. Show a usage example.

## Tokens consumed
Which existing tokens it uses; any new tokens it requires and their names.

## Open questions
Decisions the team must make before build.
```
