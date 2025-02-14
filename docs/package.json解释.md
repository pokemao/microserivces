# package.json解析
## 根目录
**根目录的包是不能发布的，只有子目录是可以发布的**
```json
{
  "name": "@syz/microservices", // 项目名称，使用@前缀表示是一个monorepo
  "private": true, // 私有项目，不允许发布到npm
  "version": "0.0.0", // 版本号，使用0.0.0表示是一个monorepo还没有完成呢
  "description": "microservices monorepo", // 项目描述
  "author": {
    "name": "pokemao", // 作者名称
    "email": "15222646988@didiglobal.com", // 作者邮箱
    "url": "https://syz.com" // 作者个人网站
  },
  "contributors": [
    {
      "name": "Alice", // 贡献者名称
      "email": "alice@example.com", // 贡献者邮箱
      "url": "https://alice-personal-site.com" // 贡献者个人网站
    },
  ], // 贡献者列表
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\""
  },
  "license": "MIT", // 许可证
  "devDependencies": {
    "turbo": "^2.4.2",
    "typescript": "5.7.3"
  },
  // 发布配置
  "publishConfig": {
    "registry": "http://npm.intra.xiaojukeji.com/", // 用户使用npm publish的时候会把这个包，发布到内网npm
    // "access": "public" // 发布到npm的public仓库
    // "access": "restricted" // 发布到npm的public仓库
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=18"
  }
}
```
`private`和`publishConfig->access`的区别
1. `private`表示这个项目是私有的，不允许发布到npm，当`private`为`true`的时候，`npm publish`的时候不会把这个包发不到npm上
2. `publishConfig`表示发布到npm的配置，`registry`表示发布到npm的仓库，用户使用npm publish的时候会把这个包，发布到`registry`指定的npm仓库，`access`表示发布到npm的访问权限，`public`表示发布到npm的public仓库，`restricted`表示发布到npm的restricted仓库，普通用户只能访问public仓库，管理员可以访问restricted仓库
总结，当`private`为`true`的时候，`publishConfig->access`会被忽略，当`private`为`false`的时候，`publishConfig->access`会生效，`publishConfig->access`的优先级高于`private`

## `packages`包中的子包`typescript-config`
```json
{
  "name": "@didi/fusion-mpx-typescript-config",
  "version": "0.0.0",
  "private": true,
  "author": {
    "name": "shaoyuzhe",
    "email": "shaoyuzhe@didiglobal.com"
  },
  "contributors": [],
  "license": "MIT"
}
```
