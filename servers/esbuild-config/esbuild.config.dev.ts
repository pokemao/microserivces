import esbuild from "esbuild";
import { es5Plugin } from "esbuild-plugin-es5";
import path from "path";
import { createBaseConfig } from "./esbuild.config.base.ts";
import { buildPath } from "./utils.ts";

export const createDevConfig = (argPath: buildPath): esbuild.BuildOptions => {
  const baseConfig: esbuild.BuildOptions = createBaseConfig(argPath);
  // 形如：/servers/posts/src/
  // 模式：/servers/**/src/
  const { outPath } = argPath;
  const devConfig: esbuild.BuildOptions = {
    outdir: path.resolve(outPath, "./cjs/"),
    sourcemap: "both",
    format: "cjs",
    define: {
      "process.env.NODE_ENV": "'development'",
    },
    outExtension: {
      ".js": ".cjs",
    },
    // plugins: [es5Plugin()],
    target: ["node12"],
    platform: "node",
  };
  return Object.assign({}, baseConfig, devConfig);
};

// import("bbb")
