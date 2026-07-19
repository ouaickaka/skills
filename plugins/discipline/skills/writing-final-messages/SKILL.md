---
name: writing-final-messages
description: "Use when composing the final message of any turn, especially after a long multi-tool run where findings accumulated in intermediate notes or thinking the user never sees. Invoke at the moment you finish the work and start writing the wrap-up. Symptoms it prevents: a summary whose first sentence is process narration instead of the outcome, findings mentioned mid-turn but missing from the final message, arrow-chain shorthand like \"A → B → fails\", invented labels (\"Fix 3\", \"the alpha approach\") the reader never saw defined, and a report so compressed the user has to ask what it means."
---

# Writing Final Messages

This skill is for the last thing you write in a turn — the only text the user
is guaranteed to read. Everything they need from the turn must be in it,
written for a teammate who stepped away and is catching up, not for a log
file.

## Goal

Lead with the outcome; include everything the turn produced that the user
needs; write it in complete sentences a reader can follow without having
watched your process. Readable beats concise — if the user has to reread or
ask a follow-up to understand, any brevity saved nothing.

## Requirements

**1. First sentence answers "what happened."**
Not what you did first, not the plan, not "I started by examining…" — the
outcome: what changed, what you found, whether it worked. Supporting detail
and reasoning follow for readers who want them.

Why: the first sentence is the TLDR the user would ask for. Burying it under
process narration makes them mine for it.

**2. The final message is self-contained.**
Anything important that appeared only mid-turn — a finding between tool
calls, a caveat in your reasoning, a decision you made along the way — gets
restated here. The user usually cannot see thinking or raw tool output, and
text between tool calls may never be shown.

Why: a conclusion that lives only in an intermediate note was, from the
user's side, never said.

**3. Shorten by selection, not compression.**
Cut details that don't change what the reader does next. What survives the
cut is written in full sentences with technical terms spelled out — no
fragment stacks, no abbreviation soup, no arrow chains like
`config → loader → fails`.

Why: compression moves the decoding cost onto the reader. Ten clear sentences
beat six cryptic ones every time someone has to reread.

**4. No labels the reader never saw defined.**
"Fix 3", "the second approach", "the alpha path" are shorthand from your own
process. Say what you mean in place: "the retry-with-backoff fix". Reference
code as `file:line`, not as nicknames you coined mid-run.

Why: your working vocabulary evolved over the turn; the reader was not there
for it. Every undefined label is a cross-reference into text they can't see.

**5. After a long run, re-ground before writing.**
When the turn spanned many tools or a context summary, re-check the concrete
facts you're about to report (did that test pass? what was the final file
state?) rather than reporting from memory of the middle of the run.

## Rationalizations to reject

* **"I already said that earlier in the turn."** Mid-turn text is not
  delivered text. If it matters, it goes in the final message.
* **"Shorter is more respectful of their time."** Only if it's still
  readable. A summary that triggers a "what does this mean?" reply cost more
  time than it saved.
* **"The table says it all."** Tables carry short enumerable facts;
  explanations live in surrounding prose. A table of fragments is compression
  wearing a grid.
