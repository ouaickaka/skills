---
name: debugging-to-root-cause
description: Use when debugging any bug, test failure, crash, or unexpected behavior — before proposing or writing a fix. Applies to production bugs, failing builds, integration issues, and performance problems, especially when a quick patch looks obvious or earlier fix attempts did not stick.
---

# Debugging to Root Cause

A fix written before the root cause is known is a guess. Guesses that make the
symptom disappear usually survive review, ship, and resurface as a different
bug — because the broken data or state is still flowing, just patched over at
one place it happened to surface. The procedure below exists to make the fix
land where the defect is, not where it is visible.

## The procedure

Work through these steps in order. The output of each step is written down —
in your working notes or your report — not held in your head.

### 1. Read the evidence before forming a theory

Read the full error message, stack trace, or wrong output — to the end, not
until it pattern-matches something familiar. Note exact values: what was
expected, what appeared instead. The difference between expected and actual is
data about the defect; "it's wrong" is not.

Reproduce the failure yourself before changing anything. If you cannot trigger
it, you cannot know a fix worked.

### 2. Trace the bad value to its origin

Start where the failure is visible and walk backward: what produced this
value? What produced its input? Keep going until you reach the place where
correct data became incorrect. That place is the root cause; everything
downstream is symptom.

In a multi-stage system (parse → transform → store → render), check the data
at each boundary — log it, print it, or inspect it — until you find the stage
whose input is good and whose output is bad. One instrumented run that shows
where it breaks is worth more than any amount of reasoning about where it
might break.

The fix belongs at that stage. A cast, guard, or reformat added downstream
makes the symptom disappear while every other consumer of the same bad data
stays broken.

If the trace ends at data that arrives from outside — a file, feed, export,
or API the code consumes rather than produces — the root cause is the code
that mishandled it, not the data. Hand-correcting the offending records makes
today's run pass and leaves the crash armed for the next delivery. Make the
code accept or reject that input deliberately, at the point of ingestion or
lookup.

### 3. State one hypothesis, test it minimally

Write the claim in one sentence: "X is the root cause because Y." Then make
the smallest change that tests it — one variable at a time. If the hypothesis
is wrong, revert and form a new one from what you learned; do not stack a
second speculative change on top of the first. Changes that go in together
cannot be blamed apart.

### 4. Prove the bug, then fix it

Before writing the fix, write a test that fails because of this bug — an
automated test if the project has a suite, a small script otherwise. This
does two things: it proves your reproduction actually captures the defect,
and it stays behind to catch regression.

Then implement one fix — the root cause from step 2, nothing else. No
adjacent cleanup, no "while I'm here" improvements; they widen the diff and
hide which change did what.

### 5. Verify wider than the symptom

Run the new test (passes), the full suite (nothing else broke), and check the
other consumers of the data or code path you changed — the original symptom
was one surface of the defect, and the fix should heal all of them.

## When fixes keep failing

Count your attempts. After a failed fix, return to step 1 with the new
evidence — the failure tells you something your first trace missed. After
three failed fixes, stop fixing: three fixes that each revealed a new problem
in a different place is the signature of a design problem, not a stubborn
bug. Say so, describe the pattern you're seeing, and raise the design
question instead of attempting a fourth patch.

## What this is not

This is not a checklist to recite after fixing — the tracing in step 2 and
the failing test in step 4 happen before the fix exists. And it is not
overhead reserved for hard bugs: for a simple bug the whole procedure takes
minutes, and "simple" bugs whose obvious patch was wrong are how multi-hour
debugging sessions start.
