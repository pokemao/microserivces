import { spawn } from "child_process";
import fs from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const blackList = [
  'index.ts',
  'utils.ts'
]

const commands = fs.readdirSync(resolve(__dirname)).map((file) => {
  if (!blackList.includes(file)) {
    return `tsx ${resolve(__dirname, file)}`
  }
})

const childs: any = []

for (const command of commands) {
  if (!command) {
    continue;
  }
  const child = spawn(command, {
    shell: true,
    stdio: 'inherit',
  })

  child.on('exit', (code, signal) => {
    console.log(`child process exited with code ${code} and signal ${signal}`);
    if (code !== 0) {
      process.exit(code);
    }
  })

  childs.push(child)
}

process.on('SIGINT', () => {
  for (const child of childs) {
    child.kill('SIGINT');
  }
})

process.on('exit', (code) => {
  if (code === 0) {
    console.log('All child processes exited successfully');
  }
  console.log(`father process exited with code ${code}`);
})
