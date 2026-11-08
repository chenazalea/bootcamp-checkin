// checkin.mjs: now it reports your whole toolchain.
import { execSync } from 'node:child_process';
import os from 'node:os';

// Runs a terminal command and returns what it printed, or null if it failed.
function run(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

const payload = {
  node: process.version,
  git: run('git --version'),
  claude: run('claude --version'),
  repo: run('git remote get-url origin'),
  commit: run('git rev-parse HEAD'),
  machine: {
    os: `${os.type()} ${os.release()} (${os.platform()} ${os.arch()})`,
    cpus: os.cpus().length,
    memoryGb: Math.round((os.totalmem() / 1024 ** 3) * 10) / 10,
  },
};

console.log(JSON.stringify(payload));
