import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Discover every plugin's skills directory at load time so this file never
// needs editing when plugins are added, renamed, or removed.
const pluginsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../plugins');

const skillsDirs = fs
  .readdirSync(pluginsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(pluginsRoot, entry.name, 'skills'))
  .filter((dir) => fs.existsSync(dir));

export const SkillsPlugin = async () => {
  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      for (const dir of skillsDirs) {
        if (!config.skills.paths.includes(dir)) {
          config.skills.paths.push(dir);
        }
      }
    },
  };
};
