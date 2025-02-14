import esbuild from "esbuild";
import path from "node:path";
import { createRequire } from "node:module";

import {getDirname} from "./utils.ts";
// import { plugins} from "./plugins.ts";

// 等同于 commonjs 的 require
const require = createRequire(import.meta.url);
export const createBaseConfig = ():esbuild.BuildOptions => {
  return {
    entryPoints: ["./src/index.ts"],
    bundle: true,
    alias: {
      "@": path.resolve(getDirname(), "../src"),
      // # 3. Set the alias to @swc/helpers
      '@swc/helpers': path.dirname(require.resolve('@swc/helpers/package.json')),
    },
    resolveExtensions: [".tsx",".ts",".jsx",".js",".css",".json", ".cjs", ".cts", ".mjs", ".mts"],
    // plugins
  };
};