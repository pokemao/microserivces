import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import devConfig from "./dev";
import prodConfig from "./prod";
import { resolve } from "path";

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"webpack5">(async (merge) => {
  const baseConfig: UserConfigExport<"webpack5"> = {
    projectName: "miniandfeapp",
    date: "2025-2-19",
    alias: {
      "@": resolve(__dirname, "..", "src"),
    },
    // turbo中就算使用npm run build:weapp -- --watch --env-prefix MICRO_APP_，都不能把根目录.env中的环境变量注入到子应用中，所以这里手动注入
    env:{
      // 使用JSON.stringify是为了当process.env.MICRO_APP_POST_PORT为undefined时，注入子项目代码中的MICRO_APP_POST_PORT值为''
      MICRO_APP_POSTS_PORT: JSON.stringify(process.env.MICRO_APP_POSTS_PORT),
      MICRO_APP_COMMENTS_PORT: JSON.stringify(process.env.MICRO_APP_COMMENTS_PORT),
      MICRO_APP_POSTS_URL: JSON.stringify(process.env.MICRO_APP_POSTS_URL),
      MICRO_APP_COMMENTS_URL: JSON.stringify(process.env.MICRO_APP_COMMENTS_URL),
    },
    designWidth(input) {
      let index = -1;
      if (typeof input === "object")
        index = input?.file?.replace(/\\+/g, "/").indexOf("@nutui") ?? -1;
      // 配置 NutUI 375 尺寸
      if (index > -1) {
        return 375;
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750;
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [
      "@tarojs/plugin-html",
      '@tarojs/plugin-http'
    ],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    compiler: {
      type: "webpack5",
      prebundle: {
        exclude: ["@nutui/nutui-react-taro", "@nutui/icons-react-taro"],
      },
    },
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
      },
    },
    h5: {
      esnextModules: ["taro-ui"],
      publicPath: "/",
      staticDirectory: "static",
      output: {
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].js",
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin("tsconfig-paths").use(TsconfigPathsPlugin);
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV;

  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
