// 区分业务和sysmng，在该文件夹引入sysmng里面的api，并在main里面设置为全局变量
import initApi from '@modularize/helper/gobalApl/apiController'
// import API_CONFIG from '@/projects/index/api'
// 知识点1： 可用于模块的批量导入，类同于import引入同一文件夹下多个文件。
// require.context(directory, useSubdirectories = false, regExp = /^.//);
// 参数： 1. 读取文件的路径 2. 是否遍历文件的子目录 3. 匹配文件的正则表达式
// 返回是一个函数，是该文件夹下的匹配文件的执行环境
// 该函数有三个属性
// 1. resolve {Function} -接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
// 2. keys {Function} -返回匹配成功模块的名字组成的数组
const modulesFiles = require.context('@/projects/index/api/modules', true, /\.js$/)

// 知识点2：reduce(()=> {total, currentValue, currentIndex, arr}, initValue)
// 参数： 1. 执行每条数据的函数 2. 传递给函数的初始值，可选（以前没发现初始值的妙用-可用于统计个数、去重等）
// 函数的参数
// 1. total             必需。初始值, 或者计算结束后的返回值。如果设置初始值就用初始值，否则就是函数的第一条数据
// 2. currentValue     必需。当前元素

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 忽略第1个js
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
import { default as request } from '@index/utils/request'
const Qs = require('qs')
export default initApi({ config: modules, request: request, Qs: Qs })
