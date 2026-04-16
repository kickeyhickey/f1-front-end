import { spawn } from 'child_process';
import { logHeader, logTimestamp } from './pretty-strings.mjs';

logHeader('build');

const deviceId = await getConnectedDeviceID();

await simpleSpawn(`npm run build`);
await simpleSpawn(`npx cap sync`);
await simpleSpawn(`npx cap run ${process.env.DEVICE_TYPE} --target ${deviceId}`);

logTimestamp();

/**
 * Get the `capacitor` `run` `target` id.
 *
 * @return {Promise<string>}
 */
async function getConnectedDeviceID() {
  switch (process.env.DEVICE_TYPE) {
    case 'android':
      return getRegexSimpleSpawnResult({
        cmd: 'adb devices',
        regExp: /^(?<id>\S+)\s+device$/m,
      });

    case 'ios':
      return getRegexSimpleSpawnResult({
        cmd: 'npx cap run ios --list',
        regExp: /^(?!iPad |iPhone ).*\| (?<id>\S{7,})$/m,
      });

    default:
      throw `Unknown device type: "${process.env.DEVICE_TYPE}"`;
  }
}

/**
 *
 * @param {string} command
 * @returns {Promise<string>}
 */
function simpleSpawn(command) {
  return new Promise((resolve) => {
    console.log(`> ${command}`);

    let output = '';

    const pieces = command.split(' ');

    const cmd = spawn(pieces[0], pieces.slice(1));

    cmd.stdout.on('data', (data) => {
      const s = `${data}`.trim();

      // Add it to return string
      output += s;

      console.log(s);
    });

    cmd.stderr.on('data', (data) => {
      console.error(`${data}`.trim());
    });

    cmd.on('close', (code) => {
      if (code !== 0) {
        console.log(`${command} returned error ${code}`);
      }

      resolve(output);
    });
  });
}

/**
 * ### getRegexSimpleSpawnResult
 *
 * - `cmd` <string> The CLI cmd to run.
 * - `regExp` <RegExp> A regular expression to run on the `cmd` result.
 * *It must contain a single named capture group.*
 *
 * Run a CLI **`cmd`** and extract a value based on **`regExp`**.
 *
 * @param {{cmd: string, regExp: RegExp}} config
 * @returns {Promise<string>}
 */
async function getRegexSimpleSpawnResult({ cmd, regExp }) {
  const cliReturn = await simpleSpawn(cmd);

  const match = regExp.exec(cliReturn);

  if (match == null) {
    throw RangeError('No connected device found.');
  }

  // Get the RegExp named group's name.
  const groupNameRegExp = /\(?<(?<name>\S+)>/;
  const regExpString = regExp.toString();

  const groupNameRegExpResult = groupNameRegExp.exec(regExpString);

  if (groupNameRegExpResult == null) {
    throw SyntaxError(`Missing named capture group in "${regExpString}".`);
  }

  console.log(`Retrieving "${groupNameRegExpResult.groups.name}" from command result.`);

  return match.groups[groupNameRegExpResult.groups.name];
}
