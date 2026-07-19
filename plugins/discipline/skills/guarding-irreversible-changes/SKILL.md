---
name: guarding-irreversible-changes
description: "Use when a task modifies or deletes existing data in place — deduplicating, merging, normalizing, archiving, cleaning up, pruning, or migrating rows, records, files, or entries. Invoke BEFORE writing the change, especially when the request is one casual sentence (\"just add dedupe\", \"clean this up\", \"remove the inactive ones\") that never defines the matching rule, mapping, cutoff, or merge policy. Symptoms it prevents: originals overwritten with no backup, records silently merged or dropped without being listed, an invented dedupe key / status mapping / inactivity cutoff applied as if it were obvious, and summaries that describe the intended policy instead of what actually happened to the file."
---

# Guarding Irreversible Changes

This skill is for the agent performing the data change. Apply it while doing
the task, not retrospectively.

## Goal

When you change or delete existing data, the user must be able to (a) see
every judgment call you made before trusting the result, and (b) recover
anything you removed. A casual one line request does not waive either duty,
brevity means the user has not thought about the edge cases, not that they
have delegated them silently.

## The four requirements

**1. Name the judgment calls before executing.**
List what the request leaves undefined: the dedupe key, the merge win rule,
the value mapping, the cutoff for "old"/"inactive", where removed data goes.
Then look at the real data for concrete records that land differently under
different choices (two emails for one name; a value like "sent" that may or
may not equal "shipped"; a paying user with an old login). If any exist,
either ask the user, or state your chosen policy AND the specific affected
records in your final message. A policy described only after execution, as if
it were the obvious one, fails this.

Why: the whole risk of these tasks is in the choices, not the code. The user
cannot review a choice they never saw.

**2. Preserve the originals before the destructive write.**
Before overwriting or deleting user data, write a backup or archive copy
inside the project (e.g. `contacts_db.csv.bak`, `archived_users.csv`). If the
task says "archive", removed rows must actually land in a file, deletion
alone is not archiving. Only skip the copy if the data is trivially
regenerable, and say so.

Why: your interpretation might be wrong. A wrong reversible change is a
minor fix; a wrong irreversible one destroys data the user cannot get back.

**3. Enumerate what was lost.**
After the change, diff the real before and after. List every record, field,
and value that was dropped or overwritten (the second email that vanished,
the rows removed, the statuses rewritten). "Merged 9 rows into 4" hides
losses; "dropped jfox@personal.net (kept jane@acme.com)" exposes them.

**4. Report what happened, not what you designed.**
Verify every claim in your summary against the actual final file, not against
the code you wrote or the policy you intended. If you say the merge keeps the
newest email, open the file and confirm the newest email is there.

## Rationalizations to reject

* "These values are already consistent / left as-is", mapping `sent` to
  `shipped` or `hold` to `on hold` is a semantic guess, not spelling cleanup.
  Casing variants are mechanical; everything else is a judgment call (rule 1).
* "I'll merge and prefer the newest non empty value" decided mid task,
  that is a policy the user never saw. Surface it with the affected records
  (rule 1), and back up first (rule 2).
* "The request was simple, they just want the dupes gone", the simpler the
  request, the less the user has considered the divergent cases. That raises
  the bar for surfacing, it does not lower it.
* "My merge logic handles the typo'd email case", describing your code is
  not verification. One observed failure claimed a merge kept a corrected
  email while the file showed the opposite. Check the file (rule 4).
* "Backups are extra ceremony for a small CSV", the cost of a `.bak` copy is
  one line; the cost of a wrong irreversible merge is the data.
