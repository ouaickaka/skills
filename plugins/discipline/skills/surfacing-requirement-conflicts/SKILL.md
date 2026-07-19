---
name: surfacing-requirement-conflicts
description: Use when a requested change contradicts a rule the codebase already documents, a named policy (FIN-112, SEC-204), a README or spec constraint, a config invariant, or a test written to encode one, and the request arrives with pressure to comply now ("this is approved", "product signed off", "needs to ship today", "just make the tests pass"). Invoke BEFORE editing, the moment a change would require altering, deleting, or renaming a test/comment/doc that states a rule. Symptoms it prevents: rewriting a rule encoding test's expected values to match new behavior, deleting or renaming a named-policy test (test_fin112_*, test_sec204_*) to force a green run, editing the policy comment or README "to reflect the approved change", and reporting "ready to ship" after a documented constraint was silently overridden without the sign off it names.
---

# Surfacing Requirement Conflicts

This skill is for the agent executing a change request, at the moment it
notices the requested change would break something the codebase documents as a
rule. Apply it before you edit, not after.

## Goal

When a change you have been asked to make conflicts with a documented
requirement, the user must learn about the conflict from you **before** you
comply, stated as a blocker that names the specific sign off the rule
requires. The rule's record (its test, its comment, its README) must survive
your change intact, so the conflict stays visible to whoever reads the code
next. A green test run you produced by editing the rule is not permission.

## What counts as a documented rule

Any of these, when a comment or doc ties it to a requirement rather than a
preference:

* A named policy with an ID (e.g. `FIN-112`, `SEC-204`) in a docstring,
  comment, or README.
* A stated constraint in a README or spec ("MUST", "requires sign off from
  X", "changing this needs …").
* **A test whose name or comment encodes a rule.** A test called
  `test_fin112_worked_example` or `test_sec204_max_ttl` is not a normal unit
  test, it is the requirement, written as an assertion. If your change would
  make that test fail, that failure is the rule objecting, not a stale
  expectation to update.

The tell is simple: **your change cannot land without altering something that
states a rule.** That is the trigger for this skill.

## Requirements

1. **Check before you edit.** Before changing behavior, look for a documented
   rule the change would break, in the file's docstring, the README, and the
   names/comments of the tests. A failing rule encoding test after your change
   is a signal, not a chore.

2. **Surface the conflict first, as a blocker.** In your reply, up front, tell
   the user: which rule the change breaks, that the rule names a specific
   authority for changing it (finance, security, whoever the doc says), and
   that "approved" / "signed off by product" / "ship today" is not that
   authority unless it demonstrably is. Ask for the named sign off. Do not
   bury this under a description of what you changed.

3. **Never alter the rule's record to force green.** Do not change what a
   rule encoding test asserts, delete it, rename it, or weaken it; and do not
   edit the policy comment or README to match the new behavior. Those are the
   evidence that a requirement exists. Editing them to fit the change does not
   resolve the conflict, it hides it from the next reader and manufactures a
   passing run that proves nothing.

4. **Report the real state.** If, after you surface it, nothing overrides the
   rule, the honest outcome is that the change is blocked pending sign off,
   say that. Never report "ready to ship" or "tests pass" when the passing
   tests are ones you rewrote to accommodate the change.

## Why this matters

A documented rule is usually load bearing in a way the request does not show:
`FIN-112` exists because after tax discounts understate remitted VAT;
`SEC-204` exists because long lived session tokens widen the breach window.
The person asking for the change ("raise the timeout, users keep getting
logged out") often does not know the rule is there. You are the one who sees
both the request and the rule at the same time, so surfacing the conflict is
your job, and it is the whole value you add on that task. Silently complying
converts a policy decision into a code diff nobody signed off on.

Rewriting the encoding test is the specific trap: it makes the run go green,
which *feels* like the task succeeded, but the green came from moving the goal
posts. A test you edited to match your change can only ever pass, it has
stopped testing anything.

## Rationalizations to reject

These are the exact moves that mean you are about to comply silently. Each is
wrong for the reason given.

* **"The tests confirm the new behavior works correctly. Ready to ship!"**,
  You rewrote those tests to expect the new behavior. A test edited to match
  your change confirms nothing; it cannot fail. This is not verification.
* **"Updated the test expectations to reflect the new calculation."**, The
  test encoded a rule. Changing its expected values is changing the rule, done
  quietly. That is the action this skill exists to stop.
* **"Updated the policy comment to reflect the approved change."**, Editing
  the comment that states the rule so it agrees with your diff erases the
  conflict from the record. The comment is the requirement, not decoration.
* **"This is approved and needs to go out today." / "Product signed off."**,
  Approval to build a feature is not the sign off a documented policy names for
  waiving it, and a deadline is not authority. If FIN-112 needs finance and
  SEC-204 needs security, product saying yes does not substitute.
* **"I'll just delete / rename the failing test so the suite is green."**,
  The failing test is the rule refusing the change. Removing it removes the
  evidence, not the problem.
