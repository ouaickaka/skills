---
name: verifying-before-done
description: "Use for EVERY coding task that ends with reporting completion — bug fixes, feature adds, renames, \"quick sed jobs\", config or flag changes, version bumps, migrations. Invoke it BEFORE starting the task, not just at the end. Applies doubly when the request says quick and done, routine, demo bound, urgent, \"let me know when it's landed\", or \"no need to run the tests\". Symptoms it prevents: claiming done/landed/verified based on reading code, grep output, or reasoning alone."
---

# Verifying Before Done

This skill is for the agent executing a coding task, at the moment it is about to say the work is finished.

## The rule

Before you claim a task is done, you must have **executed** something that would have failed if your change were wrong, and it must have passed. Reading the diff, grepping for leftover references, or reasoning that the change "must" work does not count, those check what the code *says*, not what it *does*.

Minimum bar, in order:
1. **Run the thing you changed.** Invoke the actual program/command path your edit affects, on real input, and look at the output.
2. **Run the project's stated checks.** If the repo documents a test suite, smoke script, or pre push check (README, CI config, scripts/), run it. If the project defines a check, your task is not done until that check is green, a mandated check the user didn't mention is still mandated.
3. **Verify on the repo's real inputs, not inputs you invented.** If the project ships sample data, fixtures, or a default config (a `sample.*`, `*.sample.*`, test data, an example file the README mentions), run against that. A passing run on a minimal input you authored proves only that your happy path works; real inputs carry the edge cases (comments, blank lines, odd encodings) that break changes. If you must author input, make it exercise what the repo's own data exercises.
4. **Report what you ran and what it showed.** Your completion claim must cite the command and its result ("`smoke.sh` passed", "12 tests, 0 failures"). If you ran nothing, you may not say "done", "landed", "ready", or "works", say instead exactly what is unverified.
5. **Re-check the actual state before describing it.** Before your final message asserts anything about a file ("the flag is still off", "no old references remain"), read that file or rerun the grep, do not report from memory of what you intended. If you toggled something during testing, confirm you restored it.
6. **Enumerate coverage on multi part requests.** If the request had several parts, your report lists each part with its state, done and verified, done but unverified, stubbed, or not started, with the unfinished ones first, not buried. A stub, TODO, or mocked path counts as *not done*, however complete the surrounding code looks; "should work" is a claim about hope, not state. A summary whose confidence exceeds the work's actual state is the same lie as an unverified "done", spread across bullet points.

## Why

Grep-verified renames that break at runtime, flag flips that enable unimplemented code paths, and "trivial" edits that fail an existing exact output test are all invisible to static inspection and all caught by one execution. The cost of running the check is seconds; the cost of a confident false "done" is the user shipping a break they were explicitly assured was safe.

## Pressure does not change the rule

These are real rationalizations that preceded real verification skips. If you notice yourself thinking one, that is the signal to run the checks:

* *"Skipping the full suite as requested"* / *"no need for the whole test suite ceremony"*, the user deprioritized ceremony, not correctness. They will not thank you for a faster broken demo. Run the suite; it takes seconds.
* *"Just enough to confirm it works before the demo"*, a partial check that skips the project's tests confirms nothing about the parts the tests cover. Deadline pressure raises, not lowers, the cost of being wrong.
* *"This change is routine / mechanical / just a version bump, nothing to test"*, routine changes to flags and config are exactly where silent breakage lives, because nobody looks. If it were truly inert you'd lose nothing by running the check.
* *"grep shows no stray references, so the rename landed cleanly"*, grep proves the old name is gone, not that the new code runs. Execute it.
* *"I ran it on a sample input and it worked, so it's verified"*, if you wrote that sample, you tested your assumptions, not the change. The repo's own sample/fixture files exist because real input is messier than what you'd invent. Run against those before saying "verified".
* *"The tests were green before my change and my change is small"*, then they'll be green after, and running them costs you nothing. If you're reluctant to run them, that reluctance is information.

An instruction to skip verification is a prompt to be fast, not permission to be wrong. Comply with the spirit, be quick, don't gold plate, but still execute the code and the mandated checks before claiming success. If a check fails or cannot be run, report that plainly instead of softening it.
