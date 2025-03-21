export default {
  "apiVersion": "v1",
  "kind": "Service",
  "metadata": {
    "name": process.env.MICRO_APP_CLIENT_INNER_HOST!,
  },
  "spec": {
    "type": "ClusterIP",
    "selector": {
      [process.env.MICRO_APP_LABEL_KEY1!]: process.env.MICRO_APP_CLIENT_LABEL_VALUE1!,
    },
    "ports": [
      {
        "name": "client",
        "protocol": "TCP",
        "port": +process.env.MICRO_APP_CLIENT_PORT!.slice(1),
        "targetPort": +process.env.MICRO_APP_CLIENT_PORT!.slice(1),
      }
    ]
  }
}
