---
name: avoiding-speculative-complexity
description: Use whenever implementing a concrete coding request and the solution starts introducing abstractions, interfaces, factories, registries, plugin systems, configuration layers, fallbacks, retries, extension points, or generalized error policies that no current requirement needs. Invoke before designing or editing, especially for "add one format/provider/handler," small features, and one off integrations. Prevents a small correct change becoming a speculative framework while still requiring reuse of abstractions the codebase already established.
---

# Avoiding Speculative Complexity

## Goal

Implement the smallest design that satisfies the current observable contract and fits the codebase that exists. Do not make today's change carry hypothetical requirements the user did not ask for.

This skill is not anti abstraction. It distinguishes an abstraction earned by repeated, current variation from machinery created in anticipation of variation that may never arrive.

## Requirements

### 1. Demand a current consumer for every new mechanism

Before adding any mechanism whose only consumer is hypothetical — an interface, a registry, a configuration switch — name the current requirement or second real consumer that needs it.

If the only justification is “we may add more later,” keep the implementation direct. Future code can extract the abstraction when the variation becomes real and its shape is known.

### 2. Reuse existing boundaries; do not invent parallel ones

If the repository already routes comparable behavior through an established interface or registry, extend it consistently. Removing or bypassing a real boundary to appear simpler creates inconsistency rather than simplicity.

If neighboring code is direct and concrete, match that style instead of introducing the repository's first framework for one new case.

### 3. Separate required variation from imagined variation

A request for one additional output format requires that format. It does not automatically require dynamic format discovery, runtime plugins, generic serializers, or a public extension API.

A request for one provider requires that provider. It does not automatically require provider selection, fallback routing, retries, adapters, or configuration for providers that do not exist.

Build only the variation visible in the current requirements, tests, callers, and repository conventions.

### 4. Prefer reversible local code over premature public structure

Direct code is cheap to refactor when a second or third real case reveals the correct seam. A premature abstraction is expensive because callers, tests, types, and configuration begin depending on a guessed seam.

Keep new APIs private and local unless the request or existing architecture requires public reuse.

### 5. Do not manufacture defensive policy

Do not add retries, fallback defaults, coercion, warning suppression, or broad exception handling unless the failure behavior is part of the requested contract or an established repository pattern.

When an existing invariant makes a state impossible, preserve or assert the invariant rather than designing an unrequested recovery system.

### 6. Audit every added construct

Before finishing, inspect each new type, function, option, branch, and file:

* Which current requirement needs it?
* Which current caller uses it?
* Which observed repository pattern does it follow?
* Could deleting it leave the requested behavior intact?

Delete constructs that have no concrete answer.

## Decision test

Use a new abstraction only when at least one is true:

1. The repository already has that abstraction for this family of behavior.
2. Two or more current implementations need the same stable contract.
3. The user explicitly requested extensibility or runtime substitution.
4. A tested architectural boundary requires it.

Otherwise, implement the concrete case directly.

## Examples

### One new exporter

Requested: add JSON export beside CSV; only those formats are expected.

Prefer a small JSON implementation that follows the existing CSV structure. Do not introduce an exporter protocol, plugin loader, registry, and runtime configuration merely because a third format is imaginable.

### One email provider

Requested: send mail through the repository's existing transactional mail client; no other providers are planned.

Prefer the direct integration at the existing service boundary. Do not introduce provider factories and fallback routing. If the repository already has an `EmailProvider` interface used by multiple providers, implement that interface instead of bypassing it.

### Existing multi provider architecture

Requested: add a third payment provider to a repository with a provider interface and configuration based dispatch.

Extend the existing abstraction. The abstraction is already earned by real variation; replacing it with a provider specific conditional would increase complexity.

## Rationalizations to reject

* **“This makes future providers easy.”** Their requirements are unknown; the guessed interface may make the real future provider harder.
* **“It is only a small interface.”** Interfaces create callers, tests, compatibility expectations, and a public seam. Count the ecosystem, not the declaration.
* **“This is cleaner architecture.”** Architecture is cleaner when it reflects real forces in the system, not hypothetical ones.
* **“Retries make it robust.”** Unrequested retry policy changes latency, duplication risk, observability, and failure semantics.
* **“Generic code is more reusable.”** Reuse is demonstrated by current consumers, not predicted by type parameters.
* **“Direct code is not scalable.”** Scale the design when the current system or requirement demands it; do not prepay for an unknown future.
