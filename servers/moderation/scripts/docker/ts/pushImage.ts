import { spawn } from "child_process";

const dockerPushCMD = `docker push ${process.env.MICRO_APP_MODERATION_DOCKER_TAG! + process.env.MICRO_APP_MODERATION_DOCKER_TAG_VERSION!}`;

const child = spawn(dockerPushCMD, {
  shell: true,
  stdio: 'inherit',
})

// child.stdout.pipe(process.stdout);
// child.stderr.pipe(process.stderr);
// process.stdin.pipe(child.stdin);

process.on('SIGINT', () => {
  child.kill('SIGINT');
})

process.on('exit', (code) => {
  console.log(`father process exited with code ${code}`);
})

child.on('exit', (code, signal) => {
  console.log(`child process exited with code ${code} and signal ${signal}`);
  process.exit(code);
})
