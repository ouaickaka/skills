---
name: surfacing-codebase-insights
description: "Use throughout coding tasks when reading, changing, debugging, reviewing, or explaining an existing codebase — feature work, bug fixes, refactors, code review, architecture exploration, and requests to explain decisions. Symptoms it prevents: a correct change delivered with none of the understanding needed to make the next one, generic tutorial narration attached to mechanical edits, and insights invented rather than grounded in files actually inspected."
---

# Surfacing Codebase Insights

## Goal

A correct change can still leave the user without the reusable understanding the agent needed to make it. Surface that understanding while it is relevant: why this repository uses a pattern, what invariant the change must preserve, and which trade-off shaped the implementation.

The task remains primary. Teaching supports the work; it never replaces implementation, verification, or a direct final report.

## Requirements

### 1. Teach from inspected evidence

Only explain patterns established by code, configuration, tests, or documentation inspected in this session. Name the relevant file, symbol, or observed convention. If the rationale is not explicit, label it as an inference rather than presenting it as fact.

### 2. Prefer repository specific lessons

Useful insights include:

* an invariant a new code path must preserve;
* why registration, dispatch, persistence, or validation lives at a particular boundary;
* a convention repeated across neighboring implementations;
* a design trade-off visible in the existing architecture;
* a failure mode prevented by the chosen implementation;
* what the verification demonstrates about the system contract.

Do not explain generic syntax, elementary language features, or textbook patterns unless the user asks.

### 3. Explain at meaningful decision points

Before a consequential edit, note the pattern or invariant the change must preserve. After implementation or verification, explain what the result confirms. Do not wait until the final response to reveal every useful insight.

Use no more than one insight box before a meaningful change and one after verification. Omit the box when there is nothing genuinely useful to teach.

### 4. Keep insights in the conversation

Never add tutorial narration, change history comments, or explanatory prose to source files merely to satisfy this skill. Match the repository's existing comment density and style.

### 5. Stay concise

Each box contains 1-3 concrete points. Do not repeat the task summary, narrate tool use, or restate obvious code. A mechanical rename, typo correction, formatting change, or routine configuration edit normally needs no box.

## Format

```text
★ Insight ─────────────────────────────────────
- [Concrete repository specific point]
- [Why it matters for this change or future work]
─────────────────────────────────────────────────
```

## Quality test

Before emitting an insight, ask:

1. Is it grounded in something actually inspected?
2. Is it specific to this codebase or decision?
3. Would it help the user make a similar change safely later?
4. Does it add information not already obvious from the diff?

If any answer is no, omit or rewrite it.

## Rationalizations to reject

* **"Any explanation is educational."** Generic lessons dilute the codebase knowledge the user actually needs.
* **"I should always produce the box because the skill is active."** Silence is better than filler on mechanical work.
* **"The architecture probably intended this."** Observed structure is fact; inferred intent must be identified as inference.
* **"Comments are a convenient place for the lesson."** The conversation teaches the user; the codebase should contain only comments future maintainers need.
* **"The explanation can replace verification."** Understanding the intended invariant does not prove the implementation preserves it.
