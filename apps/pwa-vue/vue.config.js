const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');
const aaa = require('esbuild-loader');
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const MICRO_APP_PWA_VUE_PORT = process.env.MICRO_APP_PWA_VUE_PORT ? process.env.MICRO_APP_PWA_VUE_PORT : ':4441';
const port = MICRO_APP_PWA_VUE_PORT.slice(1);

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {

    },
  },
  devServer: {
    // 设置开发服务器的端口号
    port,
  },
  configureWebpack: {
    // target: 'node',
    // 排除 node_modules 中的依赖
    // externals: [
    //   nodeExternals({
    //     allowlist: [/^esbuild/],
    //   }),
    // ],
    // output: {
    //   // library: {
    //   //   type: 'self', name: 'MyLibrary',
    //   // },
    //   iife: true,
    // },
    // externals: [nodeExternals({ allowlist: [/^esbuild/] })],
  },
  chainWebpack: (config) => {
    // if (process.env.NODE_ENV === 'production') {
    // // 修改成开发模式，这样打包出来的文件才不会被压缩
    config.mode('development');

    // // 默认入口 src/main.ts 使用 Babel（Vue CLI 默认已配置，确保无冲突）

    // // 添加新入口 static-server/index.ts
    // config.entry('static-server')
    //   .add(resolve(__dirname, './static-server/index.ts'))
    //   .end();

    // // 针对 static-server 目录使用 esbuild-loader
    // config.module.rule('esbuild')
    //   .test(/\.ts$/)
    //   .include.add(resolve(__dirname, 'static-server')).end()
    // // 在 babel-loader 之后插入调试 loader
    //   .use('debug-loader')
    //   .loader(resolve(__dirname, './loader/debug-loader.js'))
    //   .options({
    //     outputPath: resolve(__dirname, './loader-debug'), // 自定义输出目录
    //   })
    //   .end()
    //   .use('esbuild-loader')
    //   .loader('esbuild-loader')
    //   .options({
    //     // bundle: true,
    //     // treeShaking: true,
    //     // minify: true,
    //     define: {
    //       'process.env.MICRO_APP_CLIENT_PORT': JSON.stringify(MICRO_APP_PWA_VUE_PORT),
    //     },
    //     // external: ['express'],
    //     // packages: 'external',
    //     // target: ['node12'],
    //     // platform: 'web',
    //     drop: ['debugger'],
    //   })
    //   .tap((options) => /** 原有 babel 配置 */ options)
    //   .end();

    // // 确保默认的 Babel 规则排除 static-server 目录
    // config.module.rule('ts')
    //   .exclude.add(resolve(__dirname, 'static-server'));
    // }
  },
  pwa: {},
});
