# Rule File Structure and Patterns

## Structure

Order sections by how often an agent needs them:

```markdown
# Design System Rules

## Component Organization
Where components live, how files are named, where new ones go.

## Design Tokens
Where each token category is defined, how to reference it.
IMPORTANT-prefix the never-hardcode rules.

## Styling Rules
The one sanctioned styling approach and where theme customization lives.

## Component Patterns
Prop conventions, variant typing, composition rules, import aliases.

## Design Tool Integration (if a design MCP is connected)
The implementation flow: get design context → screenshot for visual
reference → map design values to project tokens → reuse existing components
→ validate against the screenshot before completing.

## Asset Rules
Where static assets go; use design-tool-served asset sources directly;
IMPORTANT: do not install new icon libraries.
```

## Rule quality patterns

**Essential (always include when evidenced):**
- Component locations with exact paths
- Naming conventions with an example (`Button.tsx`, PascalCase)
- Token references: `IMPORTANT: All colors come from src/styles/tokens.css as
  CSS variables — var(--color-primary), never hex literals`
- The styling approach, stated exclusively ("Tailwind utilities; custom styles
  in component-level CSS modules")

**Recommended:**
- Component patterns: `className` passthrough, union-typed variants
  (`variant: 'primary' | 'secondary'`)
- Import conventions: aliases (`@/components`), grouping order

**Optional (project-specific):** accessibility requirements, performance rules
(lazy images, SVG icons not fonts), testing conventions.

## Writing style

- Good: "Always use `Button` from `src/components/ui/Button.tsx` with variant
  prop (`'primary' | 'secondary' | 'ghost'`)"
- Bad: "Use the design system"
- Explain the why when non-obvious: "Use absolute `@/` imports (refactoring
  keeps paths valid)"

## Maintenance guidance to include

Rules go stale as the codebase evolves. Add a short note at the bottom of the
generated section: review the rules when the token source, styling approach,
or component layout changes, and update rather than append.
