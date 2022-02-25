var fs = require('fs')
var path = require('path')
const utils = require('./utils')
var root = path.join(__dirname, '../src/projects')
var systemFile = path.join(__dirname, '../coder/system.json')
var packageFile = path.join(__dirname, '../package.json')
// 获取所有的子系统名称
const files = fs.readdirSync(root)
const systemList = require('./system.json')
const packageJSON = require('../package.json')
utils.log(`>>>  开始生成${files}的配置以及打包和运行的命令`, 'success')
setSysName(systemList, files)
insertCommander(systemList, files)
utils.log(`>>>  生成完成`, 'success')
/**
 * 设置子系统名称
 * @param systemList
 * @param files
 */
function setSysName(systemList, files) {
  systemList.sysModuleArr = files
  systemList.buildModules = files
  utils.writeFile(systemFile, JSON.stringify(systemList, null, 2))
}
/**
 * 设置package.json里面系统的运行以及打包命令
 * @param files
 */
function insertCommander(files) {
  const scripts = packageJSON.scripts
  // 清楚打包运行命令
  for (let i in scripts) {
    if ((i !== 'dev' && scripts[i].includes('build/webpack.dev.conf.js')) || (i !== 'build' && scripts[i].includes('build/build.js'))) {
      delete scripts[i]
    }
  }
  setScript(scripts, files, 'build')
  setScript(scripts, files)
  utils.writeFile(packageFile, JSON.stringify(packageJSON, null, 2))
  // console.log(scripts, 'scripts')
}
function setScript(scripts, files, type = '') {
  for (let i = 0; i <= files.sysModuleArr.length; i++) {
    if (files.sysModuleArr[i] !== undefined) {
      if (type === 'build') {
        const build = `cross-env INCLUDEAPP=${files.sysModuleArr[i]}  node --max_old_space_size=4000  build/build.js`
        scripts[`build:${files.sysModuleArr[i]}`] = build
      } else {
        const dev = `cross-env BABEL_ENV=development cross-env INCLUDEAPP=${files.sysModuleArr[i]}  node --max_old_space_size=8000 node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --progress --config build/webpack.dev.conf.js`
        scripts[`dev:${files.sysModuleArr[i]}`] = dev
      }
    }
  }
}
module.exports = {
  insertCommander,
  setSysName
}
