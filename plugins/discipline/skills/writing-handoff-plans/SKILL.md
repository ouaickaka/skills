---
name: writing-handoff-plans
description: "Use when writing an implementation plan, task spec, or handoff document that a different agent or model will execute later — especially a less capable one with no access to this conversation. Invoke BEFORE writing the plan file. Symptoms it prevents: a plan that references \"the pattern discussed above\" or context only this session has, steps with no verification command, done criteria like \"works correctly\" that nothing can check, missing scope boundaries so the executor wanders into unrelated files, and no escape hatch when the plan's assumptions turn out false."
---

# Writing Handoff Plans

This skill is for the moment your output is a plan someone else executes —
another agent, a cheaper model, a teammate — without this conversation. The
plan is the product; its quality decides whether the executor succeeds. Write
for the weakest plausible executor with zero context.

## Goal

A plan the executor can complete, verify, and safely abandon using nothing
but the plan and the repository. Every fact the plan relies on is inside the
plan; every step can be checked by a command; every boundary is stated.

## Requirements

**1. Fully self-contained.**
The executor has not seen this conversation, your survey, or any other plan.
Inline everything: why the change matters, exact file paths, current-state
code excerpts, the repo conventions to follow with an exemplar snippet. A
plan that says "as discussed above" or "following the earlier pattern" is
broken.

Why: references to context the reader lacks fail silently — the executor
substitutes a guess and executes the guess.

**2. Excerpts come from your own reads.**
Open every file the plan cites before writing it. Line numbers and code
snippets relayed from a subagent, a memory, or an earlier summary are leads,
not facts — a wrong excerpt becomes a wrong plan.

**3. Every step carries its own verification.**
Each step ends with a command and its expected output. Done criteria are
machine-checkable — "npm test passes, `grep -c` returns 0" — never prose like
"works correctly". State the repo's exact build/test/lint commands in the
plan; the executor should not have to discover them.

Why: a weaker executor cannot judge "correct"; it can compare command output
to an expectation.

**4. Hard boundaries and escape hatches.**
List files in scope, files explicitly out of scope, and things that look
related but must not be touched. Add stop conditions: "if X turns out to be
true, STOP and report back instead of improvising." Stamp the commit the plan
was written against so drift is detectable.

Why: the executor's failure mode is not stopping — it is plausibly extending
scope. Boundaries convert improvisation into a report-back.

## Rationalizations to reject

* **"The executor can read the codebase itself."** It can read files; it
  cannot recover your judgment about which files matter or why. That judgment
  is the plan's payload.
* **"Adding verification per step bloats the plan."** A plan the executor
  can't verify is a plan you'll re-review by hand — the cost lands later,
  larger.
* **"It's obvious what's out of scope."** Obvious to the author with context.
  Executors extend scope precisely where the plan is silent.
* **"The subagent's line numbers are probably right."** Probably is how a
  wrong excerpt ships inside an authoritative-looking plan.
