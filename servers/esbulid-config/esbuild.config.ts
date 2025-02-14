#!/usr/bin/env -S pnpm tsx

import esbuild from "esbuild";
import yargs from "yargs";
import { asserts } from "./utils.ts";
import { createDevConfig } from "./esbuild.config.dev.ts";
import { createProConfig } from "./esbuild.config.pro.ts";

const nodeArgv = yargs(process.argv).parse();

const bundle = (argv: typeof nodeArgv):void => {
  const { mode = "" } = argv as any;
  asserts(mode);
  if(mode === "development") {
    const config = createDevConfig();
    const ctx = esbuild.context(config);
    ctx.then(async compiler => {
      await compiler.watch();
    });
  }else {
    const {
      proConfigCJS,
      proConfigESM
    } = createProConfig();
    esbuild.build(proConfigESM).catch(e => {
      console.error(e);
      process.exit(1);
    });
    esbuild.build(proConfigCJS).catch(e => {
      console.error(e);
      process.exit(1);
    });
  }
};

bundle(nodeArgv);