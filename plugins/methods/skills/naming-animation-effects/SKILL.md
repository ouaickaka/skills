---
name: naming-animation-effects
description: Use when the user describes a web animation or motion effect without knowing its name, asks “what is this called,” wants terminology for a design or AI prompt, or needs to distinguish similar effects such as morph, crossfade, shared element transition, layout animation, mask, clip-path, spring, or rubber-banding.
---

# Naming Animation Effects

## Goal

Translate a description of what motion looks or feels like into the most precise established term. Answer the naming question; do not turn it into an implementation or design task.

Read [references/glossary.md](references/glossary.md) before answering. The glossary is the source of terms and definitions.

## Required behavior

1. Match the observed behavior and sensation, not merely words repeated by the user.
2. Lead with the best term and its glossary definition.
3. When two or more terms plausibly fit, list the best match first and contrast at most two close alternatives.
4. If the glossary lacks an exact term, say that plainly and describe the effect as a combination of listed terms rather than inventing a label.
5. Stay concise. A naming request wants a usable phrase, not implementation guidance.

## Output

```text
**Term**: Definition.
```

For genuine ambiguity:

```text
**Best term**: Definition.

Close alternatives:
* **Term**: Use this instead when ...
```

## Scope boundary

Do not decide whether the effect should be used, write animation code, review performance, or prescribe timing. Those are separate decisions.
