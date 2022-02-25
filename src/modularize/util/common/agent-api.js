import Vue from 'vue'
export function setAgentApi(apiName = 'VUE_APP_BASE_API') {
  var httpType = window.location.protocol
  var url = Vue.prototype[apiName]
  // 端口号
  var port = window.location.port
  // ip
  var ip = window.location.host.replace(port, '').replace(':', '')
  ip = ip === 'localhost' ? '127.0.0.1' : ip
  // 是否需要获取浏览器的ip
  if (url.includes('uiIp')) {
    url = url.replace('uiIp', ip)
  }
  // 是否需要获取浏览器的端口
  if (url.includes('uiPort')) {
    url = url.replace('uiPort', port)
  }
  if (url.includes('uiProtocol')) {
    url = url.replace('uiProtocol:', httpType)
  }
  // 是否只有后缀，如/api
  if (!url.includes('uiPort') && !url.includes('uiIp') && !url.includes('http')) {
    url = httpType + '//' + ip + ':' + port + url
  }
  return url
}
