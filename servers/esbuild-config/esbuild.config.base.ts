import esbuild from "esbuild";
import { createRequire } from "node:module";
import path from "node:path";

import { buildPath } from "./utils.ts";
import { envPlugin } from "envPlugins.ts";

// 等同于 commonjs 的 require
const require = createRequire(import.meta.url);
export const createBaseConfig = (argsPath: buildPath): esbuild.BuildOptions => {
  // 形如：/servers/posts/src/index.ts
  // 模式：/servers/**/src/index.ts
  const { inPath } = argsPath;
  return {
    entryPoints: [inPath],
    bundle: true,
    alias: {
      "@": path.resolve(inPath, "../"),
      // # 3. Set the alias to @swc/helpers
      "@swc/helpers": path.dirname(
        require.resolve("@swc/helpers/package.json")
      ),
    },
    resolveExtensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".css",
      ".json",
      ".cjs",
      ".cts",
      ".mjs",
      ".mts",
    ],
    // plugins
    plugins: [envPlugin]
  };
};
