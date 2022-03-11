/*
 * @Author: tianlun
 * @Date: 2021-09-07 11:02:52
 * @LastEditTime: 2021-09-16 15:19:47
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

import App from './App'
import website from '@modularize/config/website'
import '@/projects/index/styles/index.scss' // global css
import './utils/hljs'
import './permission' // permission control
// 引入全局公共组件(注：因考虑到运维系统是必然引入的子系统，所以将其放入sysmng子系统中)

import overall from '@index/utils/overall.js'
import menusCode from '@index/config/menus'
import request from '@index/utils/request'
// 引入通用功能
import { modularizeMethod, requestMethod, utilListMethod } from '@modularize'
modularizeMethod(Vue, ['hainan'])
utilListMethod(Vue)
requestMethod(Vue, request, require.context(`@index/api/modules`, true, /\.js$/))
// 引入gdcomponent
import { addCompList } from '@modularize/comp'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)
addCompList(Vue)
Vue.use(router)
Vue.use(Vuex)
Vue.use(Element)
// 全局组件
Vue.use(overall)

Vue.config.productionTip = false
import gobalApi from '@index/utils/gobalApi'
// 设置全局api
Vue.prototype.myApi = gobalApi

// 加载website
Vue.prototype.website = website

Object.keys(menusCode).forEach((key) => {
  Vue.prototype[key] = menusCode[key]
})
const startApp = () => {
  axios.defaults.withCredentials = false
  axios.get('./static/config.json').then((res) => {
    const envParam = res.data.ENV_CONFIG[process.env.NODE_ENV].ENV_LIST
    if (envParam) {
      const { description, ...otherParam } = envParam
      // 需要拼接当前ip端口的值
      const AddOriginPathList = ['VUE_APP_ONEMAP_URL']
      Object.keys(otherParam || {}).forEach((key) => {
        if (AddOriginPathList.includes(key)) {
          // 一张图地址
          Vue.prototype[key] = window.location.origin + envParam[key]
        } else {
          Vue.prototype[key] = otherParam[key]
        }
      })
    }
    // axios.defaults.baseURL = Vue.prototype.setAgentApi()
    // 设置各模块名
    // const config = res.data.modules
    // const configKeyList = Object.keys(config).filter((key) => !key.startsWith('_'))
    // if (configKeyList.length) {
    //   configKeyList.forEach((key) => {
    //     const oConfig = config[key]
    //     Vue.prototype[key] = oConfig
    //   })
    // }

    new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App)
    })
  })
}

startApp()
