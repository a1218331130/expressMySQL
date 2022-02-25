// 区分业务和sysmng，在该文件夹引入sysmng里面的api，并在main里面设置为全局变量
import initApi from './apiController'
import { configsMethod } from './api'
// import { default as request } from '@/utils/request'
const Qs = require('qs')
export const initApiMethod = function(request, context) {
  return initApi({ config: configsMethod(context), request: request, Qs: Qs })
}
