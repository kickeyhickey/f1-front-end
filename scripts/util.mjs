import {exec} from 'child_process';

/**
 *
 * @param {string} command
 * @return {Promise<string>}
 */
export async function execTerminalCommand(command) {
  return await new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      console.log(stdout.trim());
      console.error(stderr);
      resolve(stdout.trim());
    });
  });
}
