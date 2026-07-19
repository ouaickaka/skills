---
name: decomposing-by-information-hiding
description: "Use when splitting code into modules, files, or functions — designing module boundaries, restructuring for an anticipated change, breaking up a large file, or extracting functions during refactoring. Invoke BEFORE proposing the split. Symptoms it prevents: modules named after pipeline steps (parse/process/output) that each still know the shared data format, a volatile decision duplicated across every module so one change touches all of them, code shredded into tiny functions purely because \"smaller is clearer\", and boundaries justified by size or step order instead of by what they hide."
---

# Decomposing by Information Hiding

This skill is for the moment you choose where the seams go — module
boundaries, file splits, function extraction. The criterion is information
hiding: a good boundary hides a design decision that is likely to change. A bad
boundary mirrors the order of processing steps and leaks shared decisions
into every module.

## Goal

A decomposition where each volatile design decision (data representation,
storage layout, input format, algorithm choice) lives inside exactly one
module, and the interfaces between modules would survive that decision
changing.

## Requirements

**1. List the decisions likely to change before drawing boundaries.**
Enumerate them explicitly: input format, in-memory representation, storage,
ordering/algorithm choices, external services. Then assign each decision to
one module whose job is to conceal it. Boundaries come from this list, not
from the sequence of processing steps.

Why: a flowchart split (read → transform → write) makes every step share
knowledge of the data layout; the first representation change then touches
every module. The same system cut around its changeable decisions confines
that change to one module.

**2. Test each interface against the change it must survive.**
For every boundary ask: "if the hidden decision changed tomorrow, does this
interface change?" Interfaces that pass around raw representations (packed
arrays, positional fields, format strings) fail this test — replace them with
operations (`getField(record, name)`, not `record[2]`).

**3. Decompose for change, not for size.**
Splitting a function into many small ones is not automatically clearer —
fragmenting carries a real reading cost, since readers pay for every jump
between fragments. Extract a function when it hides a decision or is reused, not to
hit a line count.

**4. When the right cut is unclear, generate more than one and compare.**
Sketch two candidate decompositions (e.g. by change-concealment and by
domain/inputs-outputs), and pick by counting how many modules each
anticipated change would touch. No single criterion wins everywhere;
comparing cuts is cheap, re-cutting shipped modules is not.

**5. State what each module hides.**
The deliverable names, per module, the decision it conceals — "storage layout
lives here; nothing else may know it." A module you cannot write that
sentence for is a step, not a module.

## Rationalizations to reject

* **"Smaller functions are always easier to understand."** The empirical
  evidence does not support this; fragmentation has its own reading cost.
  Clarity comes from what a boundary hides, not how little it contains.
* **"The natural split is the processing order."** Natural to write, worst
  to change — every step ends up sharing the data-layout decision.
* **"We can fix the boundaries later."** Interfaces are the hardest thing to
  change once callers exist; representation leaks calcify.
* **"The format won't change."** The decomposition question is not whether
  it will, but how much it costs if it does. Hiding it costs one indirection.
