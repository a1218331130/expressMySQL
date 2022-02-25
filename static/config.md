## config.json 的后台地址配置说明

- 情况零：动态 http

如果不配 http，则默认使用前端访问的 http，使用 uiProtocol 字段来设置动态 uiProtocol，如 uiProtocol://uiIp:8089/api

- 情况一：动态 ip

如果不配 ip，则默认使用前端访问的 ip，使用 uiIp 字段来设置动态 ip，如http://uiIp:8089/api

- 情况二：动态端口

如果不配端口，则默认使用前端访问的端口，使用 uiPort 字段来设置动态端口，如http://10.3.1.60:8089:uiPort/api

- 情况三：动态 ip 与端口

如果不配 ip 与端口，则默认使用前端访问的 ip 与端口，使用 uiIp 和 uiPort 字段来设置动态 ip 和动态端口，如http://uiIp:uiPort/api
如果只配/api，那么功能同上

## 使用方式

- 如果是通用的后台接口地址，则直接在 main.js 里面使用 axios.defaults.baseURL = Vue.prototype.setAgentApi()

- 如果是其他需要单独使用的后台接口地址则在使用到的 js 里面使用 Vue.prototype.setAgentApi('apiName')，apiName 为 config.json 里面的地址字段名称，如 VUE_APP_DESIGNER_URL，不传值默认使用 VUE_APP_BASE_API，如果是 vue 页面则直接使用 this.setAgentApi('apiName')
