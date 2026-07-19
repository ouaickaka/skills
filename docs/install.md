# Installing ouaic

You have fetched the install guide for the ouaic plugin marketplace. Show this content to the user. Wait for their approval before running any install commands.

Before you start, use the harness ask tool to learn what the user needs. Claude Code uses `AskUserQuestion`, OMP uses `ask`, and OpenCode uses `question`. If the question tool is not available, fall back to a normal text question.

## Ask what to install

Find out which plugins the user wants and which harness they use. The available plugins are discipline (behavioral correctives that activate on their own), methods (expert procedures to invoke), and judgment (evaluators for reviews and decisions). The user can pick any combination.

The supported harnesses are Claude Code, OMP, ChatGPT/Codex, Grok Build, Cursor, Pi, and OpenCode.

## Install

### Skills CLI

Run the interactive installer and select the skills relevant to the current task:

```
npx skills add ouaickaka/skills
```

You can also give an agent this prompt:

```text
Use the skills in "https://github.com/ouaickaka/skills" that are relevant to the current task. Run `npx skills add "https://github.com/ouaickaka/skills"` and select the relevant skills, then follow their instructions.
```


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

### ChatGPT and Codex

Register the marketplace from the terminal:

```
codex plugin marketplace add ouaickaka/skills
```

Restart the ChatGPT desktop app, open the Plugins Directory in Work mode or Codex, select the Ouaic marketplace, and install each chosen plugin: `discipline`, `methods`, or `judgment`.

Verify that Codex registered the marketplace:

```
codex plugin marketplace list
```

### Grok Build

Ouaic provides a Grok marketplace containing `discipline`, `methods`, and `judgment`. Install the chosen plugins from the xAI Plugin Marketplace after Ouaic is published there.

xAI does not document a command for registering a third-party marketplace directly. Do not invent one; if Ouaic is not visible in Grok Build, explain that its official marketplace listing is not available yet.

### Cursor

After Ouaic is published in the Cursor Marketplace, open **Customize**, find `discipline`, `methods`, or `judgment`, and install the chosen plugins.

Teams and Enterprise admins can use the repository directly as a team marketplace: open **Dashboard → Plugins**, choose **Add Marketplace → Import from Repo**, and enter `https://github.com/ouaickaka/skills`.

### Pi

Pi installs Ouaic as one package containing all available skills:

```
pi install git:github.com/ouaickaka/skills
```

Use `pi config` to enable or disable individual skills. Verify the package is registered:

```
pi list
```

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

### ChatGPT and Codex

Remove installed plugins from the Plugins Directory in the ChatGPT desktop app. Remove the marketplace source from the terminal:

```
codex plugin marketplace remove ouaic
```

### Cursor

Open **Customize** and uninstall or disable the Ouaic plugins individually. Team admins manage imported marketplace access under **Dashboard → Plugins**.

### Pi

Remove the package:

```
pi remove git:github.com/ouaickaka/skills
```

### OpenCode

Remove the ouaic entry from the `plugin` array in `opencode.json`. Restart OpenCode. No files are left behind.
