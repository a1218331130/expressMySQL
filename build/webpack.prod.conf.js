'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const rm = require('rimraf')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

// const smp = new SpeedMeasurePlugin()
const seen = new Set()
const nameLength = 4
const env = require('../config/prod.env')
/**
 * 构建webpack配置
 * @param {String} moduleName 模块名
 */
function buildWebpackConfig(moduleName) {
  console.log(config.build.prod_env, 'config.build.prod_env')
  //入口js
  let entry = {}
  entry[moduleName] = './src/projects/' + moduleName + '/main.js'
  console.log(entry, 'devModulesdevModules')

  const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    //设置入口
    entry: entry,
    output: {
      path: path.resolve(__dirname, config.build.assetsRoot + (moduleName == 'index' ? '' : '/' + moduleName)),
      filename: utils.assetsPath('js/[name].[contenthash:8].js'),
      chunkFilename: utils.assetsPath('js/[id].[contenthash:8].js'),
      publicPath: config.build.assetsPublicPath + (moduleName == 'index' ? '' : moduleName + '/')
    },
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': env
      }),
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].[contenthash:8].css'),
        chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../dist/' + (moduleName == 'index' ? 'index.html' : moduleName + '/index.html')),
        template: 'src/projects/' + moduleName + '/index.html',
        inject: true,
        favicon: resolve('favicon.ico'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: /runtime\..*\.js$/
      }),
      new webpack.NamedChunksPlugin(chunk => {
        if (chunk.name) {
          return chunk.name
        }
        const modules = Array.from(chunk.modulesIterable)
        if (modules.length > 1) {
          const hash = require('hash-sum')
          const joinedHash = hash(modules.map(m => m.id).join('_'))
          let len = nameLength
          while (seen.has(joinedHash.substr(0, len))) len++
          seen.add(joinedHash.substr(0, len))
          return `chunk-${joinedHash.substr(0, len)}`
        } else {
          return modules[0].id
        }
      }),
      new webpack.HashedModuleIdsPlugin()
      // new CopyWebpackPlugin([
      //   {
      //     from: moduleName === 'index' ? path.resolve(__dirname, '../static/index/index_dir') : path.resolve(__dirname, '../static/' + moduleName),
      //     to: config.build.assetsSubDirectory,
      //     ignore: ['.*']
      //   }
      // ])
    ]
  })
  if (config.build.productionGzip) {
    webpackConfig.plugins.push(
      new CompressionPlugin({
        minRatio: 0.8
      })
    )
  }

  if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

    if (config.build.bundleAnalyzerReport) {
      webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }

    if (config.build.generateAnalyzerReport) {
      webpackConfig.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'bundle-report.html',
          openAnalyzer: false
        })
      )
    }
  }

  return webpackConfig
}
// smp.wrap(buildWebpackConfig)
module.exports = buildWebpackConfig
