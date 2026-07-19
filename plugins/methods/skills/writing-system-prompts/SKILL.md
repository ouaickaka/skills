---
name: writing-system-prompts
description: Use when writing, revising, or debugging a prompt or system prompt for an LLM-powered app, agent, or pipeline — including when a bot or agent misbehaves and the likely fix is a prompt change. Invoke BEFORE editing the prompt.
---

# Writing System Prompts

Modern models follow instructions literally and well. When a prompted app misbehaves, the cause is usually the prompt's shape — duplication, vague bars, missing reasons, negative-only rules — not model weakness. The untrained instinct is to ADD more emphatic rules on top. That instinct is backwards: leaner prompts reliably follow better while using fewer tokens. Subtract and reshape first.

## Required: audit before editing

Before changing any prompt, produce this audit (in your notes or response). One row per instruction in the current prompt:

### Instruction audit

| Instruction (short quote) | Stated once? | Positive form? | Reason given? | Scope explicit? | Bar observable? | Verdict |
|---|---|---|---|---|---|---|

Verdict is one of: KEEP, REWRITE, MERGE (into which row), DELETE. If a reported misbehavior maps to no row, add a row `MISSING: <behavior>` — that is where a new instruction goes. Only after the audit, rewrite the prompt.

An honest audit with mostly KEEPs is fine; the point is you looked at every instruction, not that you changed them all.

## Rewrite rules

1. **State each instruction once.** Repetition and ALL-CAPS emphasis do not increase compliance; they add noise and can cause overtriggering. Merge duplicates into one clear sentence.

2. **Delete what isn't earning its place.** Keep an instruction only if it encodes a product requirement or fixes an observed failure. Style filler, defensive rules for scenarios that can't happen, and instructions tuned for older, lazier models get deleted.

3. **Say what to do, and why.** Convert "do not X" into a positive statement of the desired output ("Do not use markdown" → "Write in flowing prose paragraphs"). Attach the reason when it isn't obvious ("responses are read aloud, so spell out symbols") — models generalize from the motivation to cases you didn't enumerate.

4. **Make scope explicit.** Models apply instructions literally and won't silently generalize from one item to another. If a rule applies everywhere, say so: "Apply this to every section of the output, not only the summary."

5. **Make bars observable.** Qualitative bars ("only escalate important issues", "be conservative") make the model silently drop real positives. Either name concrete criteria ("escalate anything mentioning an outage, data loss, or security exposure") or split into a coverage stage (report everything, with confidence) and a separate filtering stage.

6. **Show, don't exhort.** One to three realistic examples wrapped in `<example>` tags steer format and tone more reliably than emphasis words. Match the prompt's own style to the output you want — a markdown-heavy prompt begets markdown-heavy output.

7. **Structure the prompt.** Separate instructions, context, and variable input with tags. Put long documents at the top and the ask at the end.

8. **Use platform levers for depth, not prose.** If the model under-thinks or over-thinks, reach for the API's reasoning/effort controls before writing "think really hard" style instructions.

## What this is not

This is not a rewrite-everything mandate. A prompt that is already lean, positive, reasoned, and concrete needs only the audit and a note saying so. And it is not about one vendor: the same shape rules hold across current frontier models.
