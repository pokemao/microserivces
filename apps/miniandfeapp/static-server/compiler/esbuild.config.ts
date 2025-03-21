import esbuild from "esbuild";
import { resolve } from "path";
import { envPlugin } from "./envPlugins.ts";

esbuild.build<esbuild.BuildOptions>({
  entryPoints: [resolve(__dirname, "../src/index.ts")],
  outdir: "./dist/static-server/",
  bundle: true,
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
  plugins: [envPlugin],
  treeShaking: true,
  minify: true,
  // drop: ["console", "debugger"],
  drop: ["debugger"],
  sourcemap: false,
  define: {
    "process.env.NODE_ENV": "'production'",
  },
  target: ["node12"],
  platform: "node",
  format: "cjs",
  outExtension: {
    ".js": ".cjs",
  },
}).catch(() => process.exit(1));
