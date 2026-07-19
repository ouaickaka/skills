# Installing ouaic for OpenCode

## Prerequisites

OpenCode installed.

## Installation

Add ouaic to the `plugin` array in your `opencode.json`, either at the global level or per project:

```json
{
  "plugin": ["ouaic@git+https://github.com/ouaickaka/skills.git"]
}
```

Restart OpenCode. The plugin installs through the OpenCode plugin manager and registers every skill from every plugin in the marketplace. Discipline skills activate on their own when the agent reaches a situation they were built for; methods and judgment skills are invoked when the task calls for them.

Verify by asking: "List the skills from the installed plugins."

OpenCode uses its own plugin install. If you also use Claude Code, Pi, or another harness, install ouaic separately for each one.

## Usage

Discipline skills activate on their own. Methods and judgment skills are invoked by you or the agent when relevant. No manual loading needed.

## Updating

OpenCode installs the plugin through a git backed package spec. Some OpenCode and Bun versions pin that resolved git dependency in a lockfile or cache, so a restart may not pick up the newest commit. If updates do not appear, clear the OpenCode package cache or reinstall the plugin.

## Troubleshooting

### Plugin not loading

Check logs: `opencode run --print-logs "hello" 2>&1 | grep -i ouaic`. Verify the plugin line in your `opencode.json`. Make sure you are running a recent version of OpenCode.

### Skills not found

Use the native skill tool to list what OpenCode discovered. Check that the plugin is loading first.

## Getting Help

Report issues at the project repository.
