export default {
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": process.env.MICRO_APP_QUERY_DEPLOYMENT_NAME!,
  },
  "spec": {
    "replicas": 1,
    // 这是 Deployment 用来选择要管理的 Pod 的标签。Deployment 会持续监控所有携带 app: posts 标签的 Pod，确保它们的数量与 replicas 定义的一致（例如，始终保持 1 个运行中的 Pod）。
    // ​作用：告诉 Kubernetes：“所有带有 app: posts 标签的 Pod 都归我管！”
    "selector": {
      "matchLabels": {
        [process.env.MICRO_APP_LABEL_KEY1!]: process.env.MICRO_APP_QUERY_LABEL_VALUE1!,
      }
    },
    // 这是为 Pod ​设置标签。所有通过该 Deployment 创建的 Pod 都会自动打上 app: posts 标签。
    // ​作用：定义 Pod 的“身份标识”，类似于给 Pod 贴上一个名字，方便其他组件（如 Service）通过标签找到这些 Pod
    "template": {
      "metadata": {
        "labels": {
          [process.env.MICRO_APP_LABEL_KEY1!]: process.env.MICRO_APP_QUERY_LABEL_VALUE1!,
        }
      },
      "spec": {
        "containers": [
          {
            "name": process.env.MICRO_APP_QUERY_CONTAINER_NAME!,
            "image": process.env.MICRO_APP_QUERY_DOCKER_TAG! + process.env.MICRO_APP_QUERY_DOCKER_TAG_VERSION!,
          }
        ]
      }
    }
  }
}
