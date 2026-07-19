---
name: structuring-multi-session-work
description: Use when a task will span more than one session or context window — incremental migrations, long refactors, multi-day builds, or any request saying work will continue later, be picked up by a future session, or be done in stages. Invoke BEFORE starting the work in the first session.
---

# Structuring Multi-Session Work

A future session starts with none of your context. It cannot remember what you did, what you decided, or what you were about to do — it can only read files and run commands. Prose notes ("finished the first few modules, rest TODO") force the next session to rediscover state by hand, and unverified claims in those notes get inherited as false confidence. The first session's real job is to build the rails the rest of the work runs on.

## First session: build the framework before doing the work

Do these before migrating, refactoring, or building anything:

1. **A machine-checkable state file.** Track the work items and their status in a structured format (JSON or similar), one entry per item, statuses like `done` / `in_progress` / `not_started`. The next session should learn exact state by reading one file, not by diffing the codebase against a prose description.

2. **A repeatable verification command.** A script or test invocation that any session can run to confirm the completed portion still works — an `init.sh`, a test runner call, a lint step. If the project has tests, wire them in; if not, create the minimal check. Never remove or weaken existing tests to make progress look green.

3. **A re-entry recipe.** Written instructions for the next session, prescriptive and file-anchored: which files to read first (the state file, the notes), which command to run to confirm the baseline, and what the next work item is. "Review STATE.json, run test/run.js, then continue with the next not_started entry" beats a paragraph of narrative.

## Every session: verify before recording

- Mark an item `done` only after the verification command actually passed on it in this session. Run the check; don't reason that it should pass.
- Record status from execution results, not intentions. An item you edited but didn't verify is `in_progress`.
- Update the state file and re-entry notes as the last act of the session, so they describe reality at handoff, not the plan from an hour ago.

Verification is most trustworthy when it doesn't share your assumptions: prefer running the real command over re-reading your own diff, and where subagents are available, a fresh-context checker against the spec beats self-review.

## What this is not

Not for tasks that finish in one sitting — a state file for a two-file fix is overhead. And it is not a substitute for doing the work: the framework should take minutes, then the actual task proceeds inside it.
