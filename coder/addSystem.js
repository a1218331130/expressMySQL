const commander = require('commander')
const utils = require('./utils')
const path = require('path')
const fs = require('fs')
const copy = require('copy-concurrently')
const rm = require('rimraf')
commander.option('-f, --force', '清除目录再创建').parse(process.argv)
var outPathApp = path.join(__dirname, './templates/app')
var outPath = path.join(__dirname, '../src/projects/')
var staticPath = path.join(__dirname, '../static/')
// const setSysMethod = require('./setSystemConfig')
const sysName = commander.args[0]
// 添加纯净版页面
addSystem(outPath, sysName)
// 设置对应的子系统静态文件夹
addStatic(staticPath, sysName)

function addSystem(url, name) {
  if (!fs.existsSync(url + name)) {
    fs.mkdirSync(url + name)
  }
  copyDir(outPathApp, url + name)
  setTimeout(() => {
    setSystem()
  }, 1000)
}

/**
 * 复制文文件夹和文件
 * @param from
 * @param to
 */
function copyDir(from, to) {
  if (fs.existsSync(to)) {
    rmDir(to)
  }
  return copy(from, to)
}
/**
 * 删除文件和文件夹
 * @param path
 */
function rmDir(path) {
  rm.sync(path)
}
// 添加静态文件夹
function addStatic(url, name) {
  if (!fs.existsSync(url + name)) {
    fs.mkdirSync(url + name)
  }
}

function setSystem() {
  var rootSystem = path.join(__dirname, '../src/projects')
  var systemFile = path.join(__dirname, '../coder/system.json')
  // 获取所有的子系统名称
  const filesSystem = fs.readdirSync(rootSystem)
  const setSysMethod = require('./setSystemConfig')
  const systemList = require('./system.json')
  setSysMethod.setSysName(systemList, filesSystem, systemFile)
  setSysMethod.insertCommander(systemList)
}
