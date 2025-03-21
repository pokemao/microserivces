export default {
  "apiVersion": "v1",
  "kind": "Service",
  "metadata": {
    "name": process.env.MICRO_APP_POSTS_INNER_HOST!,
  },
  "spec": {
    "type": "ClusterIP",
    "selector": {
      [process.env.MICRO_APP_LABEL_KEY1!]: process.env.MICRO_APP_POSTS_LABEL_VALUE1!,
    },
    "ports": [
      {
        "name": "posts",
        "protocol": "TCP",
        "port": +process.env.MICRO_APP_POSTS_PORT!.slice(1),
        "targetPort": +process.env.MICRO_APP_POSTS_PORT!.slice(1),
      }
    ]
  }
}
