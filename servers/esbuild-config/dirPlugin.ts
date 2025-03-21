import { readdirSync } from "node:fs";
import { getDirname } from "./utils.ts";
import { resolve } from "node:path";

export const dirPlugin = {
  name: "dirPlugin",
  setup(build: any) {
    build.onResolve({ filter: /^@microservices\/esbuild-plugin-dir$/ }, (args: { path: any; }) => ({
      path: args.path,
      namespace: 'dir-ns',
    }))

    build.onLoad({ filter: /.*/, namespace: 'dir-ns' }, () => {
      // console.log(arguments);
      return {
      // 读取的是 分包servers下的文件及文件夹的名称
        contents: JSON.stringify(readdirSync("../")),
        loader: 'json',
      }
    })
  }
}
