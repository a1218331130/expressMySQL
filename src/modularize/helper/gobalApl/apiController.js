/**
 * API统一规范控件
 * @module config 通过require.context('./modules', false, /\.js$/)遍历出来的对象
 * @module request 封装好的请求
 * @module Qs
 * @example 使用方法
 * this.myApi[methodsName](queryForm).then(res => {
 *   this.tableData = res.data.entityList
 *   this.total = res.data.total
 * })
 * @module methodsName // js下面定义的name
 * @module queryForm // 参数对象
 * @module ./modules下面的js格式如下
 * @module otherReauestParams // 其他参数，如header等
 * {
    name: 'ApprovalDoExport',
    method: 'post',
    desc: '查询导出',
    path: '/search/doExport',
    otherReauestParams: {
      responseType: 'blob'
    }
  }
 */
class MakeApi {
  constructor(options) {
    this.api = {}
    // 处理api
    // debugger
    return this.getApiList(options)
  }

  getApiList({ config = {}, request, Qs }) {
    Object.keys(config).map(namespace => {
      this._getSingleApi({
        config: config[namespace],
        request: request,
        Qs: Qs
      })
    })
  }
  _getSingleApi({ config = {}, request, Qs }) {
    // 遍历所有的api
    config.forEach(api => {
      const { name, method, path, otherReauestParams } = api

      // 给对象api设置值
      Object.defineProperty(this.api, `${name}`, {
        value(outerParams, axiosConfig = {}) {
          // 获取请求方式
          return getMethodRequest(method, outerParams, path, otherReauestParams, request, Qs, axiosConfig)
          // return request({
          //   url: path,
          //   method: method,
          //   data: Qs.stringify(outerParams),
          //   ...otherReauestParams
          // })
        }
      })
    })
  }
}
// 判断请求方法，根据不同的method做不同的处理
function getMethodRequest(method, outerParams, path, otherReauestParams, request, Qs, axiosConfig) {
  if (method === 'post') {
    return request({
      url: path,
      method: method,
      data: Qs.stringify(outerParams),
      ...axiosConfig,
      ...otherReauestParams
    })
  } else {
    // 根据参数拼接地址
    const dataUrl = getUrl(outerParams)
    return request({
      url: path + dataUrl,
      method: method,
      ...axiosConfig,
      ...otherReauestParams
    })
  }
}
// get请求的情况下，拼接参数
function getUrl(outerParams) {
  let urlStr = ''
  // 遍历对象并拼接url地址
  if (Object.keys(outerParams).length !== 0) {
    Object.keys(outerParams).forEach(key => {
      urlStr = urlStr + '&&' + key + '=' + outerParams[key]
    })
    urlStr = '?' + urlStr
  }
  return urlStr
}
function initApi(options) {
  return new MakeApi(options)['api']
}
// 暴露实例
export default initApi
