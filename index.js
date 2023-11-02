import { argv, cwd } from 'node:process';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, chmodSync } from 'node:fs';
import { join } from 'node:path';
import BitbucketAPI from './bitbucket.js';

// eslint-disable-next-line no-unused-vars
const [_, __, packageName, packageVersion, repoName, pathToAuthFile, userEmail, baseBranch] = argv;
// TODO: validate params
// TODO: make sure this package exists inside the repo

// TODO: check file exists
const authToken = readFileSync(pathToAuthFile, 'utf-8');
const dirName = randomUUID();
mkdirSync(dirName);
const branchName = `update-${packageName}-to-${packageVersion}-${dirName}`;

const scriptFile = join(cwd(), 'package_updater.sh');
chmodSync(scriptFile, 0o775);
const workDirPath = join(cwd(), dirName);

const bashScript = spawn(`${scriptFile}`, [
  '--USER_EMAIL', `${userEmail}`,
  '--AUTH_TOKEN', `${authToken}`,
  '--REPO_NAME', `${repoName}`,
  '--BASE_BRANCH', `${baseBranch}`,
  '--PACKAGE', `${packageName}@${packageVersion}`,
  '--PR_BRANCH', `${branchName}`,
], { cwd: workDirPath });

bashScript.stdout.on('data', (data) => {
  console.log(String(data));
});

bashScript.stderr.on('data', (data) => {
  console.error(String(data));
});

bashScript.on('close', async (code) => {
  console.log(`child process exited with code ${code}`);
  if (code) {
    process.exit(code);
  }

  const bitbucketAPI = new BitbucketAPI(authToken, repoName);

  try {
    await bitbucketAPI.createPullRequest(branchName, baseBranch, `Update ${packageName} to ${packageVersion}`);
  } catch (err) {
    process.exit(1);
  }

  // TODO: remove folder
});
