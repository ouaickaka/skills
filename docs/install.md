# Installing ouaic

You have fetched the install guide for the ouaic plugin marketplace. Show this content to the user. Wait for their approval before running any install commands.

Before you start, use the harness ask tool to learn what the user needs. Claude Code uses `AskUserQuestion`, OMP uses `ask`, OpenCode uses `question`. If the question tool is not available on OpenCode (needs `permission.question: "allow"` in opencode.json), fall back to a normal text question.

## Ask what to install

Find out which plugins the user wants and which harness they use. The available plugins are discipline (behavioral correctives that activate on their own), methods (expert procedures to invoke), and judgment (evaluators for reviews and decisions). The user can pick any combination.

The supported harnesses are Claude Code, OMP, and OpenCode.

## Install

### Claude Code

The user runs these commands in their chat interface. Install the marketplace first, then the chosen plugins. Run only the commands for the plugins the user picked.

Register the marketplace:

```
/plugin marketplace add https://github.com/ouaickaka/skills.git
```

You can also run this from the terminal: `claude plugin marketplace add https://github.com/ouaickaka/skills.git`

Install each chosen plugin, where `<name>` is `discipline`, `methods`, or `judgment`:

```
/plugin install <name>@ouaic
```

Terminal equivalent: `claude plugin install <name>@ouaic`

Verify everything worked by running `claude plugin list` in the terminal, or by asking the user to check "list the skills from the installed plugins" in chat.

### OMP

The user runs these commands in their chat interface. Install the marketplace first, then the chosen plugins. Run only the commands for the plugins the user picked.

Register the marketplace:

```
/marketplace add https://github.com/ouaickaka/skills.git
```

You can also run this from the terminal: `omp plugin marketplace add https://github.com/ouaickaka/skills.git`

Install each chosen plugin, where `<name>` is `discipline`, `methods`, or `judgment`:

```
/marketplace install <name>@ouaic
```

Terminal equivalent: `omp plugin install <name>@ouaic`

Verify everything worked by running `omp plugin list` in the terminal.

### OpenCode

OpenCode installs the whole marketplace as one package. All available skills come with it. Edit the user's `opencode.json` by adding the plugin to the `plugin` array. If a project level file exists, use that. Otherwise use the global config at `~/.config/opencode/opencode.json`.

Add this entry:

```json
{
  "plugin": ["ouaic@git+https://github.com/ouaickaka/skills.git"]
}
```

Tell the user to restart OpenCode. Verify by asking "list the skills from the installed plugins."

## Confirm it works

After installing, ask the agent to list the loaded skills. You should see skills from each plugin the user picked.

If the skills do not appear, check the install commands and try again. No additional configuration is needed. Discipline skills activate on their own when relevant; methods and judgment skills are invoked when the task calls for them.

## Uninstall

### Claude Code

Tell the user to run this in chat for each installed plugin, or use the terminal command:

```
/plugin uninstall <name>@ouaic
```

Terminal: `claude plugin uninstall <name>@ouaic`

To remove the marketplace entry: `/plugin marketplace remove ouaic`.

### OMP

Tell the user to run this in chat for each installed plugin, or use the terminal command:

```
/marketplace uninstall <name>@ouaic
```

Terminal: `omp plugin uninstall <name>@ouaic`

To remove the marketplace entry: `/marketplace remove ouaic`.

### OpenCode

Remove the ouaic entry from the `plugin` array in `opencode.json`. Restart OpenCode. No files are left behind.
