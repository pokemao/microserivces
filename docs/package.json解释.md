# package.json解析
## 根目录
```json
{
  "name": "@syz/microservices", // 项目名称，使用@前缀表示是一个monorepo
  "private": true, // 私有项目，不允许发布到npm
  "version": "0.0.0", // 版本号，使用0.0.0表示是一个monorepo还没有完成呢
  "description": "microservices monorepo", // 项目描述
  "author": {
    "name": "pokemao", // 作者名称
    "email": "15222646988@didiglobal.com" // 作者邮箱
  },
  "contributors": [], // 贡献者列表
  "private": true,
  "version": "0.0.0",
  "description": "microservices monorepo",
  "author": {
    "name": "pokemao",
    "email": "15222646988@didiglobal.com"
  },
  "contributors": [],
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "license": "MIT",
  "devDependencies": {
    "turbo": "^2.4.2",
    "typescript": "5.7.3"
  },
  "publishConfig": {
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=18"
  }
}
```
