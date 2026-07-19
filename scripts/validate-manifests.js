import { readFileSync } from "node:fs";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const rootManifest = readJson("package.json");
const marketplaces = [
  ["Claude", readJson(".claude-plugin/marketplace.json")],
  ["OMP", readJson(".omp-plugin/marketplace.json")],
];
const errors = [];

for (const [marketplaceName, marketplace] of marketplaces) {
  if (marketplace.metadata.version !== rootManifest.version) {
    errors.push(
      `${marketplaceName} marketplace version ${marketplace.metadata.version} does not match package.json ${rootManifest.version}`,
    );
  }
}

const pluginNames = new Set(marketplaces.flatMap(([, marketplace]) => marketplace.plugins.map(({ name }) => name)));

for (const pluginName of pluginNames) {
  const manifestPath = `plugins/${pluginName}/plugin.json`;
  let manifest;

  try {
    manifest = readJson(manifestPath);
  } catch (error) {
    errors.push(`Cannot read ${manifestPath}: ${error.message}`);
    continue;
  }

  if (manifest.name !== pluginName) {
    errors.push(`${manifestPath} is named ${manifest.name}, expected ${pluginName}`);
  }

  for (const [marketplaceName, marketplace] of marketplaces) {
    const entries = marketplace.plugins.filter(({ name }) => name === pluginName);

    if (entries.length !== 1) {
      errors.push(`${marketplaceName} marketplace has ${entries.length} entries for ${pluginName}, expected 1`);
      continue;
    }

    const [entry] = entries;
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
}

if (errors.length > 0) {
  console.error(`Manifest validation failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Manifest validation passed for ${pluginNames.size} plugins.`);
