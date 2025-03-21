export default {
  apiVersion: "networking.k8s.io/v1",
  kind: "Ingress",
  metadata: {
    name: process.env.MICRO_APP_INGRESS_NAME,
    annotations: {
      "nginx.ingress.kubernetes.io/use-regex": "true",
    },
  },
  spec: {
    ingressClassName: "nginx",
    rules: [
      {
        host: process.env.MICRO_APP_HOST,
        http: {
          paths: [
            // 外界不允许访问events服务！！！！！
            // {
            //   path: "/events",
            //   pathType: "Prefix",
            //   backend: {
            //     service: {
            //       name: process.env.MICRO_APP_EVENT_BUS_INNER_HOST!,
            //       port: {
            //         number: +process.env.MICRO_APP_EVENT_BUS_PORT!.slice(1),
            //       },
            //     },
            //   },
            // }
            {
              path: "/posts",
              pathType: "Prefix",
              backend: {
                service: {
                  name: process.env.MICRO_APP_POSTS_INNER_HOST!,
                  port: {
                    number: +process.env.MICRO_APP_POSTS_PORT!.slice(1),
                  },
                },
              },
            },
            {
              path: "/query",
              pathType: "Prefix",
              backend: {
                service: {
                  name: process.env.MICRO_APP_QUERY_INNER_HOST!,
                  port: {
                    number: +process.env.MICRO_APP_QUERY_PORT!.slice(1),
                  },
                },
              },
            },
            {
              path: "/posts/(.*)/comments",
              pathType: "ImplementationSpecific",
              backend: {
                service: {
                  name: process.env.MICRO_APP_COMMENTS_INNER_HOST!,
                  port: {
                    number: +process.env.MICRO_APP_COMMENTS_PORT!.slice(1),
                  },
                },
              },
            },
            // path的匹配方式类似switch，从上到下有限匹配最前面的
            // "/?(.*)"相当于default，是一个兜底的匹配
            {
              path: "/?(.*)",
              pathType: "ImplementationSpecific",
              backend: {
                service: {
                  name: process.env.MICRO_APP_CLIENT_INNER_HOST!,
                  port: {
                    number: +process.env.MICRO_APP_CLIENT_PORT!.slice(1),
                  },
                },
              },
            }
          ],
        },
      },
    ],
  },
};
