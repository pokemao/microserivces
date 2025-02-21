```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "globalDependencies": [".env"], // 这个文件变化的时候所有任务的cache失效，这个文件既包括根目录的.env也包括子包的.env
  "globalEnv": ["POST_PORT"], // 在这里写上需要注入到子包中的环境变量，如果不写，默认会注入子包中，就算.env中有POST_PORT这个也不会注入
  "tasks": {
    "serve": {
      "dependsOn": [],
      "cache": false,
      "inputs": [".env.development"] // 这个文件变化的时候这个任务的cache失效，这个文件既包括根目录的.env.development也包括子包的.env.development
    },
    "build": {
      "cache": false
    }
  }
}
```
