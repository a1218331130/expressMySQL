/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import store from '../store/'
import Vue from 'vue'
import { serialize } from '../utils/util'
import { getToken } from '@modularize/util/common/auth'
import { Message, MessageBox } from 'element-ui'
import website from '@modularize/config/website'
import { Base64 } from 'js-base64'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 默认超时时间
axios.defaults.timeout = 10000
// 返回其他状态码
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = false
// NProgress 配置
NProgress.configure({
  showSpinner: false
})

// 请求拦截后的消息提示实例
let msgEl
const showSingleMsg = function(message) {
  if (!msgEl) {
    msgEl = Message({
      message,
      type: 'warning',
      onClose: () => {
        msgEl = null
      }
    })
  }
}

// http request拦截
axios.interceptors.request.use(
  config => {
    // 开启 progress bar
    NProgress.start()
    const meta = config.meta || {}
    const isToken = meta.isToken === false
    config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`
    // 让每个请求携带token
    if (getToken() && !isToken) {
      config.headers[website.tokenHeader] = 'bearer ' + getToken()
    }
    // headers中配置text请求
    if (config.text === true) {
      config.headers['Content-Type'] = 'text/plain'
    }
    // headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
      config.data = serialize(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http response 拦截
axios.interceptors.response.use(
  res => {
    // 关闭 progress bar
    NProgress.done()
    // 获取状态码
    const status = res.data.code || res.status || res.code
    const statusWhiteList = website.statusWhiteList || []
    let message // = res.data.msg || res.data.error_description || '请重新登录';
    // 如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res)
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      if (status === 401 || status === 460) {
        const curtoken = getToken()
        if (Vue.prototype.logoutboxtoken !== curtoken) {
          Vue.prototype.logoutboxtoken = curtoken
          MessageBox.confirm('您已被登出，请重新登录！', '确认登出', {
            confirmButtonText: '登出',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('FedLogOut')
            setTimeout(() => {
              window.location.href = window.origin + '/' + (process.env.PRO_NAME ? process.env.PRO_NAME : '')
            }, 100)
          })
          return null
        } else {
          return null
        }
      } else {
        if (res.config.noNormalReject) {
          return res
        }
        message = res.data.msg || '服务内部错误'
      }
      const ignoreMsg = res.config.ignoreMsg
      !ignoreMsg && showSingleMsg(message)
      return Promise.reject(new Error(message))
    }
    return res
  },
  error => {
    NProgress.done()
    if (!navigator.onLine) {
      showSingleMsg('网络错误')
    }
    const statusWhiteList = website.statusWhiteList || []
    // 如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(error.data.code)) {
      return Promise.reject(error)
    }
    return Promise.reject(new Error(error))
  }
)

export default axios
