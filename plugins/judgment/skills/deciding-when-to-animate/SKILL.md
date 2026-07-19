---
name: deciding-when-to-animate
description: Use before adding, preserving, or expanding interface animation when the action may be keyboard initiated, frequently repeated, latency sensitive, decorative, or requested only as “polish.” Also use when deciding motion intensity for rare onboarding, feedback, celebration, modal, drawer, toast, or state change moments.
---

# Deciding When to Animate

## Goal

Do not treat animation as the default form of polish. Match motion to the interaction’s frequency and user facing purpose before choosing easing, duration, or implementation.

## The decision

Before writing animation code, answer two questions.

### 1. How often does the user encounter it?

* **Hundreds of times per day or keyboard initiated:** keep the action immediate. Opening and closing motion usually becomes repeated latency; omit it unless continuity would otherwise be lost.
* **Tens of times per day:** use little or no motion. Prefer instant state changes or brief feedback that does not delay input.
* **Occasional:** ordinary transitions may orient the user or prevent a jarring state change.
* **Rare or one time:** expressive motion may add useful emphasis or delight.

Frequency governs intensity, not merely duration. A shorter unnecessary animation is still unnecessary.

### 2. What job does the motion perform?

Keep motion only when it provides at least one concrete benefit:

* preserves spatial continuity;
* explains where an element came from or went;
* confirms input without delaying the action;
* makes a meaningful state change legible;
* prevents an otherwise jarring appearance or removal;
* emphasizes a rare milestone or result.

“It feels polished” and “it looks cool” are not sufficient purposes for a frequently repeated action.

## Required behavior

1. **Resist the requested decoration when frequency makes it harmful.** If asked to animate a command palette, shortcut panel, or other expert workflow, say plainly when zero motion is the better design.
2. **Keep input and focus immediate.** Never make keyboard focus, command execution, or dismissal wait for decorative motion.
3. **Allow justified motion.** Do not turn restraint into a blanket prohibition. Rare onboarding, celebrations, and meaningful transitions may animate when the motion supports the event.
4. **Prefer the smallest motion that communicates the change.** Remove properties, distance, and staging that do not add information.
5. **Preserve an accessible alternative.** When motion is used, provide a non vestibular reduced motion state without hiding essential feedback.

## Decision output

State the choice before implementation:

```text
Frequency: [high / repeated / occasional / rare]
Purpose: [specific user facing job, or none]
Decision: [no motion / reduced feedback / standard transition / expressive motion]
```

Then implement only that decision. Do not add a generalized motion system, gesture machinery, or animation framework unless the repository already uses one.

## Rationalizations to reject

A short duration, a user request for "polish", or "no animation is boring" do not override the frequency test — repetition makes even 150 ms visible, and immediate response is often the premium behavior in expert tools. Nor does the rule mean never animate: rare meaningful events have a different answer.
