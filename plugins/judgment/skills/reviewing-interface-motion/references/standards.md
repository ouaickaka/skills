# Interface Motion Review Standards

These are review defaults, not universal constants. Apply them to the interaction observed and distinguish measured defects from source-level risks.

## Existence and frequency

* Keyboard-initiated or extremely frequent actions should remain immediate; omit decorative open/close motion.
* Repeated actions warrant less motion than occasional modals, drawers, or state transitions.
* Rare onboarding and milestone feedback can support more expressive motion.
* Every animation should orient, explain, confirm, preserve continuity, prevent a jarring change, or emphasize a rare event.

## Timing and easing

* Entering and exiting UI generally needs an immediate response followed by a settle; `ease out` or a deliberate equivalent is a strong default.
* Movement between two visible positions generally benefits from acceleration and deceleration.
* Linear timing is appropriate for constant-rate motion such as spinners or marquees, not most direct UI feedback.
* Direct UI feedback is usually brief. Treat roughly 300 ms as a review prompt, not an automatic violation; distance, purpose, and product character can justify more.
* Avoid `transition: all`; enumerate the intended properties.

## Spatial continuity

* Trigger-anchored popovers, menus, and tooltips should originate from their trigger. Centered modals are a valid exception.
* Avoid entrances from `scale(0)` when they make the element appear from nowhere; a small scale offset with opacity usually preserves continuity better.
* Enter and exit paths should preserve the user’s spatial model unless a directional change communicates navigation.
* Rapidly retriggered or gesture driven motion must continue from the visible state and remain interruptible.

## Rendering

* Prefer compositor friendly `transform` and `opacity` when they express the same behavior.
* Layout-property animation is a risk to inspect or profile, not an automatic defect; some layout transitions genuinely require it.
* Do not infer performance from library shorthand alone. Check what the library emits and profile hot or concurrent motion.
* Avoid broad parent CSS-variable updates that force unnecessary descendant style recalculation on every frame.

## Input and devices

* Motion must not delay focus, command execution, or dismissal.
* Gate hover movement behind both hover and fine pointer capability:

```css
@media (hover: hover) and (pointer: fine) {
  /* hover motion */
}
```

* Provide `prefers-reduced-motion` behavior for movement. The alternative may be a crossfade, reduced distance, or no animation depending on the information the motion carries.

## Direct manipulation

When reviewing drag, swipe, sheets, carousels, or reorder behavior, inspect:

* preserved grab offset;
* continuous pointer tracking;
* release velocity;
* snap target selection;
* handoff from direct tracking to continuation;
* interruption and reversal from the live visible state;
* resistance beyond boundaries.

Do not demand gesture infrastructure for click triggered, non draggable transitions.

## Verification

When source is insufficient:

* inspect slow motion or the browser animation panel;
* retrigger rapidly;
* interrupt midway;
* test keyboard invocation;
* emulate reduced motion;
* profile the interaction if claiming dropped frames or rendering cost.
