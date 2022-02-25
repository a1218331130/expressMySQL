require('shelljs/global')
var fs = require('fs')
const utils = require('./utils')
const commander = require('commander')
const path = require('path')
// 子系统配置文件
const gitList = require('./sys-git')
const rm = require('rimraf')
commander.option('-f, --force', '清除目录再创建').parse(process.argv)
// 子系统位置
var root = path.join(__dirname, '../src/projects/')
var rootWfrunPath = path.join(__dirname, '../src/')
// 获取所有的子系统名称
const files = fs.readdirSync(root)
// 命令参数数组
const sysNameList = commander.args
if (sysNameList.length === 0) {
  utils.log(`>>>  命令不传值默认拉取全部子系统，如需拉取指定子系统，则运行如 npm run shell system`, 'success')
} else {
  utils.log(`>>>  当前拉取的子系统为${sysNameList}`, 'success')
}
//  先删除子系统
deleteSysGit()
// 进入指定文件夹'../src/projects/'
// cd(root)
// 拉取项目
pullSysGit()

function pullSysGit() {
  // 如果有传参则用传参，没有则默认全部
  const list = sysNameList.length > 0 ? sysNameList : gitList
  console.log(list, 'list')
  for (let i = 0; i < list.length; i++) {
    const arr = gitList.filter((res) => res.sysName === (sysNameList.length > 0 ? list[i] : list[i].sysName))
    if (arr.length > 0) {
      if (arr[0].sysName === 'wfruntime') {
        cd(rootWfrunPath)
      } else {
        cd(root)
      }
      exec(`git config --global core.autocrlf false`)
      exec(`git submodule add -f ${arr[0].gitUrl}`)
      if (arr[0].sysName === 'wfruntime') {
        cd(path.join(__dirname, `../src/wfruntime`))
      } else {
        console.log(arr[0].sysName, 'arr[0].sysNamearr[0].sysName')
        cd(path.join(__dirname, `../src/projects/${arr[0].sysName}`))
      }
      // if (arr[0].sysName === 'system') {
      //   exec(`git checkout 4.0.1.RELEASE`)
      // } else {
      //   exec(`git checkout 1.0.0.RELEASE`)
      // }
    }
  }
}
function deleteSysGit() {
  // 如果有传参则用传参，没有则默认全部
  const list = sysNameList.length > 0 ? sysNameList : gitList
  const hasWfrun = sysNameList.filter((res) => res === 'wfruntime')
  for (let i = 0; i < list.length; i++) {
    const hasSys = files.filter((res) => res === list[i])
    console.log(rootWfrunPath, 'hasSyshasSys')
    console.log(`${root}${list[i]}`, 'filesfiles')
    if (list[i] !== 'index' && hasSys.length > 0) {
      exec(`rd/s/q ${root}${list[i]}`)
      exec(`git rm --cached ${root}${list[i]}`)
      rm.sync(`${path.join(root, '../../.git/modules/src/projects/' + list[i])}`)
    }
  }
  if (hasWfrun.length > 0) {
    exec(`rd/s/q ${rootWfrunPath}wfruntime`)
    exec(`git rm --cached ${rootWfrunPath}wfruntime`)
    rm.sync(`${path.join(root, '../../.git/modules/src/wfruntime')}`)
  }
  // 删除git相关

  // exec(`del ${path.join(root, '../../.git/config')}`)
}
