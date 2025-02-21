#!/usr/bin/env -S pnpm tsx

import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import yargs from "yargs";
import { createDevConfig } from "./esbuild.config.dev.ts";
import { createProConfig } from "./esbuild.config.pro.ts";
import { asserts, buildPath, getDirname } from "./utils.ts";
import 'dotenv/config'

// 获取命令行传入的参数
const nodeArgv = yargs(process.argv).parse();

// 获取现在文件夹下有哪些文件夹
const blackTable = ["esbuild-config"];
const paths: buildPath[] = [];
for (const dir of fs.readdirSync("../")) {
  if (blackTable.indexOf(dir) !== -1) continue;
  const fileOrDirPath = path.resolve(getDirname(), "../", dir);
  const stat = fs.statSync(fileOrDirPath);
  if (!stat.isDirectory()) {
    continue;
  }
  // 现在fileOrDirPath肯定就是文件夹了
  // 检查文件夹下是否有src文件夹
  const inPath = path.resolve(fileOrDirPath, "./src/");
  const exits = fs.existsSync(inPath);
  if (!exits) continue;

  // 判断inPath是否是个文件夹，文件夹下是否有index.ts文件
  const inPathStat = fs.statSync(inPath);
  if (!inPathStat.isDirectory()) continue;
  const indexPath = path.resolve(inPath, "./index.ts");
  const indexExits = fs.existsSync(indexPath);
  if (!indexExits) continue;

  paths.push({
    inPath: indexPath,
    outPath: path.resolve(fileOrDirPath, "./dist"),
  });
}

const bundle = (argv: typeof nodeArgv, paths: buildPath[]): void => {
  const { mode = "" } = argv as any;
  asserts(mode);
  if (mode === "development") {
    for (const path of paths) {
      const config = createDevConfig(path);
      const ctx = esbuild.context(config);
      ctx.then(async (compiler) => {
        await compiler.watch();
      });
    }
  } else {
    for (const path of paths) {
      const { proConfigCJS, proConfigESM } = createProConfig(path);
      esbuild.build(proConfigESM).catch((e) => {
        console.error(e);
        process.exit(1);
      });
      esbuild.build(proConfigCJS).catch((e) => {
        console.error(e);
        process.exit(1);
      });
    }
  }
};

bundle(nodeArgv, paths);
