import { logHeader } from "./pretty-strings.mjs";
import { promises as fsPromises } from "fs";
import appRoot from "app-root-path";
import * as path from "path";

async function removeBuildDir() {
  console.log(`Deleting the build directory.`);

  const buildDirPath = path.join(appRoot.path, "build");
  await fsPromises.rm(buildDirPath, {
    force: true,
    recursive: true,
  });
}

async function removeNodeModulesDir() {
  console.log(`Deleting the node_modules directory.`);

  const buildDirPath = path.join(appRoot.path, "node_modules");
  await fsPromises.rm(buildDirPath, {
    force: true,
    recursive: true,
  });
}

logHeader("project-init.mjs");
await removeBuildDir();
await removeNodeModulesDir();
