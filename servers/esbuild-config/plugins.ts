import { clearBundle } from "./utils.ts";

export const plugins = [{
  name: "removeBundle",
  setup(build: any) {
    build.onStart(() => {
      const outdir: string = build.initialOptions.outdir!;
      clearBundle(outdir);
    });
  },
}];
