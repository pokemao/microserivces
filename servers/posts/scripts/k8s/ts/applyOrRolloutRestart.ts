import { ChildProcess, spawn } from 'child_process'
import { default as ApiClient } from 'kubernetes-client'
import { readdir } from 'node:fs/promises'
import { to } from '../../../../common/src';

// 使用的 k8s api 的版本 1.13
const Client = ApiClient.Client1_13
const client = new Client({ version: '1.13' })

const childs: ChildProcess[] = []

const rolloutRestartOrApply = async () => {
  // 获取k8s中所有的namespace
  // const namespaces = await client.api.v1.namespaces.get()
  // console.log('Namespaces: ', namespaces.body.items)

  // ./k8s-yaml目录下的所有文件名
  const applyList: string[] = []
  const bingfa = Promise.all([readdir('./k8s-yaml'), client.apis.apps.v1.namespaces('default').deployments.get()])
  // 获取k8s中default命名空间中所有的deployment
  const [err, data] = await to(bingfa)
  if (err) {
    console.log(err)
    process.exit(1)
  }
  const [files, deploymentsConfig] = data

  // 寻找是否存在名为posts-deployment的deployment
  const index = deploymentsConfig.body.items.findIndex((item: any) => item.metadata.name === process.env.MICRO_APP_POSTS_DEPLOYMENT_NAME)
  // 如果存在，删除files中的deployment.yaml文件名并执行rollout restart命令
  if (index !== -1) {
    const child = spawn(`kubectl rollout restart deployment ${process.env.MICRO_APP_POSTS_DEPLOYMENT_NAME}`, {
      shell: true,
      stdio: 'inherit',
    })
    childs.push(child)

    child.on('exit', (code, signal) => {
      console.log(`child process exited with code ${code} and signal ${signal}`);
      if (code !== 0) {
        process.exit(code);
      }
    })

    const index = files.findIndex((file) => file === 'deployment.yaml')
    if (index !== -1) {
      files.splice(index, 1)
    }
  }
  // 对剩下的文件名进行apply操作
  for (const file of files) {
    const child = spawn(`kubectl apply -f ./k8s-yaml/${file}`, {
      shell: true,
      stdio: 'inherit',
    })
    childs.push(child)
    child.on('exit', (code, signal) => {
      console.log(`child process exited with code ${code} and signal ${signal}`);
      if (code!== 0) {
        process.exit(code);
      }
    })
  }
}

process.on('SIGINT', () => {
  for (const child of childs) {
    if (!child.pid) continue;
    process.kill(child.pid, 'SIGINT');
  }
})

process.on('exit', (code) => {
  console.log(`father process exited with code ${code}`);
})

rolloutRestartOrApply()
