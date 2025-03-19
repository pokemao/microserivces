import { spawn } from 'node:child_process';

// cwd是当前工作目录，也就是package.json的目录
// 所以下面使用 . , 因为Dockerfile在package.json的目录下

const dockerBuildCMD = `docker build -t ${process.env.MICRO_APP_POSTS_DOCKER_TAG! + process.env.MICRO_APP_POSTS_DOCKER_TAG_VERSION!} .`;

const child = spawn(dockerBuildCMD, {
  shell: true,
  stdio: 'inherit',
})

process.on('SIGINT', () => {
  if(!child.pid) return;
  process.kill(child.pid, 'SIGINT');
})

process.on('exit', (code) => {
  console.log(`father process exited with code ${code}`);
})

child.on('exit', (code, signal) => {
  console.log(`child process exited with code ${code} and signal ${signal}`);
  process.exit(code);
})
