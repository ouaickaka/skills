# Motion Opportunity Hunt List

Seam classes to sweep, with recipe defaults to cite in suggestions. These values are proposal defaults, not laws; a repository's own tokens always win.

## Duration budgets

UI motion stays under roughly 300 ms. Longer only when distance or purpose earns it.

| Element | Duration |
| --- | --- |
| Press feedback | 100–160 ms |
| Tooltips, small popovers | 125–200 ms |
| Dropdowns, selects | 150–250 ms |
| Modals, drawers | 200–500 ms |
| Marketing / explanatory | Can be longer |

Default easing tokens when the repository has none:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* entrances, exits, UI response */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* sheets and drawers */
```

## Feedback gaps

* Pressable elements with no `:active` state → `transform: scale(0.97)` with `transition: transform 160ms ease-out`; keep the scale subtle (0.95–0.98).
* Destructive actions confirmed by a plain click where a hold-to-confirm fill would prevent slips → `clip-path: inset(0 100% 0 0)` overlay, slow linear fill on press (about 2 s), fast `ease-out` snap-back (about 200 ms) on release.

## Teleporting state

* Content that swaps, appears, or vanishes instantly (conditional renders, route content, expanding sections) → fade plus scale entrance from `scale(0.95–0.97)` and `opacity: 0` with `ease-out`; never `scale(0)`. Use `@starting-style` for entry without JavaScript.
* Accordions and collapses that snap open → height and opacity transition.
* List items added or removed with no bridge, when the list is not high frequency → enter and exit transitions; CSS transitions rather than keyframes so rapid triggers retarget smoothly.

## Missing spatial story

* Panels, popovers, and menus that appear with no connection to their trigger → scale in with `transform-origin` at the trigger; popover libraries commonly expose the computed origin as a CSS variable — use it when present. Centered modals are exempt and stay centered.
* Dismissable surfaces (toasts, sheets) that exit differently than they entered → symmetric paths; use `translateY(100%)` percentages, not hardcoded pixels.

## Group entrances

* A grid or list that pops in all at once on a page users see occasionally → 30–80 ms stagger between items. Stagger is decorative and must never block interaction.

## Gesture seams

* Draggable or swipeable elements that snap with no physics → springs, velocity-based dismissal rather than distance thresholds alone, and rubber-banding at boundaries instead of hard stops. Exact spring tuning and projection math are outside this skill's scope; recommend springs, velocity-based dismissal, and rubber-banding without prescribing parameters.

## The delight budget

* Rare, high-emotion moments rendered flat — first run, empty states, success, celebration. These are the only places bounce, stagger generosity, or a longer beat are welcome.

## Useful sweeps

Grep for conditional renders with no transition (`{isOpen &&`, `display: none` toggles), `onClick` handlers on elements with no `:active` or transition styles, `details` or accordion markup, drag handlers, `.map(` renders of entering lists, and empty-state or success components.
