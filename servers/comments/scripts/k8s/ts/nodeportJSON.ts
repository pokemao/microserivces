export default {
  "apiVersion": "v1",
  "kind": "Service",
  "metadata": {
    "name": process.env.MICRO_APP_COMMENTS_NODE_PORT_NAME!,
  },
  "spec": {
    "type": "NodePort",
    "selector": {
      [process.env.MICRO_APP_LABEL_KEY1!]: process.env.MICRO_APP_COMMENTS_LABEL_VALUE1!,
    },
    "ports": [
      {
        "name": "comments",
        "protocol": "TCP",
        "port": +process.env.MICRO_APP_COMMENTS_PORT!.slice(1),
        "targetPort": +process.env.MICRO_APP_COMMENTS_PORT!.slice(1),
      }
    ]
  }
}
