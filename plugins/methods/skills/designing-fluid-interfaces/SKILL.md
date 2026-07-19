---
name: designing-fluid-interfaces
description: Use when building gesture-driven UI such as drags, swipes, bottom sheets, drawers, carousels, or momentum scrolling, when choosing spring parameters, velocity handoff, or interruptible animation behavior, or when working with translucent materials, depth layering, or size-specific typography in an interface meant to feel physical and fluid.
---

# Designing Fluid Interfaces

## Goal

Make gesture-driven motion behave like the physical world: respond instantly, track 1:1, carry the user's velocity, resist at boundaries, and accept redirection at any instant. Springs are the default tool because they are inherently interruptible and velocity-aware.

Read [references/fluid-motion.md](references/fluid-motion.md) before implementing. It holds the spring values, projection math, material rules, and typography details.

## The principles

1. **Respond on pointer-down, not release.** Feedback that waits for `click` or touch-up feels dead. Anything on the input path that is not essential — debounces, artificial timers, transition waits — is a latency regression.
2. **Track 1:1 and respect the grab offset.** A dragged element stays glued to the pointer, offset from where the user grabbed it, never snapped to its center. Use Pointer Events with `setPointerCapture`, ignore additional touch points once a drag begins, and record a short position history so release velocity is available.
3. **Every animation must be interruptible.** Never lock input during a transition. On interrupt, animate from the live on-screen value, never the logical target — starting from the target causes a visible jump. Avoid CSS keyframes for anything gesture-driven; they cannot be grabbed mid-flight. When a gesture reverses, carry velocity through the retarget rather than hard-cutting it.
4. **Hand off velocity at the gesture seam.** When a drag ends, the continuation animation starts at the finger's exact release velocity. A hard velocity cut at the drag-to-animation boundary is the most common tell of a non-fluid implementation.
5. **Project momentum to choose the target.** Do not snap to the nearest boundary from the release point; project where the gesture is going (exponential decay, formula in the reference) and snap to the target nearest that projection. Decide reverse-versus-commit from velocity direction, not position.
6. **Keep space consistent.** Enter and exit along the same path; anchor menus, popovers, and sheets to the trigger that opened them; mirror the easing on reversible transitions.
7. **Rubber-band at boundaries.** Progressive resistance past an edge reads as responsive; a hard stop reads as frozen.
8. **Decompose 2D motion into independent X and Y springs.** A single spring on the combined distance desyncs when the axes carry different velocities.

## Springs

Think in damping ratio and response time, not raw physics triplets. Start UI at critical damping (no overshoot); add bounce only when the gesture itself carried momentum — overshoot on a flicked card is right, overshoot on a menu that faded in is wrong. Exact parameter values live in the reference.

## Materials, typography, reduced motion

Translucent chrome, depth layering, vibrancy, and size-specific tracking and leading follow the rules in the reference. Reduced motion means a gentler non-vestibular equivalent, not silence: replace slides and springs with short cross-fades and keep comprehension-aiding opacity changes. Handle `prefers-reduced-motion`, `prefers-reduced-transparency`, and `prefers-contrast` as three independent signals.

## Scope boundary

This skill governs how physical, gesture-driven motion is built. Whether an interaction should animate at all, and judging motion code already written, are separate judgments outside this skill.
