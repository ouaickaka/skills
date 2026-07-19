---
name: challenging-domain-terms
description: Use when the project documents its domain language — a CONTEXT.md, UBIQUITOUS_LANGUAGE.md, GLOSSARY.md, or docs glossary exists — and a request, comment, or code change uses a domain term. Also when a stated behavior ("orders can be partially cancelled") needs checking against what the code actually does. Invoke BEFORE designing or editing, the moment a term in the request is absent from, aliased in, or in conflict with the glossary.
---

# Challenging Domain Terms

A documented glossary is a contract about what words mean. Work that silently
uses a conflicting or ambiguous term breaks that contract twice: the code
drifts from the language, and the glossary rots into fiction. The failure this
skill prevents is not misunderstanding — it is proceeding without resolving
the mismatches sitting in plain sight.

## Term audit — produce this before touching any code

Write a short audit (in your notes, response, or NOTES.md) with these two
sections filled in. An empty section means you checked and found nothing —
say so explicitly. Skipping the audit is how ambiguous terms and false
premises get built into code.

```
### Term audit
- <each domain word/phrase the request uses>: <glossary status — defined /
  alias-to-avoid for X and Y / absent / conflicts with definition>
- Verdict per term: matches glossary | AMBIGUOUS (which entry is meant?) |
  CONFLICT (request changes what this word means)

### Claim audit
- <each factual claim the request makes about existing behavior>:
  <what the code actually does, with file reference> — CONFIRMED / FALSE
```

Words listed in an "aliases to avoid" column are the highest-value catches:
the team wrote that column because the word has burned them before. If the
request uses one ("account", "client"), it maps to two or more real concepts —
name them and ask which is meant. Do not pick the likelier one silently.

A FALSE claim is a finding, not a footnote. Say what the code does, what the
request assumes, and that one of them must change — before building on the
claim.

## Resolving what the audit finds

- **AMBIGUOUS term** — ask, or if you must proceed, state the reading you
  chose as an explicit assumption at the top of your summary, using the
  glossary's canonical term from then on.
- **CONFLICT with a definition** — the domain model is changing. Make the
  change in the open: either sharpen the existing definition or introduce a
  new term, and update the glossary file in the same change. One-sentence
  definitions, no implementation detail — the glossary says what a thing IS,
  never how it is stored or computed. If the glossary records relationships between terms, check those too;
  a definition edit that leaves a contradicting relationship line behind
  makes the glossary lie.
- **FALSE claim** — report it in your summary and implement what the code
  reality requires, not what the false premise assumed.

## What this is not

- Not a request to build a glossary where none exists. No glossary file, no
  obligation — this skill keys on the file existing.
- Not a veto. Requests may legitimately change the domain model; the point is
  the change happens in the open, in the glossary, not by silent drift.

## Rationalizations

| Excuse | Reality |
|---|---|
| "It's obvious which meaning they intended" | Obvious guesses are how two meanings end up in one codebase. Ask; it costs one sentence. |
| "The audit is overhead for a small change" | Small changes ship false premises fastest. The audit is five lines. |
| "I'll flag the term issue after implementing" | The implementation hard-codes your guess. Audit before designing. |
| "The glossary is probably out of date" | Then say so and fix it — an out-of-date glossary is a finding, not a permission slip. |
| "Updating CONTEXT.md isn't part of the task" | The glossary edit IS part of any task that changes what a term means. |
