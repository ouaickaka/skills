# Motion Audit Lenses

What to look for under each Phase 2 lens, and what makes a finding severe.
These are audit defaults, not universal constants: a repository's documented,
deliberate tradeoffs override them (hard rule 5).

## Purpose and frequency

Search entry points: route transitions, modal/drawer/popover mounts, list
mutations, button and input feedback, keyboard shortcut handlers.

* Every animation must earn its place: orient, explain, confirm, preserve
  continuity, prevent a jarring change, or emphasize a rare event. Motion with
  no nameable job is a finding.
* Frequency drives severity. Animation on keyboard-initiated or
  hundreds-of-times-a-day actions is HIGH; the same effect on a rare
  onboarding screen may be no finding at all.
* Decorative open/close motion on constantly used surfaces reads as latency,
  not polish.

## Easing and duration

* Entering and exiting UI wants an immediate response followed by a settle;
  `ease-out` or a deliberate equivalent is the strong default. Ease-in on
  entrances of frequent UI is a classic feel-breaker.
* Movement between two visible positions wants acceleration and deceleration.
* Linear timing belongs to constant-rate motion (spinners, marquees), not
  direct UI feedback.
* Treat durations around 300 ms and above on direct feedback as a prompt to
  look closer, not an automatic violation — distance, purpose, and product
  character can justify more.
* `transition: all` is a finding; the intended properties should be
  enumerated.

## Physicality and origin

* Trigger-anchored popovers, menus, and tooltips should originate from their
  trigger; centered modals are a valid exception.
* Entrances from `scale(0)` that make an element appear from nowhere break
  continuity; a small scale offset with opacity usually reads better.
* Enter and exit paths should preserve the user's spatial model unless a
  directional change communicates navigation.

## Interruptibility

* Rapidly retriggered or gesture-driven motion must continue from the live
  visible state and remain interruptible; CSS keyframes on dynamic,
  user-interruptible UI are a signal to inspect.
* For drag, swipe, sheets, carousels, reorder: check preserved grab offset,
  continuous pointer tracking, release velocity carried into the continuation,
  projected snap targets, reversal from the visible state, and boundary
  resistance. Do not demand gesture infrastructure for click-triggered,
  non-draggable transitions.

## Performance

* Prefer compositor-friendly `transform` and `opacity` where they express the
  same behavior. Layout-property animation is a risk to inspect, not an
  automatic defect.
* Do not infer performance from library shorthand alone; check what the
  library emits before claiming a cost.
* Broad parent CSS-variable updates that force descendant style recalculation
  every frame are worth flagging wherever motion is hot or concurrent.
* Claims of dropped frames or rendering cost belong in a plan only with a
  profiling step in its verification section.

## Accessibility

* Missing `prefers-reduced-motion` handling for movement is a finding; the
  right alternative (crossfade, shorter distance, nothing) depends on what
  information the motion carries.
* Motion must not delay focus, command execution, or dismissal.
* Hover-triggered movement should be gated behind hover-capable, fine-pointer
  media queries.

## Cohesion and tokens

* Durations and easings hardcoded where the repository has tokens or shared
  constants; several near-identical curves where one convention should exist.
* New motion that invents a parallel convention instead of extending the
  established one.

## Missed opportunities

Places where a jarring cut does the damage motion would prevent: abrupt
appearance or removal of large UI, state changes with no feedback, spatial
jumps that lose the user. Keep these few and additive — they are suggestions,
not defects.
