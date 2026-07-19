---
name: preserving-working-state
description: "Use when a task is about to discard or overwrite workspace state — git reset --hard, checkout/restore over modified files, clean -f, branch delete, force push, stash drop, rm on project files, or regenerating a file that has local edits. Invoke BEFORE running the destructive command, especially when the request sounds routine (\"just reset to main\", \"discard my changes\", \"start fresh\", \"clean up the branch\"). Symptoms it prevents: uncommitted or untracked work destroyed by a reset the user thought was safe, a force push erasing remote commits nobody inventoried, \"discard my changes\" interpreted wider than the user meant (their debug edits AND their half written feature), and completion reports that never mention what the destructive command actually threw away."
---

# Preserving Working State

This skill is for the agent operating on a workspace, at the moment its next
command would discard state that exists now and cannot be regenerated,
uncommitted changes, untracked files, stashes, local only commits, or a remote
branch about to be force overwritten.

## Goal

Nothing in the workspace is destroyed without (a) being inventoried first,
(b) surviving somewhere recoverable, and (c) the destruction being reported.
"The user asked me to discard changes" authorizes discarding what they had in
mind, not everything the command happens to sweep up. You find out what the
command sweeps up by looking, before running it.

## Requirements

**1. Inventory before you destroy.**
Before any discarding command, look at what is actually there: `git status`
(including untracked), `git stash list`, and, before reset/force push,
`git log` for commits that exist only locally or only on the branch being
overwritten. The inventory decides whether the operation is safe, so it must
come first; running it after is archaeology.

Why: destructive commands are scoped by flags, not by intent. `reset --hard`
does not know which modifications are the user's disposable debug edits and
which are their afternoon's work.

**2. Checkpoint before the destructive step.**
If the inventory shows anything not already safe in a commit that will
survive, park it somewhere recoverable before proceeding: a stash
(`git stash -u`), a backup branch (`git branch backup/<name>`), or a plain
copy for untracked files. One command, and a wrong interpretation of "discard
my changes" becomes a minor fix instead of lost work. Skip it only when the
inventory is genuinely clean, and say that you checked.

**3. Treat shared state as someone else's workspace.**
Force pushing a branch others may have pulled, deleting a shared branch, or
rewriting published history destroys state on machines you cannot see.
Confirm with the user before these, even when the local operation was
authorized, "clean up my branch" does not decide what happens to the remote.

**4. Report what was destroyed and where the checkpoint is.**
Your summary must state what the destructive command removed (the three
modified files, the two local commits) and how to get it back ("stashed as
stash@{0}", "backup branch `backup/feature-x`"). A report that says "reset to
origin/main, done" hides exactly the information the user needs when they
realize half their work is gone.

## Why this matters

Workspace state is the one thing in the project with no second copy. Source
code is in git history; data files can carry backups; but uncommitted work
exists only in the working tree, and one flag bearing command removes it
permanently. The requests that precede these losses are always casual,
"just reset it", because the user is picturing the state they remember, not
the state that is there. The inventory is you checking whether those two
match; the checkpoint is what saves you both when they don't.

## Rationalizations to reject

* **"They said discard the changes."**, They said it while picturing some of
  the changes. The untracked notes file and the half finished module are in
  the blast radius only you can see. Inventory, then checkpoint.
* **"git status looked clean earlier."**, Earlier is not now. You, a hook, or
  a formatter may have touched the tree since. Run it again immediately before
  the destructive command.
* **"A stash is overkill for a two line diff."**, The stash costs one command
  and nothing if unused. You are not stashing because the diff is big; you are
  stashing because your reading of "discard" might be wrong.
* **"Force push is fine, it's their branch."**, It is their branch on their
  machine. On the remote it is whatever their teammates pulled. Ask.
* **"I'll mention the reset in the summary."**, Mentioning the command is not
  the duty; enumerating what it destroyed and where the copy lives is.
