---
name: surfacing-incidental-findings
description: "Use whenever a task sends you reading or editing code in files you don't own — fixing a bug, optimizing for speed, renaming a symbol across a repo, investigating a failure, or any scoped \"just change X.\" Invoke BEFORE you start and again when writing your final message. Symptoms it prevents: a hard coded credential, data corruption path, or broken safety check scrolled past and never mentioned because it was \"not my task,\" and final summaries that cover only the requested change while omitting hazards seen along the way. Not for greenfield code or trivial one-file edits."
---

# Surfacing Incidental Findings

This skill is for the agent executing a scoped task, at two moments: while
reading code that the task routes it through, and when composing the final
message.

## Goal

While you work, you are often the only pair of eyes that will pass over those
files for weeks. Anything you see that the owner would drop what they're doing
to fix, a live credential in source, an adjacent function that is plainly
wrong, a path that corrupts or loses data, must reach your final message,
even though it has nothing to do with what you were asked. The task defines
what you *change*; it does not define what you *saw*.

## Requirements

**1. Keep a notice list while you read.**
As you pass through files for your task, anything that would alarm a
reasonable owner goes on the list with its location: secrets or credentials
committed in source, code that cannot be doing what its name claims, silent
data corruption or loss, obviously dead or unreachable safety checks. You are
not searching for these, you are simply not discarding them when they cross
your path.

Why: the failure is almost never "didn't see it". It is "saw it, filed it as
not my task, and the filing erased it". The list exists so the filing doesn't.

**2. Put the list in the final message, briefly.**
End your summary with a short "Also noticed" section, one line per item,
`file:line`, what it is, why it matters. Two lines about a live key is not
bloat; it may be the most valuable thing in your report.

**3. Report them; do not silently fix them.**
Fixing out of scope issues unasked is scope creep and can be wrong (the "bug"
may be known, the key may be a fixture). Silence is worse. The middle path,
name it, locate it, let the owner decide, is one sentence and always safe.

**4. Filter by consequence, not by proximity to your task.**
Report what changes what the owner does next: security exposure, incorrect
results, destroyed data, legal/PII exposure. Do not pad the list with style
nits, TODO comments, or things a linter would say, that buries the key under
noise and teaches readers to skip the section.

## Why this matters

The person who asked for the optimization believes the file is otherwise fine,
that is exactly why they only asked for the optimization. Your silence
confirms their belief. A credential that ships because the one agent who read
the file said nothing is a failure of reporting, not of detection: you had the
information and the channel, and delivered only the half they asked about.

## Rationalizations to reject

* **"It wasn't what I was asked to do."**, Correct, which is why you don't
  fix it. Reporting it costs one line and is always in scope.
* **"I don't want to bloat the summary."**, A summary that omits a live key
  in source is not lean, it is wrong. The filter in rule 4 keeps the section
  short; consequence-level findings are never bloat.
* **"It's probably intentional / they surely know."**, If they know, your
  line costs them two seconds. If they don't, your silence costs them an
  incident. The asymmetry decides.
* **"I'll mention it if they ask."**, They cannot ask about something only
  you have seen. That is the whole point.
* **"I'd have to verify it first."**, No. Report what you saw with its
  location and your uncertainty ("looks like a live payment API key, flagging in
  case it's not a test fixture"). Verification is the owner's call.
