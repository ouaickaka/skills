---
name: assessing-before-fixing
description: "Use when the user describes a problem, asks a question, or thinks out loud without requesting a change, \"why is this slow?\", \"the totals look off to me\", \"I don't understand what this function does\", \"hm, that test seems flaky\". Invoke BEFORE opening an editor, at the moment you notice the message contains a symptom or a question but no instruction to change anything. Symptoms it prevents: source files edited in response to a question, a \"fix\" applied for a problem the user was still characterizing, an investigation that mutates the thing being investigated, and a final message that says \"fixed it\" when the user only asked what was wrong."
---

# Assessing Before Fixing

This skill is for the moment a message arrives carrying a symptom, a
question, or a musing — and no request. The user is diagnosing out loud.
Your deliverable is the diagnosis, not the cure.

## Goal

When the user describes a problem rather than requesting a change, report
your findings and stop. The assessment is the complete work product. A fix
applied at this stage is unrequested surgery: it may pre-empt a decision the
user was still forming, hide the evidence they wanted to see, or solve the
wrong reading of an ambiguous complaint.

## Requirements

**1. Classify the message before acting on it.**
"Why is X slow?", "these numbers look wrong", "what does this do?" are
requests for understanding. "Fix X", "make this faster", "change Y" are
requests for change. If the message contains no imperative, treat it as the
first kind — investigate, explain, recommend, and end your turn.

Why: the user who is thinking out loud has not decided what to do yet. Your
edit forecloses their decision and makes the codebase a moving target while
they reason about it.

**2. Investigate read-only.**
Reproduce, trace, measure, read — without mutating the thing under
investigation. No source edits, no state changes, no "temporary" instrumentation
left in place. If reproduction genuinely requires a change (a log line, a
failing-test harness), keep it out of the report's way: revert it before
finishing, and say you did.

Why: an investigation that mutates its subject destroys the baseline. The
user can no longer distinguish what was broken from what you changed.

**3. End with findings and a recommendation, not a fait accompli.**
Report what you found, where (`file:line`), what you believe the cause is,
and what you would do about it — as a proposal. "The N+1 query in
`orders.py:88` is the slowdown; I'd batch it with `select_related`. Want me
to?" is a complete answer. Applying the batch first and reporting it after
is not a better one.

Why: the recommendation is where your judgment shows; the unrequested edit
is where it overreaches. The distance between them is one question.

**4. A finding does not upgrade itself into permission.**
Discovering the cause mid-investigation — even an obvious, one-line cause —
does not convert the question into a change request. Certainty about the fix
is a reason to state it crisply, not to apply it.

## Rationalizations to reject

* **"The fix was trivial, one line."** Size of edit is not consent. Trivial
  fixes are exactly the ones cheap to propose and wait.
* **"They obviously want it fixed."** They want it *understood* first — that
  is what they asked for. If they wanted it fixed sight-unseen, they'd have
  said fix it.
* **"Fixing it proves my diagnosis."** A failing test or a measurement proves
  the diagnosis without mutating the code the user is reasoning about.
* **"I'll fix it and explain, saves a round trip."** It also removes their
  chance to say "don't — that behavior is load-bearing." The round trip is
  the feature.
