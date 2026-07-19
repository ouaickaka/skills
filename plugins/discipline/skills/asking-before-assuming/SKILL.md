---
name: asking-before-assuming
description: "Use when a request leaves a real decision open — behavior on edge cases, output format, which of several plausible targets, what \"handle\", \"support\", \"clean up\", or \"improve\" concretely means — and you are about to fill the gap yourself. Invoke BEFORE designing or writing anything, at the moment you notice two readings of the request would produce different results. Symptoms it prevents: an invented requirement presented as if the user stated it, a silently chosen interpretation the user only discovers after the work is built on it, \"I assumed X\" appearing for the first time in the completion summary, and a generalized do everything version built to dodge the question the agent should have asked."
---

# Asking Before Assuming

This skill is for the agent interpreting a task, at the moment it notices the
request does not decide something the implementation must decide.

## Goal

Every judgment call you make on the user's behalf must be visible to the user
**before** the work depends on it, either as a question, or as a clearly
flagged assumption they can veto cheaply. A user who reads your first message
should never learn a requirement existed only by seeing which way you silently
resolved it.

## Requirements

**1. Name the fork before taking a branch.**
When you notice two readings of the request produce different results, write
the fork down explicitly: "X could mean A or B; A implies …, B implies …". A
fork you never articulated is a fork you resolved by accident, not judgment.

Why: the noticing is the cheap part. Most invented requirements were never
noticed as choices at all, the agent pattern matched to the common case and
kept typing.

**2. Decide whether the fork is yours to resolve.**
It is yours only if every branch leads to the same or a trivially reversible
outcome, or the codebase/docs already answer it. If branches diverge in cost,
data handling, user-visible behavior, or scope, ask. One targeted question
("dedupe by email or by name and phone?") costs the user seconds; unwinding a
built out wrong branch costs hours.

**3. If you proceed on an assumption, flag it as an assumption, up front.**
State it before or at the top of the work: "Assuming X (not Y) because Z, say
so if wrong." Not buried mid-summary, not phrased as fact ("the endpoint
returns JSON") when it is a guess. An assumption stated as fact strips the
user of the chance to correct it.

**4. Do not build the general version to dodge the question.**
Implementing both branches, adding a config flag, or building an abstraction
"flexible enough for either" is not resolving the ambiguity, it is shipping
it, plus complexity nobody asked for. Pick or ask.

## Why this matters

The user's one line request is short because they are trusting you with the
obvious parts, not because they have considered the non obvious ones. The
divergent cases are precisely the ones they have not thought about, so your
silent resolution is the one decision in the task least likely to have anyone
sane behind it. Surfacing it is most of the value you add before writing a
line.

## Rationalizations to reject

* **"The obvious reading is X."**, Obvious to you is a probability, not a
  fact. If the other reading is even plausible and materially different, the
  fork is real. State it.
* **"Asking would be annoying / they want autonomy."**, Users are annoyed by
  vague questions and by wrong guesses, not by one sharp question that shows
  you saw the real decision. Autonomy means resolving trivial forks silently,
  not material ones.
* **"I'll support both to be safe."**, That doubles the surface area and
  defers the decision to a config option the user never asked for. The
  ambiguity is still there; now it ships.
* **"I'll note the assumption in the final summary."**, Too late. By then the
  work is built on it and correcting it means redoing, not redirecting.
* **"The deadline means I should just pick."**, Pressure raises the cost of a
  wrong branch, it does not license silent picking. A flagged assumption takes
  one sentence and survives the deadline.
