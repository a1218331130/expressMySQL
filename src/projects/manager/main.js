import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import './permission' // 权限
import './error' // 日志
import './cache' // 页面缓存'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/common.scss'
import router from './router'
import store from './store'
import App from './App'
import request from './utils/axios'
import siberMenuConfig from './config/siber-menu.config'
// 引入通用功能
import { modularizeMethod, requestMethod } from '@modularize'
import { addCompList } from '@modularize/comp'
modularizeMethod(Vue)
addCompList(Vue)
requestMethod(Vue, request, require.context(`./api/modules`, true, /\.js$/))
Vue.use(router)
Vue.use(Vuex)
Vue.use(Element)
Vue.prototype.siberMenuConfig = siberMenuConfig
const startApp = () => {
  request.get('../static/config.json').then((res) => {
    let config = {}
    const { ENV_CONFIG } = res.data || res

    const envParam = ENV_CONFIG[process.env.NODE_ENV]
    if (envParam) {
      const { ...otherEnvParam } = envParam
      config = {
        ...otherEnvParam
      }
    }

    config = {
      ...config
    }

    const configKeyList = Object.keys(config).filter((key) => !key.startsWith('_'))
    if (configKeyList.length) {
      configKeyList.forEach((key) => {
        const oConfig = config[key]
        const type = /^\[object ([a-zA-Z]+)\]$/.test(Object.prototype.toString.call(oConfig)) && RegExp.$1
        if (type === 'Object') {
          Object.keys(oConfig).forEach((key) => {
            Vue.prototype[key] = oConfig[key]
          })
        } else {
          Vue.prototype[key] = oConfig
        }
      })
    }
    new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App)
    })
  })
}

startApp()
