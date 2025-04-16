const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 设置开发服务器的端口号
    port: process.env.MICRO_APP_PWA_VUE_PORT ? process.env.MICRO_APP_PWA_VUE_PORT.slice(1) : 4441,
  },
  chainWebpack: (config) => {
    // 修改成开发模式，这样打包出来的文件才不会被压缩
    config.mode('development');
  },
  pwa: {

  },
});
