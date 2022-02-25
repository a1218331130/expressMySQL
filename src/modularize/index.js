import { setIconFont, utilList } from './modularize'
import { initApiMethod } from './helper/gobalApl'
import '@modularize/icons'
/**
 * @module vue // Vue对象
 * @module iconArr // 图标数组，对应每个子系统的名称
 */
export const modularizeMethod = function(vue, iconArr = []) {
  setIconFont(iconArr)
  utilList(vue)
}
export const requestMethod = function(vue, request = null, context = '', httpName = '$http') {
  const gobalApi = initApiMethod(request, context, httpName)
  vue.prototype[httpName] = gobalApi
}
export const setIconFontMethod = setIconFont
export const utilListMethod = utilList
