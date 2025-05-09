{
  mode: 'development',
  context: '/Users/didi/Desktop/microserivces/apps/pwa-vue',
  output: {
    hashFunction: 'xxhash64',
    path: '/Users/didi/Desktop/microserivces/apps/pwa-vue/dist',
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': '/Users/didi/Desktop/microserivces/apps/pwa-vue/src',
      vue$: 'vue/dist/vue.runtime.esm-bundler.js'
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      '/Users/didi/Desktop/microserivces/apps/pwa-vue/node_modules',
      '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+@vue+cli-service@5.0.1_@swc+core@1.3.96_esbuild@0.25.1_less-loader@8.0.0_vue@3.2.13/node_modules/@vue/cli-service/node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+@vue+cli-plugin-typescript@5.0.0_@swc+core@1.3.96_@vue+cli-s_zam26vsr5lnv74hygy7oiufuum/node_modules/@vue/cli-plugin-typescript/node_modules',
      '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+@vue+cli-plugin-babel@5.0.0_@swc+core@1.3.96_@vue+cli-servic_zm7aixapy2ypx4ego4jcf6vlu4/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/didi/Desktop/microserivces/apps/pwa-vue/node_modules',
      '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+@vue+cli-service@5.0.1_@swc+core@1.3.96_esbuild@0.25.1_less-loader@8.0.0_vue@3.2.13/node_modules/@vue/cli-service/node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('esm') */
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        }
      },
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-loader@17.4.2_vue@3.2.13_webpack@5.91.0/node_modules/vue-loader/dist/index.js',
            options: {
              cacheDirectory: '/Users/didi/Desktop/microserivces/apps/pwa-vue/node_modules/.cache/vue-loader',
              cacheIdentifier: '427f9afc',
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ]
            }
          }
        ]
      },
      /* config.module.rule('vue-style') */
      {
        test: /\.vue$/,
        resourceQuery: /type=style/,
        sideEffects: true
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+sass-loader@14.2.1_webpack@5.91.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+sass-loader@14.2.1_webpack@5.91.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+sass-loader@14.2.1_webpack@5.91.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+sass-loader@14.2.1_webpack@5.91.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+sass-loader@14.2.1_webpack@5.91.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+sass-loader@14.2.1_webpack@5.91.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+sass-loader@14.2.1_webpack@5.91.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+sass-loader@14.2.1_webpack@5.91.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+less-loader@8.0.0_less@4.2.0_webpack@5.91.0/node_modules/less-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+less-loader@8.0.0_less@4.2.0_webpack@5.91.0/node_modules/less-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+less-loader@8.0.0_less@4.2.0_webpack@5.91.0/node_modules/less-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+less-loader@8.0.0_less@4.2.0_webpack@5.91.0/node_modules/less-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+stylus-loader@8.1.1_stylus@0.64.0_webpack@5.91.0/node_modules/stylus-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+stylus-loader@8.1.1_stylus@0.64.0_webpack@5.91.0/node_modules/stylus-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+stylus-loader@8.1.1_stylus@0.64.0_webpack@5.91.0/node_modules/stylus-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue-style-loader@4.1.3/node_modules/vue-style-loader/index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0/node_modules/postcss-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: [
                      function () { /* omitted long function */ }
                    ]
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+stylus-loader@8.1.1_stylus@0.64.0_webpack@5.91.0/node_modules/stylus-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+babel-loader@8.4.1_@babel+core@7.26.8_webpack@5.91.0/node_modules/babel-loader/lib/index.js',
            options: {
              cacheCompression: false,
              cacheDirectory: '/Users/didi/Desktop/microserivces/apps/pwa-vue/node_modules/.cache/babel-loader',
              cacheIdentifier: '473e511e'
            }
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+babel-loader@8.4.1_@babel+core@7.26.8_webpack@5.91.0/node_modules/babel-loader/lib/index.js'
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+ts-loader@9.5.2_typescript@4.5.5_webpack@5.91.0/node_modules/ts-loader/index.js',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          /* config.module.rule('tsx').use('babel-loader') */
          {
            loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+babel-loader@8.4.1_@babel+core@7.26.8_webpack@5.91.0/node_modules/babel-loader/lib/index.js'
          },
          /* config.module.rule('tsx').use('ts-loader') */
          {
            loader: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+ts-loader@9.5.2_typescript@4.5.5_webpack@5.91.0/node_modules/ts-loader/index.js',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    realContentHash: false,
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new Plugin(),
    /* config.plugin('feature-flags') */
    new DefinePlugin(
      {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      }
    ),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: '@syz/microservices-pwa-vue',
        scriptLoading: 'defer',
        templateParameters: function () { /* omitted long function */ },
        template: '/Users/didi/Desktop/microserivces/apps/pwa-vue/public/index.html'
      }
    ),
    /* config.plugin('pwa') */
    new HtmlPwaPlugin(
      {
        name: '@syz/microservices-pwa-vue'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      {
        patterns: [
          {
            from: '/Users/didi/Desktop/microserivces/apps/pwa-vue/public',
            to: '/Users/didi/Desktop/microserivces/apps/pwa-vue/dist',
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
              ignore: [
                '**/.DS_Store',
                '/Users/didi/Desktop/microserivces/apps/pwa-vue/public/index.html'
              ]
            },
            info: {
              minimized: true
            }
          }
        ]
      }
    ),
    /* config.plugin('eslint') */
    new ESLintWebpackPlugin(
      {
        extensions: [
          '.js',
          '.jsx',
          '.vue',
          '.ts',
          '.tsx'
        ],
        cwd: '/Users/didi/Desktop/microserivces/apps/pwa-vue',
        cache: true,
        cacheLocation: '/Users/didi/Desktop/microserivces/apps/pwa-vue/node_modules/.cache/eslint/59a5fe4a.json',
        context: '/Users/didi/Desktop/microserivces/apps/pwa-vue',
        failOnWarning: false,
        failOnError: true,
        eslintPath: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+eslint@7.32.0/node_modules/eslint',
        formatter: 'stylish'
      }
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: '/Users/didi/Desktop/microserivces/node_modules/.pnpm/artifactory.intra.xiaojukeji.com+vue@3.2.13/node_modules/vue/compiler-sfc/index.js'
            }
          },
          diagnosticOptions: {
            semantic: true,
            syntactic: false
          }
        }
      }
    )
  ],
  entry: {
    app: [
      './src/main.ts'
    ]
  }
}
