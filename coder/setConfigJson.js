const commander = require('commander')
const path = require('path')
const utils = require('./utils')
let jsonPath = 'static/config'
commander.option('-f, --force', '清除目录再创建').parse(process.argv)
if (commander.args[2]) {
  jsonPath = commander.args[2]
}
var configJson = path.join(__dirname, `../${jsonPath}.json`)
let jsonObj = require(`../${jsonPath}.json`)
const ipName = commander.args[0] || 'http://10.3.1.60'
jsonObj.ENV_CONFIG.production.ENV_LIST.VUE_APP_BASE_API = ipName
jsonObj.ENV_CONFIG.production.ENV_LIST.VUE_APP_DESIGNER_URL = ipName
utils.writeFile(configJson, JSON.stringify(jsonObj, null, 2))

if (commander.args[1]) {
  var projectJson = path.join(__dirname, './projectName.json')
  let projectObj = require('./projectName.json')
  const projectName = commander.args[1] || ''
  projectObj.name = projectName
  utils.writeFile(projectJson, JSON.stringify(projectObj, null, 2))
}
