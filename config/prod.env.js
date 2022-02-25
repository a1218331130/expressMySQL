const config = require('../coder/config')
module.exports = {
  PRO_NAME: config.prodPath,
  NODE_ENV: '"production"',
  VUE_FORM_DESIBN_PATH: `'${config.assetsPublicPath_build}libs'`,
  VUE_STATIC_COMMON: `'${config.assetsPublicPath_proc}'`,
  ENV_CONFIG: '"prod"',
  VUE_ONEMAP_API: '"http://10.0.1.247:8091/zjd"',
  VUE_APP_UEDITER_API: '"/UEditor/"',
  VUE_APP_UPLOAD_API: '"http://61.184.223.54:8082/designer/uediter/exec"',
  VUE_APP_PDF: `'${config.assetsPublicPath_build}static/common/designersp/static/plugins/pdf/web/viewer.html'`,
  VUE_APP_FORM: `'${config.assetsPublicPath_build}static/common/designersp/static/wfs/bpmTaskForm.html'`
}
