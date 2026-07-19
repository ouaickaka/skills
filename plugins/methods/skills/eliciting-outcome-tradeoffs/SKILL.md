---
name: eliciting-outcome-tradeoffs
description: "Use when product or feature discovery starts from a solution-shaped request — \"add auto-merge\", \"build a dashboard for X\", \"make onboarding faster\" — where the feature is named but the outcome it serves and what it must not degrade are not. Invoke before accepting the mechanism as the objective. Symptoms it prevents: features that optimize a proxy, benefits designed without a paired downside, and success criteria that reward speed while hiding losses in quality, agency, trust, learning, or ownership."
---

# Eliciting Outcome Tradeoffs

**Core principle:** A mechanism is not the outcome. Discover what it should
enable and what that benefit must not make worse: **improve X while preserving
Y**. Desired benefits and feared costs coexist: the same person who wants a
feature faster also fears it becoming less reliable.

## Procedure

### 1. Separate mechanism from outcome

Ask what would be different if the solution worked perfectly. If the answer is
still “faster,” “easier,” or “more productive,” ask once: “What would that
enable?” Stop when another answer would not change the design. Skip this when
two-sided outcome and preservation criteria are already established.

### 2. Elicit the paired downside

Ask: **“If we achieve that benefit, what must this feature not make worse?”**
Examples include speed versus oversight, visibility versus fairness, and easier
learning versus independent skill. Offer these as prompts, never assumed
answers; let the user identify what matters.

### 3. Write a two-sided criterion

> Improve **[human outcome]**, measured by **[signal]**, while preserving
> **[value or capability]**, checked by **[guardrail]**.


### 4. Evaluate the mechanism last

Compare the feature against both sides. Recommend a better mechanism when one
exists, but return the choice to the user.

## Example

**Request:** “Add auto-merge so reviews stop slowing releases.”

**Ask:** “If releases became predictable, what would that enable? What must
faster merging not weaken — approval, review quality, recovery, or something
else?”

**Criterion:** “Reduce release delay while preserving approval and rollback.”

## Quick reference

| Signal | Ask |
|---|---|
| Feature named as the result | “What would be different if this worked perfectly?” |
| Answer is a proxy such as speed | “What would that enable?” |
| Benefit can erase value | “What must this not make worse?” |

## Common shortcuts

| Rationalization | Counter |
|---|---|
| “The user said what they want.” | They named a mechanism; establish outcome and guardrail. |
| “The downside is obvious.” | Offer examples, then ask; assumptions are not requirements. |
| “Discovery will slow us down.” | Stop when another answer would not change the design. |
| “Concern means reject it.” | Convert concern into a guardrail, not a veto. |

## Red flags

* The mechanism is also the success criterion.
* Every metric rewards more speed, output, completion, or usage.
* Discovery covers what should improve but not what must remain intact.
