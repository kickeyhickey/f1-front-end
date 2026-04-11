import { logHeader } from "./pretty-strings.mjs";
import { execTerminalCommand } from "./util.mjs";

/**
 * Needed for building changelog.pdf
 * @returns {Promise<void>}
 */
async function installChrome() {
  console.log(`Installing chrome`);

  await execTerminalCommand("npx puppeteer browsers install chrome");
}

logHeader("install-deps.mjs");
await installChrome();
