import esbuild from "esbuild";
import { es5Plugin } from "esbuild-plugin-es5";
import path from "path";
import { createBaseConfig } from "./esbuild.config.base.ts";
import { buildPath } from "./utils.ts";
// import {plugins} from "./plugins.ts";

export const createProConfig = (
  argvPath: buildPath
): {
  proConfigESM: esbuild.BuildOptions;
  proConfigCJS: esbuild.BuildOptions;
} => {
  const baseConfig: esbuild.BuildOptions = createBaseConfig(argvPath);
  const { outPath } = argvPath;
  const proConfig: esbuild.BuildOptions = {
    treeShaking: true,
    minify: true,
    drop: ["console", "debugger"],
    sourcemap: false,
    define: {
      "process.env.NODE_ENV": "'production'",
    },
    plugins: [es5Plugin()],
    target: ["node12"],
    platform: "node",
  };
  const proConfigESM: esbuild.BuildOptions = {
    outdir: path.resolve(outPath, "./esm"),
    splitting: true,
    format: "esm",
    outExtension: {
      ".js": ".mjs",
    },
  };
  const proConfigCJS: esbuild.BuildOptions = {
    outdir: path.resolve(outPath, "./cjs"),
    format: "cjs",
    outExtension: {
      ".js": ".cjs",
    },
    plugins: [es5Plugin()],
  };
  return {
    proConfigESM: Object.assign({}, baseConfig, proConfig, proConfigESM),
    proConfigCJS: Object.assign({}, baseConfig, proConfig, proConfigCJS),
  };
};
