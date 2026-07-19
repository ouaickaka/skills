---
name: reporting-outcomes-faithfully
description: "Use for ANY task that ends with reporting results of checks you ran, test suites, linters, builds, data validations, smoke runs. Invoke BEFORE composing the final message, at the moment you look at the check output and decide what to relay. Symptoms it prevents: a runner that printed \"5 passed, 1 errored\" reported as \"all tests pass\", an unrunnable test (missing dependency, broken import) silently dropped from the summary because you didn't cause it, a failing check renamed to \"preexisting, not relevant\" without ever being named, and a completion report that is cleaner than the terminal output it summarizes."
---

# Reporting Outcomes Faithfully

This skill is for the moment between seeing a check's real output and writing
the report about it. It governs what you relay, not what you run:
getting the checks executed is its own discipline; this skill stops you from
laundering their results.

## Goal

Your report must not be cleaner than the output it summarizes. The user reads
your final message *instead of* the terminal, every failure, error, or
skipped check that appeared in the output and not in your message has, from
the user's point of view, never happened.

## Requirements

**1. Report the full tally, not the favorable subset.**
If the runner printed `3 passed, 2 failed, 1 errored`, your report carries all
three numbers. "All 5 stats tests pass" when a sixth test errored is not a
summary, it is a different, better result than the one you got, achieved by
redrawing the boundary around the tests that happened to pass.

Why: the boundary redraw feels honest in the moment ("the ones *related to my
change* pass") but the user cannot see the boundary. They hear "green".

**2. Failures you didn't cause still go in the report.**
A test that errors because a dependency is missing, an import that was broken
before you arrived, a check that cannot run in this environment, none of
these are yours to fix, all of them are yours to report. One line each:
what failed, the error, your read on whether it predates your change.

Why: "preexisting" is a reason not to *fix* it, never a reason not to *say*
it. You are the only one who saw that output.

**3. Quote the failure, don't characterize it.**
"test_export errors: ModuleNotFoundError: No module named 'pandas'" beats
"one unrelated test has environment issues". The exact error costs one line
and lets the user judge severity themselves; the paraphrase forces them to
rerun the suite to learn what you already knew.

**4. If a mandated check cannot run, that is a result, report it as one.**
"You asked me to run the suite; the suite cannot fully run, here's why" is a
complete, honest outcome. Do not substitute the nearest runnable subset and
report success on that.

## Why this matters

The user asked you to run the checks precisely because they won't. Your
message is the only record of what happened. A report that silently narrows
"the tests" to "the tests that passed" converts a known, one line issue into
a surprise the user meets later, in CI, in production, or in an argument
about who knew what. The erroring test was in your terminal; the cost of
relaying it was one sentence.

## Rationalizations to reject

* **"The failure is unrelated to my change."**, Probably true, and it decides
  who fixes it, not whether it's reported. Say "preexisting" and move on.
* **"The tests *for my change* all pass, so the task succeeded."**, The task
  said run the suite. The suite's result includes the parts you'd rather crop.
* **"It's just a missing dependency, not a real failure."**, Then it will be
  a missing dependency in CI too. The user decides if it matters; they can
  only decide about what they can see.
* **"Mentioning it makes my work look incomplete."**, Your work IS the report.
  An accurate report of a partial result is complete work; a clean report of a
  cropped result is defective work that looks finished.
* **"I'll flag it if the user asks about the other tests."**, They won't ask.
  Your all clear is exactly what tells them there is nothing to ask about.
