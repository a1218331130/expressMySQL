const commander = require('commander')
const path = require('path')
const rm = require('rimraf')
const utils = require('./utils')
commander.option('-f, --force', '清除目录再创建').parse(process.argv)
var outPath = path.join(__dirname, '../src/projects/')
var staticPath = path.join(__dirname, '../static/')
const sysName = commander.args[0]
rmDir(outPath + sysName, staticPath + sysName)

/**
 * 删除文件和文件夹
 * @param path
 */
function rmDir(path, path_static) {
  rm.sync(path)
  rm.sync(path_static)
  setTimeout(() => {
    setSystem()
  }, 1000)
}
function setSystem() {
  var rootSystem = path.join(__dirname, '../src/projects')
  var systemFile = path.join(__dirname, '../coder/system.json')
  var fs = require('fs')
  // 获取所有的子系统名称
  const filesSystem = fs.readdirSync(rootSystem)
  const setSysMethod = require('./setSystemConfig')
  const systemList = require('./system.json')
  setSysMethod.setSysName(systemList, filesSystem, systemFile)
  setSysMethod.insertCommander(systemList)
}
