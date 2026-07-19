import { readFileSync } from "node:fs";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const rootManifest = readJson("package.json");
const legacyMarketplaces = [
  ["Claude", readJson(".claude-plugin/marketplace.json")],
  ["OMP", readJson(".omp-plugin/marketplace.json")],
];
const codexMarketplace = readJson(".agents/plugins/marketplace.json");
const errors = [];

for (const [marketplaceName, marketplace] of legacyMarketplaces) {
  if (marketplace.metadata.version !== rootManifest.version) {
    errors.push(
      `${marketplaceName} marketplace version ${marketplace.metadata.version} does not match package.json ${rootManifest.version}`,
    );
  }
}

const expectedPluginNames = legacyMarketplaces[0][1].plugins.map(({ name }) => name);
const expectedPluginNameSet = new Set(expectedPluginNames);
const marketplacePluginSets = [
  ...legacyMarketplaces.map(([name, marketplace]) => [name, marketplace.plugins]),
  ["Codex", codexMarketplace.plugins],
];

const expectedPiSkills = expectedPluginNames.map((name) => `./plugins/${name}/skills`);
if (!rootManifest.keywords?.includes("pi-package")) {
  errors.push("package.json keywords must include pi-package");
}

if (JSON.stringify(rootManifest.pi?.skills) !== JSON.stringify(expectedPiSkills)) {
  errors.push(
    `package.json pi.skills ${JSON.stringify(rootManifest.pi?.skills)} does not match ${JSON.stringify(expectedPiSkills)}`,
  );
}

for (const [marketplaceName, plugins] of marketplacePluginSets) {
  const names = plugins.map(({ name }) => name);
  const uniqueNames = new Set(names);

  if (
    names.length !== expectedPluginNames.length ||
    uniqueNames.size !== names.length ||
    names.some((name) => !expectedPluginNameSet.has(name))
  ) {
    errors.push(
      `${marketplaceName} marketplace plugins [${names.join(", ")}] do not match [${expectedPluginNames.join(", ")}]`,
    );
  }
}

for (const pluginName of expectedPluginNames) {
  const manifestPath = `plugins/${pluginName}/plugin.json`;
  const codexManifestPath = `plugins/${pluginName}/.codex-plugin/plugin.json`;
  const grokManifestPath = `plugins/${pluginName}/.grok-plugin/plugin.json`;
  let manifest;
  let codexManifest;
  let grokManifest;

  try {
    manifest = readJson(manifestPath);
    codexManifest = readJson(codexManifestPath);
    grokManifest = readJson(grokManifestPath);
  } catch (error) {
    errors.push(`Cannot read manifests for ${pluginName}: ${error.message}`);
    continue;
  }

  if (manifest.name !== pluginName) {
    errors.push(`${manifestPath} is named ${manifest.name}, expected ${pluginName}`);
  }

  for (const [platformManifestPath, platformManifest] of [
    [codexManifestPath, codexManifest],
    [grokManifestPath, grokManifest],
  ]) {
    for (const field of ["name", "version", "description", "homepage"]) {
      if (platformManifest[field] !== manifest[field]) {
        errors.push(
          `${platformManifestPath} ${field} ${JSON.stringify(platformManifest[field])} does not match ${manifestPath} ${JSON.stringify(manifest[field])}`,
        );
      }
    }

    if (platformManifest.author?.name !== manifest.author?.name) {
      errors.push(`${platformManifestPath} author does not match ${manifestPath}`);
    }
  }

  if (JSON.stringify(codexManifest.keywords) !== JSON.stringify(manifest.keywords)) {
    errors.push(`${codexManifestPath} keywords do not match ${manifestPath}`);
  }

  const expectedGrokKeywords = ["ouaic", `ouaic ${pluginName}`];
  if (JSON.stringify(grokManifest.keywords) !== JSON.stringify(expectedGrokKeywords)) {
    errors.push(`${grokManifestPath} keywords must be ${JSON.stringify(expectedGrokKeywords)}`);
  }

  if (codexManifest.skills !== "./skills/") {
    errors.push(`${codexManifestPath} skills ${codexManifest.skills}, expected ./skills/`);
  }

  for (const [marketplaceName, marketplace] of legacyMarketplaces) {
    const entry = marketplace.plugins.find(({ name }) => name === pluginName);
    if (!entry) {
      continue;
    }

    if (entry.version !== manifest.version) {
      errors.push(
        `${marketplaceName} ${pluginName} version ${entry.version} does not match ${manifestPath} ${manifest.version}`,
      );
    }

    const expectedSource = `./plugins/${pluginName}`;
    if (entry.source !== expectedSource) {
      errors.push(`${marketplaceName} ${pluginName} source ${entry.source}, expected ${expectedSource}`);
    }
  }

  const expectedSource = `./plugins/${pluginName}`;
  const codexEntry = codexMarketplace.plugins.find(({ name }) => name === pluginName);
  if (codexEntry) {
    if (codexEntry.source?.source !== "local" || codexEntry.source?.path !== expectedSource) {
      errors.push(`Codex ${pluginName} source must be local at ${expectedSource}`);
    }

    if (
      codexEntry.policy?.installation !== "AVAILABLE" ||
      codexEntry.policy?.authentication !== "ON_INSTALL"
    ) {
      errors.push(`Codex ${pluginName} policy must use AVAILABLE and ON_INSTALL`);
    }

    if (codexEntry.category !== "Developer Tools") {
      errors.push(`Codex ${pluginName} category ${codexEntry.category}, expected Developer Tools`);
    }
  }

}

if (errors.length > 0) {
  console.error(`Manifest validation failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Manifest validation passed for ${expectedPluginNames.length} plugins across Claude, OMP, Codex, Grok, and Pi.`,
);
