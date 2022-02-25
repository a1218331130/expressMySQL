'use strict'
const config = require('../coder/config')

module.exports = {
  dev: {
    // 开发时启动的模块
    devModules: config.devModules,
    assetsSubDirectory: config.assetsSubDirectory,
    assetsPublicPath: config.assetsPublicPath_dev,
    // 入口文件
    entriesList: config.entriesList,
    // 设置入口页面
    setEnterPageMethod: config.setEnterPageMethod,
    host: '0.0.0.0',
    port: 8091,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false,
    useEslint: false,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-cheap-module-source-map',
    cacheBusting: true,
    cssSourceMap: true,
    proxyTable: {
      '/blogApi/*': {
        target: 'http://localhost:3000'
      }
    }
  },
  build: {
    buildModules: config.buildModules,
    assetsRoot: config.assetsRoot,
    assetsSubDirectory: config.assetsSubDirectory,
    assetsPublicPath: config.assetsPublicPath_build,
    prod: config.prod_env,
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: false,
    generateAnalyzerReport: true
  }
}
