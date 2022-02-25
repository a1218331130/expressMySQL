'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
const vueLoaderConfig = require('./vue-loader.conf')
const webpackbar = require('webpackbar')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const DashboardPlugin = require('webpack-dashboard/plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      vue$: 'vue/dist/vue.esm.js',
      '@index': resolve('src/projects/index'),
      '@static': resolve('static'),
      '@projects': resolve('src/projects'),
      '@modularize': resolve('src/modularize')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader?cacheDirectory',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client'), resolve(`node_modules/_gd_vue_components`)],
        // options: {
        //   presets: ['@vue/babel-preset-jsx']
        // }
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ['happypack/loader?id=babel']
      },
      {
        // 全局svg symbol module
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/modularize/icons'), resolve('static/onemap/onemap-static/icons'), resolve('src/projects/wfmng/icons'), resolve('src/wfruntime/icons')]
        // options: {
        //   symbolId: 'icon-[name]'
        // }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/modularize/icons'), resolve('static/onemap/onemap-static/icons'), resolve('src/projects/wfmng/icons'), resolve('src/wfruntime/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    exprContextCritical: false
  },
  plugins: [
    // 缓存插件
    // new HardSourceWebpackPlugin(),
    // // 处理缓存出错，移除mini-css-extract-plugin
    // new HardSourceWebpackPlugin.ExcludeModulePlugin([
    //   {
    //     test: /mini-css-extract-plugin[\\/]dist[\\/]loader/
    //   }
    // ]),
    // new DashboardPlugin(),
    new webpackbar(),
    new VueLoaderPlugin(),
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      // 注意：loaders 是 use 的别名
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@vue/babel-preset-jsx'],
            cacheDirectory: true
          }
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery',
      'window.Quill': 'quill/dist/quill.js',
      Quill: 'quill/dist/quill.js'
    })
  ],
  optimization: {
    minimize: true,
    providedExports: true,
    usedExports: true,
    sideEffects: true,

    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        gdVueComponents: {
          test: /[\\/]gd_vue_components[\\/]/,
          priority: -2,
          name: 'gdVueComponents'
        },
        common: {
          test: /[\\/]element-ui|vue|vuex|vue-router|axios[\\/]/,
          priority: -5,
          name: 'common'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        },
        modularize: {
          test: /[\\/]modularize[\\/]/,
          priority: -15,
          name: 'modularize'
        },
        default: {
          minChunks: 2,
          priority: -100,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [new OptimizeCSSAssetsPlugin()]
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
