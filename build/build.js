'use strict'
require('./check-versions')()
var fs = require('fs')
// const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const buildWebpackConfig = require('./webpack.prod.conf')
const copy = require('copy-concurrently')
const fileProdName = require('../coder/config')
//生产打包模块
const buildModules = config.build.buildModules
// const spinner = ora('building for production...\n')
// spinner.start()
rm.sync(path.resolve(__dirname, '../dist'))
buildModules.forEach(function (moduleName) {
  const configDir = moduleName === 'index' ? path.resolve(__dirname, '../dist/static/config.json') : path.resolve(__dirname, `../dist/${moduleName}/static/config.json`)
  const sysDir = moduleName === 'index' ? path.resolve(__dirname, '../dist/static/' + moduleName) : path.resolve(__dirname, `../dist/${moduleName}/static/` + moduleName)
  // copy(path.resolve(__dirname, '../static/config.json'), configDir)
  // fs.copyFileSync(path.resolve(__dirname, '../static/config.json'), configDir)
  rm(path.join(config.build.assetsRoot, moduleName), (err) => {
    if (err) throw err
    let webpackConfig = buildWebpackConfig(moduleName)
    webpack(webpackConfig, (err, stats) => {
      // spinner.stop()
      if (err) throw err
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      )

      if (stats.hasErrors()) {
        console.log(chalk.red(moduleName + ' 构建出错.\n\n'))
        process.exit(1)
      }
      if (configDir) {
        fs.writeFileSync(configDir, fs.readFileSync(path.resolve(__dirname, '../static/config.json')))
      }
      // 打包时间
      const times = stats.endTime - stats.startTime
      const minute = Math.floor(times / 1000 / 60)
      const second = Math.floor(times / 1000 - minute * 60)
      console.log('the build time:\n' + minute + ' minute , ' + second + ' second \n')
      console.log(chalk.cyan(moduleName + ' 构建完成.\n\n'))
    })
  })
  // fs.mkdirSync(path.resolve(__dirname, '../gdbpm/static/' + moduleName))
  // if (moduleName === 'wfmng') {
  //   copy(path.resolve(__dirname, '../static/wfmng'), path.resolve(__dirname, `../dist/static/wfmng`))
  // } else {
  //   copy(path.resolve(__dirname, '../static/' + moduleName), sysDir)
  // }
  copy(path.resolve(__dirname, '../static/' + moduleName), sysDir)
})
// 打包插件
const libDir = path.resolve(__dirname, '../dist/libs')
const commonDir = path.resolve(__dirname, '../dist/common')
copy(path.resolve(__dirname, '../static/libs'), libDir)
copy(path.resolve(__dirname, '../static/common'), commonDir)
