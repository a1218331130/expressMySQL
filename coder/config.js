/**
 * 工程配置
 */
const path = require('path')
const sysObj = require('./commonJs/setSysName')
const entriesObj = require('./commonJs/entries')
const project_name = require('./projectName.json')
const systemName = project_name.name
const config = {
  // 开发运行模式启动的模块
  devModules: sysObj.sysModuleArr,
  // 需要打包的模块
  buildModules: sysObj.buildModules,
  // 静态文件路径
  assetsSubDirectory: 'static',
  // 开发根目录
  assetsPublicPath_dev: '/',
  // 打包根目录
  assetsPublicPath_build: `/${systemName}/`,
  // 产品目录
  assetsPublicPath_proc: `/${systemName}`,
  // 线上使用路径
  prodPath: '"' + systemName + '"',
  // 打包路径
  assetsRoot: path.resolve(__dirname, '../dist'),
  // 入口文件
  entriesList: entriesObj.entries,
  // 设置入口页面
  setEnterPageMethod: entriesObj.setEnterPage
}

module.exports = config
