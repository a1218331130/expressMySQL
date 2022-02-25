var fs = require('fs')
var path = require('path')
var templatePath = path.join(__dirname, './templates/')
var root = path.join(__dirname, '../src/projects')
const apiRender = getRender('apiNew.js')
// const commander = require('commander')
// const packageJSON = require('../package')
// commander.version(packageJSON.version).parse(process.argv)
// console.log(process.argv.splice(2), 'commander.namecommander.namecommander.name')
/**
 * 读取模板渲染函数
 * @param file
 */
function getRender(file) {
  return require(path.join(templatePath, file))
}
/**
 * 创建文件
 * @param path
 * @param fileName
 * @param content
 */
function writeFile(path, fileName, content) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  fs.writeFileSync(path + fileName + '.js', content, {
    encoding: 'utf8'
  })
}
/**
 * 格式化js代码
 * @param content
 * @returns {*}
 */
function beautifyJs(content) {
  content = content
    .replace(/(\r\n|\n)\s*/g, '\n')
    .replace(/\(\n/g, '(')
    .replace(/,\n/g, ',')
    .replace(/\/\*\*/g, '\n/**')
    .replace(/\n\/\//g, '\n\n//')
  return content
}
/**
 * 生成api文件
 */
function writeApi(json) {
  console.log('成功生成文件。。。')
  // console.log(json, 'jsonjsonjson')
  var outPath = path.join(__dirname, '../src/base/api/')
  const jsonNew = json.filter((item) => item.label.includes('index') || item.label.includes('onemap') || item.label.includes('modularize') || item.label.includes('system'))
  console.log(jsonNew, 'jsonNew')
  const jsonNewViews = jsonNew.map((item) => {
    return {
      label: item.label,
      value: item.label,
      // children: item.children
      children: item.children.filter((res) => res.label.includes('views'))
    }
  })
  // let jsonNew = json.map(item => {
  //   let index = item.lastIndexOf('src')
  //   item = item.substring(index + 4, item.length);
  //   var re = new RegExp('\\\\', 'g');
  //   item = item.replace(re, '-');
  //    return item
  // });
  // if(outPath.includes('src')) {

  // }
  // console.log(jsonNew, 'jsonjsonjson');
  // const jsonNew = json.filter(item => item.label.includes('view'))
  // jsonNew = jsonNew.replace(/""/g, "''")
  writeFile(
    outPath,
    'router',
    beautifyJs(
      apiRender({
        cname: JSON.stringify(jsonNewViews).replace(/\"/g, "'")
      })
    )
  )
}
// 遍历文件夹，获取所有文件夹里面的文件信息
function geFileList(path) {
  console.log('开始生成文件。。。')
  var filesList = []
  var targetObj = {}
  readFile(path, filesList, targetObj)
  return filesList
}
// 遍历读取文件
function readFile(path, filesList, targetObj) {
  const files = fs.readdirSync(path)
  // 需要用到同步读取
  files.forEach(walk)

  function walk(file) {
    const states = fs.statSync(path + '/' + file)
    if (!file.includes('node_modules') && !file.includes('build') && !file.includes('.js') && !file.includes('.git') && !file.includes('.env')) {
      if (states.isDirectory()) {
        var item
        if (targetObj['children']) {
          item = {
            label: file,
            children: [],
            value: file
            // path: path
          }
          targetObj['children'].push(item)
        } else {
          item = {
            label: file,
            children: [],
            value: file
            // path: path
          }
          filesList.push(item)
        }
        readFile(path + '/' + file, filesList, item)
      } else {
        // 创建一个对象保存信息
        var obj = {}
        obj.size = states.size // 文件大小，以字节为单位
        obj.name = file // 文件名
        obj.path = path + '/' + file // 文件绝对路径
        if (targetObj['children']) {
          item = {
            label: file,
            value: file
            // path: obj.path
          }
          targetObj['children'].push(item)
        } else {
          item = {
            label: file,
            value: file
            // path: obj.path
          }
          filesList.push(item)
        }
      }
    }
  }
}
// fs.watch(root, function(event, filename) {
//   console.log('event is: ' + event)
//   if (filename) {
//     console.log('filename provided: ' + filename)
//     writeApi(geFileList(root))
//   } else {
//     console.log('filename not provided')
//   }
// })
// function test() {
//   console.log(3232322233333)
// }
// 写入文件utf-8格式
// function writeFile2(fileName,data){
//   fs.writeFile(fileName,data,'utf-8',complete);
//   function complete() {
//     console.log("文件生成成功");
//   }
// }
// var filesList = geFileList("root");
// var str = JSON.stringify(filesList);
// str = "var data ={name:'Egret',children:#1}".replace("#1",str);
// writeFile2("tree.js",str);
writeApi(geFileList(root))
