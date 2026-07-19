# ouaic


## Plugin Taxonomy

Plugins are split by the failure mode a skill fixes, not by functional domain. The plugins and what each failure mode means are defined in the marketplace manifest; read it before placing a skill. A new skill goes wherever its baseline eval failure points.

Do not add a new plugin for a new domain; domains live in keywords and skill descriptions.


## Verify By Doing

Every skill ships through the same pipeline; no step is skippable.

1. **Distill.** Turn the source or idea into a draft skill following the distilling rules.
2. **Fixture.** Build a hint-free eval fixture: a realistic task where the skill's behavior would change the outcome, with nothing in the prompt or files that names or nudges toward the skill's advice. The fixture defines its pass or fail assertions up front. Prefer designs where the right behavior and the shortcut produce objectively different artifacts.
3. **Two arms.** Run the same task twice in fresh subagents on a smaller model than the authoring one, since skills exist to lift the floor, not the ceiling. One arm reads the skill first and follows it where applicable; the baseline arm gets only the task.
4. **Grade from evidence.** Judge each assertion against the artifacts the runs produced, quoting the evidence, never from impressions of the transcript.
5. **Keep rule.** Ship only if the baseline fails at least one assertion the skill arm passes. If both arms pass, the skill adds nothing; if both fail, first suspect the fixture, then the skill.

Record the benchmark and its honest caveats before committing. One eval result is a coin flip: a wash or surprise means iterate the fixture or the skill and rerun, not conclude. When an arm dodges the intended dilemma, the fixture has an escape hatch; fix the fixture before touching the skill.


## Distilling Skills

When turning an outside source into a skill, keep the durable method and drop everything tied to the source: external links, vendor statistics, product names, cross references to the source's other material. If a fact can go stale or can't be verified from the skill alone, it does not belong.

Skills are fully self-contained. Never name another skill inside a skill body; discovery is the description's job, so linking happens through triggering, not references. Express a scope boundary as a nameless statement of what the skill does not do. If a skill needs reference material that another skill also covers, write its own purpose-specific document rather than sharing or copying a file; a copy is a sync point and a shared file is a coupling.

The description is the triggering mechanism. Start with when to use, use the concrete outcome words a user would actually say, and never summarize the skill's workflow in it.

When a skill's content changes, bump the owning plugin's version in its manifest and in the marketplace listings.


## Commit Messages

The commit log is the project's timeline. Anyone, technical or not, should be able to scan it and know what happened and when. Write each message so a future reader can find it by searching with plain words.

Lead with what changed, in one short sentence. No symbols, prefixes, file paths, engineering terms, or dashes of any kind. No em dashes, no en dashes, no hyphens used as punctuation. If the reader needs to know code details, they will open the commit.

Good: `Remove unused safety checks`
Good: `Add rules for writing commit messages`
Avoid: `refactor(guardrails): rm evals/ dirs, update AGENTS.md`
Avoid: `fix: empty directory cleanup`


## Writing Style

Avoid counts, version pins, dates, file lists, and anything else that must be manually kept in sync. If the text can drift out of date when the project changes, leave it out. The truth lives in the files, not in the words that describe them.
