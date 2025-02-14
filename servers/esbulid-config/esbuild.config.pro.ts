import esbuild from "esbuild";
import { createBaseConfig } from "./esbuild.config.base.ts";
import { es5Plugin } from 'esbuild-plugin-es5';
// import {plugins} from "./plugins.ts";

export const createProConfig = (): {
  proConfigESM: esbuild.BuildOptions,
  proConfigCJS: esbuild.BuildOptions
} => {
  const baseConfig:esbuild.BuildOptions = createBaseConfig();
  const proConfig:esbuild.BuildOptions = {
    treeShaking: true,
    minify: true,
    drop: ["console", "debugger"],
    sourcemap: false,
    define: {
      "process.env.NODE_ENV": "'production'"
    },
    plugins: [
      es5Plugin()
    ],
    target: ['es5'],
  };
  const proConfigESM:esbuild.BuildOptions = {
    outdir: "dist/esm",
    splitting: true,
    format: "esm",
    outExtension: {
      ".js": ".mjs"
    },

  };
  const proConfigCJS:esbuild.BuildOptions = {
    outdir: "dist/cjs",
    format: "cjs",
    outExtension: {
      ".js": ".cjs"
    },
    plugins: [
      es5Plugin()
    ]
  };
  return {
    proConfigESM: Object.assign({}, baseConfig, proConfig, proConfigESM),
    proConfigCJS: Object.assign({}, baseConfig, proConfig, proConfigCJS)
  };
};