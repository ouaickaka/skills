# Animation Effect Glossary

## Entrances and exits

* **Fade in / Fade out**: An element appears or disappears by changing opacity.
* **Slide in**: An element enters by sliding from outside its final position.
* **Scale in**: An element grows from a smaller size as it appears, often paired with a fade.
* **Pop in**: An element appears with a slight overshoot before settling.
* **Reveal**: Content is uncovered gradually, often through a clip-path or mask.
* **Enter / Exit**: Motion played when an element is added to or removed from the screen.

## Sequencing and timing

* **Keyframes**: Defined animation states that the browser interpolates between.
* **Interpolation / Tween**: Generation of intermediate values between start and end states.
* **Stagger**: Several elements animate one after another with a small delay, creating a cascade.
* **Orchestration**: Multiple animations are timed to read as one coordinated motion.
* **Delay**: Time before motion starts.
* **Duration**: Total time allocated to an animation.
* **Fill mode**: Whether keyframe styles persist before or after the active animation.
* **Stepped animation**: Motion divided into discrete changes rather than continuous interpolation.

## Movement and transforms

* **Translate**: Move an element along an axis.
* **Scale**: Make an element larger or smaller.
* **Rotate**: Turn an element around a point.
* **Skew**: Shear or slant an element along an axis.
* **3D tilt / Flip**: Rotate through three dimensional space.
* **Perspective**: Controls the apparent depth of a 3D transform.
* **Transform origin**: The anchor point around which scale or rotation occurs.
* **Origin-aware animation**: Motion begins from the element that caused it, such as a popover growing from its trigger.

## Transitions between states

* **Crossfade**: One element fades out while another fades in at the same location.
* **Continuity transition**: A change visually connects the before and after states so the user remains oriented.
* **Morph**: One shape smoothly changes into another shape.
* **Shared element transition**: The same perceived element moves and transforms between two views, such as a thumbnail expanding into a detail card.
* **Layout animation**: An element animates from its old size or position to its new layout rather than snapping.
* **Accordion / Collapse**: A region expands or contracts to reveal or hide content.
* **Direction-aware transition**: Forward and backward navigation move in opposite directions to communicate sequence.

## Scroll

* **Scroll reveal**: Elements animate as they enter the viewport.
* **Scroll-driven animation**: Animation progress is bound to scroll position.
* **Parallax**: Layers move at different rates during scrolling to create depth.
* **Page transition**: Motion played while navigating between routes or pages.
* **View transition**: The browser connects two document or UI states, potentially including shared elements.

## Feedback and interaction

* **Hover effect**: A visual response while a pointing device hovers over an element.
* **Press / Tap feedback**: Immediate visual response to pressing an interactive element.
* **Hold to confirm**: Progress accumulates while the user continues pressing.
* **Drag**: An element follows a pointer and may retain momentum after release.
* **Drag to reorder**: A dragged item changes position while neighboring items move around it.
* **Swipe to dismiss**: A drag moves an element away to close it.
* **Rubber-banding**: Resistance and snap back when dragging beyond a boundary.
* **Shake / Wiggle**: A rapid side to side response indicating rejection or error.
* **Ripple**: A circle expands from the press location to acknowledge input.

## Easing and springs

* **Easing**: The rate at which animation velocity changes over time.
* **Ease-out**: Motion starts quickly and slows toward the end.
* **Ease-in**: Motion starts slowly and accelerates toward the end.
* **Ease-in-out**: Motion accelerates and then decelerates.
* **Linear**: Motion maintains a constant rate.
* **Cubic-bezier**: A custom easing curve described by four control-point values.
* **Asymmetric easing**: Acceleration and deceleration use differently shaped portions of a curve.
* **Spring**: Motion determined by physical response rather than only a fixed timing curve.
* **Stiffness / Tension**: How strongly a spring pulls toward its target.
* **Damping**: How quickly spring oscillation settles.
* **Mass**: How much inertia the simulated spring carries.
* **Bounce**: Spring overshoot and settling that creates a playful response.
* **Perceptual duration**: How long a spring appears to take to finish, even though tiny settling movements continue.
* **Momentum**: Continued motion that carries release velocity.
* **Velocity**: The speed and direction of movement.
* **Interruptible animation**: Motion that can be redirected smoothly before it finishes.

## Looping and ambient motion

* **Marquee**: Content continuously scrolls through a repeating path.
* **Loop**: An animation repeats a fixed or unlimited number of times.
* **Alternate / Yoyo**: Each repetition reverses direction.
* **Orbit**: An element circles around another point or element.
* **Pulse**: A repeating change in scale or opacity used to draw attention.
* **Float**: Gentle continuous drift that creates a sense of weightlessness.
* **Idle animation**: Ambient motion played while an element awaits interaction.

## Polish and effects

* **Blur**: Softens an element or conceals tiny transition imperfections.
* **Clip-path**: Restricts rendering to a hard geometric shape.
* **Mask**: Reveals or hides content with a shape or gradient, including soft edges.
* **Before / after slider**: A draggable divider reveals portions of two overlaid images.
* **Line drawing**: An SVG path appears as though traced by a moving pen.
* **Text morph**: Text transitions character by character when its value changes.
* **Skeleton / Shimmer**: A loading placeholder displays a moving highlight.
* **Number ticker**: Digits roll or count toward a new value.
* **Tabular numbers**: Fixed-width digits prevent surrounding content from shifting.
* **Typewriter**: Characters appear sequentially as though being typed.

## Performance and principles

* **Frame rate / FPS**: Number of rendered frames per second.
* **Jank**: Visible stuttering caused by missed rendering deadlines.
* **Dropped frame**: A frame not rendered before its display deadline.
* **Compositing**: The GPU combines independently rendered layers without repeating layout and paint.
* **Layout thrashing**: Repeated reads and writes force excessive synchronous layout calculation.
* **Purposeful animation**: Motion serves orientation, feedback, explanation, or continuity rather than decoration alone.
* **Anticipation**: A small preparatory movement signals the direction of a larger action.
* **Follow-through**: Secondary parts continue and settle after the primary movement.
* **Squash and stretch**: Shape deformation communicates weight and speed.
* **Perceived performance**: Motion changes how fast an interface feels without changing actual completion time.
* **Spatial consistency**: Motion preserves the user’s understanding of where elements came from and went.
* **Reduced motion**: An alternative presentation that reduces potentially uncomfortable movement while preserving necessary information.
