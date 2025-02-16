#!/usr/bin/env -S pnpm tsx

import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import yargs from "yargs";
import { createDevConfig } from "./esbuild.config.dev.ts";
import { createProConfig } from "./esbuild.config.pro.ts";
import { asserts, buildPath, getDirname } from "./utils.ts";

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
  paths.push({
    inPath: path.resolve(fileOrDirPath, "./src"),
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
