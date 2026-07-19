# Fluid Motion Reference

Concrete values and math for gesture-driven, physical interfaces on the web platform. Defaults, not laws; product personality and repository conventions can override.

## Spring parameters

Two designer-friendly parameters replace mass/stiffness/damping:

* **Damping ratio** — controls overshoot. `1.0` is critically damped (no bounce, smooth settle); below `1.0` overshoots and oscillates.
* **Response** — how quickly the value approaches the target, in seconds. A spring has no fixed duration; settle time emerges.

| Interaction | Damping | Response |
| --- | --- | --- |
| Move / reposition | 1.0 | 0.4 |
| Rotation | 0.8 | 0.4 |
| Drawer / sheet | 0.8 | 0.3 |

Web mapping: spring libraries commonly expose an equivalent `bounce` + `duration` API, as in the examples below. House default: critically damped everywhere; reserve bounce for momentum-driven interactions.

```js
import { animate } from 'motion';

// Critically damped default (no overshoot)
animate(el, { y: 0 }, { type: 'spring', bounce: 0, duration: 0.4 });

// Momentum interaction — slight bounce, only because a flick preceded it
animate(el, { y: target }, { type: 'spring', bounce: 0.2, duration: 0.4 });
```

## Velocity handoff

Pass the pointer's release velocity as the spring's initial velocity so there is no seam between dragging and animating. Some APIs want relative velocity:

```
relativeVelocity = gestureVelocity / (targetValue − currentValue)
```

Libraries with an initial-velocity option usually take absolute px/s directly. Track a short history of recent `pointermove` events (position + timestamp) to compute release velocity.

```js
el.addEventListener('pointerdown', (e) => {
  el.setPointerCapture(e.pointerId);
  const grabOffset = e.clientY - el.getBoundingClientRect().top; // respect where they grabbed
  // ...append {y, t} history on pointermove for release velocity
});
```

## Momentum projection

Project the gesture's resting position from release velocity, then snap to the target nearest the projection — not nearest the release point. Exponential-decay form (what platform scroll physics ship), not the physics-textbook `v²/2a`:

```js
// decelerationRate ≈ 0.998 for normal scroll feel; 0.99 for snappier
function project(initialVelocity /* px/s */, decelerationRate = 0.998) {
  return (initialVelocity / 1000) * decelerationRate / (1 - decelerationRate);
}

const projectedEndpoint = currentPosition + project(releaseVelocity);
const target = nearestSnapPoint(projectedEndpoint);
animateSpringTo(target, { velocity: releaseVelocity }); // then hand off velocity
```

## Rubber-banding

```js
// The further past the bound, the less the element follows
function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
```

## Gesture feel details

* **Tap**: highlight on touch-down instantly, commit on touch-up; roughly 10 px of hysteresis and cancel-by-dragging-away.
* **Drag/swipe**: small movement threshold (~10 px) before committing to a direction, then 1:1 tracking.
* Detect plausible gestures in parallel from the first move, then cancel the losers; avoid recognizers that only report final states.
* Pay double-tap disambiguation delay only where double-tap truly exists.

## Frame-level smoothness

Animate compositor-friendly `transform` and `opacity`; hint with `will-change` where motion is imminent; `requestAnimationFrame` is the display-synced clock. For very fast motion a subtle blur or stretch encodes speed better than a sharp streak.

## Materials and depth

* Build nav, toolbars, and sheets as translucent layers (`backdrop-filter: blur()` + semi-transparent background) with content scrolling underneath.
* Material weight encodes hierarchy: heavier materials separate structure, lighter draw attention. Never stack one light translucent surface on another — legibility collapses.
* Bigger surfaces read thicker: stronger blur, deeper shadow.
* Dim to focus (modal + scrim, background pushed back); separate without a scrim for parallel non-blocking panels.
* Vibrancy over blur: higher contrast, slightly heavier weight, small letter-spacing bump; put color on solid layers.
* Prefer scroll-edge fades over 1 px dividers under floating chrome.
* Materialize glass surfaces: animate blur radius and scale together on enter/exit, not opacity alone.

```css
.toolbar {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.4); /* light catching the material edge */
}
```

## Reduced motion and related signals

Three independent signals, all handled:

```css
@media (prefers-reduced-motion: reduce) {
  .sheet { transition: opacity 200ms ease; transform: none !important; }
}
@media (prefers-reduced-transparency: reduce) {
  .toolbar { background: white; backdrop-filter: none; }
}
@media (prefers-contrast: more) {
  .toolbar { background: white; border: 1px solid #000; }
}
```

Also avoid full-viewport moving backgrounds, slow loops near one cycle per five seconds, and abrupt brightness jumps; make large moving surfaces semi-transparent while traveling.

## Typography

* **Tracking is size-specific.** Large display text wants negative tracking; small text slightly positive. One fixed `letter-spacing` is wrong somewhere.
* **Leading tracks size inversely.** Tight on large headings, looser on body.
* Build hierarchy from weight + size + leading as a set; emphasize with weight.
* Scale layout with the user's text size — spacing in `rem`/`em`, not fixed px.
* Default to the platform system font; override only with a reason.

```css
:root { font: 100%/1.5 system-ui, sans-serif; }

.display {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-optical-sizing: auto;
}
```

## Quick reference

| Need | Technique | Value |
| --- | --- | --- |
| Default UI spring | Critically damped | damping 1.0, response 0.3–0.4 |
| Flick / momentum spring | Slight bounce | damping ~0.8, response 0.3–0.4 |
| Gesture → spring | Hand off release velocity | `velocity` option, px/s |
| Flick landing point | Momentum projection | `(v/1000)·d/(1−d)`, d ≈ 0.998 |
| Interrupt cleanly | Animate from presentation value | read live on-screen transform |
| Reverse vs commit | Velocity sign at release | not position |
| Boundary | Rubber-band | progressive resistance |
| Translucent chrome | `backdrop-filter` layer | content scrolls under |
| Reduced motion | Cross-fade, not slide | keep opacity feedback |
