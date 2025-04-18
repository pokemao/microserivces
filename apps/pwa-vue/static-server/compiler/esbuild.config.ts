// eslint-disable-next-line import/no-extraneous-dependencies
import esbuild from 'esbuild';
import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';

esbuild.build<esbuild.BuildOptions>({
  entryPoints: [resolve(__dirname, '../src/index.ts')],
  outdir: './dist/static-server/',
  bundle: true,
  resolveExtensions: [
    '.tsx',
    '.ts',
    '.jsx',
    '.js',
    '.css',
    '.json',
    '.cjs',
    '.cts',
    '.mjs',
    '.mts',
  ],
  treeShaking: true,
  minify: true,
  // drop: ["console", "debugger"],
  drop: ['debugger'],
  sourcemap: false,
  define: {
    'process.env.NODE_ENV': "'production'",
    'process.env.MICRO_APP_CLIENT_PORT': JSON.stringify(process.env?.MICRO_APP_PWA_VUE_PORT || ':4441'),
  },
  target: ['node12'],
  platform: 'node',
  format: 'cjs',
  outExtension: {
    '.js': '.cjs',
  },
}).catch(() => process.exit(1));
