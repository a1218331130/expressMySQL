const HtmlWebpackPlugin = require('html-webpack-plugin')
const sysObj = require('./setSysName')
//系统模块
const devModules = sysObj.sysModuleArr
//设置入口js
let entries = {}
devModules.forEach(function(name) {
  entries[name] = './src/projects/' + name + '/main.js'
})
function setEnterPage(devWebpackConfig) {
  //设置入口页面
  devModules.forEach(function(name) {
    //访问路径
    let filename = './' + name + '/index.html'
    //模板页面
    let template = 'src/projects/' + name + '/index.html'
    if (name == 'index') {
      filename = './index.html'
    }
    devWebpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: filename,
        template: template,
        chunks: [name], //跟entries里的名对应
        inject: true,
        favicon: './favicon.ico' //设置favicon
      })
    )
  })
}
module.exports = {
  entries,
  setEnterPage
}
