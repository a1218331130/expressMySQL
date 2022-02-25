const utils = require('../utils')
const systemList = require('../system.json')
let processList = process.argv.slice(2, process.argv.length)
/**
 * 系统所有模块, 也就是 src/projects 文件夹下的模块项目名
 * 每添加一个模块运行npm run setSys 自动生成相应配置
 */
let sysModuleArr = systemList.sysModuleArr
// 运行单独某个模块
if (process.env.INCLUDEAPP) {
  // if (process.env.INCLUDEAPP === 'index') {
  //   sysModuleArr = []
  // } else {
  //   sysModuleArr.splice(1, 3)
  // }
  // sysModuleArr.push(process.env.INCLUDEAPP)
  sysModuleArr = [process.env.INCLUDEAPP]
}
if (process.env.npm_lifecycle_event.includes('build')) {
  utils.log('当前打包以下模块：' + sysModuleArr, 'success')
} else {
  utils.log('当前启动以下模块：' + sysModuleArr, 'success')
}

// return
/**
 * 生产打包的模块, 来自sysModuleArr中的部分模块或全部模块
 * 一次可以同时打包多个模块
 */
let buildModules = systemList.buildModules
// 如果是指定特定的模块进行打包
if (processList.length > 0) {
  buildModules = processList
} else {
  // 打包单独某个模块
  if (process.env.INCLUDEAPP) {
    buildModules = []
    buildModules.push(process.env.INCLUDEAPP)
  }
}
module.exports = {
  sysModuleArr,
  buildModules
}
