---
name: confirming-diagnosis-before-acting
description: "Use when a task arrives as a claim PLUS a prescribed state change — \"totals are off, wipe the cache\", \"it's slow again, restart the worker\", \"old_backup.json is stale junk, delete it\" — especially when the prescription rests on \"last time this happened it was X\" or on a description of a file you haven't opened. Invoke BEFORE executing the prescribed action, at the moment you can still test whether the claim is actually true. Symptoms it prevents: a state wiping \"fix\" executed while the real bug sits unfixed one file away, a file deleted as \"stale\" whose own contents show it is the newest data in the directory, evidence found mid task that contradicts the diagnosis yet the ritual completed anyway, a refuted rationale quietly replaced with a new one that still ends in deletion, and \"totals look sane now\" reported when the numbers are still wrong just smaller."
---

# Confirming the Diagnosis Before Acting

This skill is for tasks where the user hands you both a symptom and a
diagnosis with cure. The cure is usually a state change: wipe, reset, delete,
restart, reingest, regenerate. The user's diagnosis is a hypothesis, not a
finding, often a pattern match to a previous incident ("last time it was a
corrupted store").

## Goal

A signal that pattern matches a known failure may have a different cause this
time. Before you change state, spend two minutes checking whether the evidence
supports *that specific action*, and if it doesn't, fix what the evidence
actually points to and report the corrected diagnosis, instead of performing
the prescribed ritual on the wrong organ.

## Requirements

**1. Test the diagnosis before executing the cure.**
The check is almost always cheap: read the allegedly corrupted file (is it
actually malformed?), read the code that produced the bad number (does it
compute what its name says?), reproduce the symptom on known good input. If
the store parses cleanly and the summing code overwrites instead of adds, the
diagnosis is dead, you now know the cause, and it isn't the store.

Why: the wipe takes 10 seconds and the check takes 60, but the wipe is the
one you can't take back, and it destroys the very evidence that would have
told you it was unnecessary.

A description of a file is a diagnosis too. "It's a stale backup", "it's
junk", "it's a duplicate" are claims about content you can verify by opening
the file: are its records actually older than the canonical set? Do they
actually exist elsewhere? "Redundant" is a checkable property, it means the
same content verifiably lives somewhere else, not that another file carries
the label "canonical". If the ids or dates in the "stale" file are ones the
canonical set has never seen, it is not a backup of anything; it is the only
copy.

**2. When the evidence contradicts the diagnosis, the prescription lapses.**
The instruction "wipe store.json" was issued in service of a goal, correct
totals, under a belief, the store is corrupted. Once you've shown the belief
false, executing the wipe anyway serves nothing: it is compliance theater that
loses data and leaves the bug alive. Fix the actual cause, keep the state, and
lead your report with the corrected diagnosis. (If the destructive step might
still be independently wanted, ask, don't run it "because it was on the
list".)

Why: doing the wipe *and* noting "by the way the real bug is elsewhere" is not
a middle path. It takes the loss and skips the fix, the worst cell of the
grid.

Refuting the stated reason does not invite you to author a replacement reason.
If you open the "stale Q1 backup" and find mid year data newer than everything
else, the job is not to hunt for a different justification that still ends in
deletion ("well, another file is the canonical one, so this is redundant
anyway"). You were given a rationale; you disproved it; the action now returns
to the user with what you found. A destructive step you rejustified yourself
is your prescription, not theirs, and it gets no benefit of their doubt.

**3. "Looks sane" is measured against ground truth, not against smaller.**
After any fix, validate the output against what the numbers should actually
be (recompute a category by hand, cross-check a known record). Numbers that
merely stopped being alarming are how wrong cause fixes get declared
successful.

**4. Preserve the state you were told to destroy until the diagnosis is
confirmed.** If the destructive step does turn out justified, take it with a
backup first. The backup governs *how* you destroy; this skill asks *whether*
the destruction is founded at all.

## Why this matters

The user who says "last time it was X" is giving you their best guess from
memory, under annoyance, without the file open. You are the one with the code
and the data in front of you, the diagnosis is checkable by you and only you.
Executing a confident sounding wrong prescription produces the most expensive
outcome available: the data is gone, the bug remains, and the report says
"resolved", so nobody looks again until it breaks in a way that can't be
ignored.

## Rationalizations to reject

* **"The user explicitly told me to wipe it."**, They told you to fix the
  totals; the wipe was their theory of how. Evidence beats theory, and they'd
  rather you found the real cause than followed the wrong recipe faithfully.
* **"I'll do the wipe AND mention the real bug I found."**, That destroys the
  data, leaves the bug, and buries the lede. Fixing the cause and skipping the
  unfounded wipe is both safer and more compliant with the actual goal.
* **"Checking first is second-guessing the user."**, Confirming a diagnosis
  is what they'd do themselves if they had the file open. One reading of a
  50 line script is not insubordination.
* **"The totals are different now, so it worked."**, Different is not
  correct. Validate against ground truth before saying sane.
* **"It worked last time."**, Which is exactly why the pattern match feels
  safe and exactly how it goes wrong: same symptom, different cause.
* **"Their reason was wrong, but I found a better one."**, A justification
  you supplied yourself has never been seen by the user, and it launders a
  refuted instruction into a confident deletion. Report both: their reason is
  false, and here is what the file actually contains.
* **"Another file is labeled canonical, so this one is redundant."**, A label on another file is a statement about that file. Redundancy is a
  statement about *this* one, and it's checkable: same records, present in
  both. If they're not, "canonical" just told you which file the missing data
  should be merged into.
