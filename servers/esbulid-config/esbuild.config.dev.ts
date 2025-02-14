import esbuild from "esbuild";
import { createBaseConfig } from "./esbuild.config.base.ts";
import { es5Plugin } from 'esbuild-plugin-es5';

export const createDevConfig = ():esbuild.BuildOptions => {
  const baseConfig:esbuild.BuildOptions = createBaseConfig();
  const devConfig:esbuild.BuildOptions = {
    outdir: "dist/esm",
    sourcemap: "both",
    format: "esm",
    splitting: true,
    define: {
      "process.env.NODE_ENV": "'development'",
    },
    outExtension: {
      ".js": ".mjs"
    },
    plugins: [
      es5Plugin()
    ],
    target: ['es5'],
  };
  return Object.assign({}, baseConfig, devConfig);
};

// import("bbb")