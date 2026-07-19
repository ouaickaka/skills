# Plan Template

Every plan follows this structure. The executor may be a less capable model with zero context and zero taste — the plan contains everything, exactly. No references to "the audit above."

```markdown
# NNN — <Short imperative title>

- **Status**: TODO
- **Commit**: <`git rev-parse --short HEAD` when written>
- **Severity**: HIGH | MEDIUM | LOW
- **Category**: <audit lens>
- **Estimated scope**: <n files, rough size>

## Problem

What is wrong, where, and why it matters to how the product feels. Cite every
location as `path/to/file.tsx:123` and include the current code verbatim:

​```css
/* src/components/dropdown.css:14 — current */
.dropdown { transition: all 400ms ease-in; }
​```

## Target

The exact end state. Every value spelled out — curves, durations, spring
configs, media queries. Never "use a nicer easing":

​```css
/* target */
.dropdown {
  transition: transform 200ms var(--ease-out), opacity 200ms var(--ease-out);
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
}
​```

## Repo conventions to follow

How this codebase already does it, with one exemplar to imitate (token names,
file placement, prop patterns):

- Easing tokens live in `src/styles/tokens.css`; add new curves there.
- <exemplar file:line that already does this correctly>

## Steps

1. <One concrete edit per step: file, what changes, resulting code.>
2. …

## Boundaries

- Do NOT touch <files/components out of scope>.
- Do NOT change markup or structure — motion properties only, unless a step says otherwise.
- Do NOT add new dependencies.
- If a step does not match the code found (drift since the commit stamp), STOP and report instead of improvising.

## Verification

- **Mechanical**: <exact commands — typecheck, lint, build — with expected outcome>.
- **Feel check**: run the UI, trigger <interaction>, and confirm:
  - <observable check, e.g. "the dropdown scales from its trigger, not from center">
  - <e.g. "spamming the toggle never restarts the animation from zero">
  - In DevTools set animation playback to 10% and confirm <detail>.
  - Toggle reduced motion emulation and confirm movement is dropped but opacity feedback remains.
- **Done when**: <machine- or eye-checkable completion criteria>.
```

## Notes for the plan author

- One plan per finding. Two findings may merge only when they share every file and the same fix pattern.
- Pull every value from the audit lens reference and the repository's own tokens — never approximate from memory.
- The feel check is not optional. Motion can be mechanically correct and still feel wrong; give the executor concrete things to watch in slow motion.
- After writing plans, create or update `plans/README.md`: a table of plans (number, title, severity, status), recommended execution order, and dependencies.
