import Vue from 'vue'
import axios from 'axios'
import { Message, Notification } from 'element-ui'
import store from '@index/store'
import { getToken } from '@modularize/util/common/auth'
import { showLoading, hideLoading } from './request-loading'
const getBaseUrl = () => {
  return Vue.prototype.VUE_APP_BASE_API
}

export const getDesignerUrl = () => {
  return Vue.prototype.VUE_APP_DESIGNER_URL
}
// 保存不需要全局loading的接口
function unNeedLoading(url, type = 'show') {
  const unLoadingList = [
    '/SysUserOnline/listByOnline',
    'Login/login',
    'Login/getCurrentUser',
    'TaskNumber/getPersonTaskNumber',
    'OtherExpand/getExchangeToken',
    'sys/core/sysFileInfo/down',
    'ElectricalCard/getCardFile',
    'TipMsg/msgListData',
    'SysOrg/listOrgUserTree',
    '/BsXzSchedule/findByMonth'
  ]
  const isLoading =
    unLoadingList.includes(url) ||
    url.includes('sys/core/sysFileInfo/down') ||
    url.includes('OtherExpand/getExchangeToken') ||
    url.includes('ElectricalCard/getCardFile') ||
    url.includes('/sysFileInfo/getSlicesUploadInfo') ||
    url.includes('/sysFileInfo/slicesUpload') ||
    url.includes('/sysFileInfo/slicesDownSize') ||
    url.includes('/sysFileInfo/slicesDown') ||
    url.includes('/BsXzSchedule/findByMonth') ||
    url.includes('slicesUploadTemporaryFile')

  if (type === 'show') {
    !isLoading && showLoading('.app-main')
  } else {
    !isLoading && hideLoading()
  }

  // return isLoading
}
// 声明一个数组用于存储每个请求的取消函数和axios标识MessageBox
// const pending = []
// const CancelToken = axios.CancelToken
// const removePending = config => {
//   for (const p in pending) {
//     if (pending[p].u === config.url + JSON.stringify(config.data) + '&' + config.method) {
//       pending[p].f()
//       pending.splice(p, 1)
//     }
//   }
// }
// create an axios instance
const service = axios.create({
  // baseURL: getBaseUrl(), // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})
const CancelToken = axios.CancelToken
// 全局定义一个存放取消请求的标识
window.axiosCancel = []
// for back-end
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// request interceptor
service.interceptors.request.use(
  (config) => {
    // hideLoading()
    // removePending(config)
    // config.cancelToken = new CancelToken(c => {
    //   pending.push({ u: config.url + JSON.stringify(config.data) + '&' + config.method, f: c })
    // })
    // 添加取消的标识
    config.cancelToken = new CancelToken((cancel) => {
      window.axiosCancel.push({ cancel, url: config.url })
    })
    config.url.includes('sysFileInfo/getSlicesUploadInfo') ||
      config.url.includes('sysFileInfo/slicesUpload') ||
      config.url.includes('sysFileInfo/slicesDownSize') ||
      config.url.includes('sysFileInfo/slicesDown') ||
      config.url.includes('slicesUploadTemporaryFile')
    // console.log(config.url)
    unNeedLoading(config.url, 'show')
    // unNeedLoading(config.url, 'show')
    // !config.url.includes('/SysUserOnline/listByOnline') && showLoading('.app-main')
    // do something before request is sent
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // for user first login to get the menu
    // if (store.getters.upmsToken && getUpmsToken()) {
    //   config.headers['token'] = getUpmsToken()
    // }

    // console.log(store.getters.token, '000')
    // console.log(getToken(), '111')
    if (store.getters.token || getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = 'bearer ' + getToken()
      config.headers['Token-Auth'] = 'bearer ' + getToken()
    }
    config.baseURL = config.hasOwnProperty('baseURL') ? config.baseURL : getBaseUrl()
    return config
  },
  (error) => {
    hideLoading()
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

const handleError = (error) => {
  console.log('err' + error) // for debug
  hideLoading()
  try {
    if (process.env.NODE_ENV === 'development') {
      let message = error.message || ''
      if (error.response && error.response.data && error.response.data.detailMsg) {
        message = error.response.data.detailMsg
      }
      Notification.error({
        title: '错误',
        message: '点击信息查看错误详情',
        duration: 0,
        onClick: () => {
          Message({
            message,
            type: 'error',
            showClose: true,
            duration: 1000
          })
        }
      })
    } else {
      Notification.error({
        title: '错误',
        message: '网络错误，请联系管理员！',
        duration: 1000
      })
    }
    return Promise.reject(error)
  } catch (error) {
    hideLoading()
    console.log(error)
  }
}

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    unNeedLoading(response.config.url.replace(response.config.baseURL + '/', ''), 'hide')
    // hideLoading(response.config.url, 'hide')
    const config = response.config
    const res = response.data
    if (config.responseType === 'blob') {
      hideLoading()
      return res
    }
    if (!res.data) {
      hideLoading()
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.ackCode && res.ackCode !== 200) {
      // 50008: Illegal token; 50012: Other clients logged in; 40000: Token expired;
      if (res.ackCode === 40000 || res.ackCode === 50012 || res.ackCode === 50008) {
        // to re-login
        Message.error('您已被登出，请重新登录！')
        // MessageBox.confirm('您已被登出，请重新登录！', '确认登出', {
        //   confirmButtonText: '登出',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
        store.dispatch('user/resetToken').then(() => {
          // location.reload()
        })
        hideLoading()
        return null
      } else if (res.ackCode === 40005) {
        Message.warning(res.message)
        return null
      } else if (res.message) {
        console.warn(res)
        hideLoading()
        // Notification.error({
        //   title: '错误',
        //   message: res.message,
        //   duration: 2000
        // })
        if (res.data['records']) {
          res.data['data'] = res.data['records']
        }
        return res
      }

      return handleError(new Error('请联系管理员！'))
    } else {
      // if (config.url.includes('sysFileInfo/getSlicesUploadInfo') || config.url.includes('sysFileInfo/slicesUpload')) {
      // } else {
      hideLoading()
      // }
      return res
    }
  },
  (error) => {
    hideLoading()
    if (error.response.data.config) {
      !error.response.data.config.url.includes('ElectricalCard/getCardFile') && Message.error(error.response.data.message)
    }
    return error.response.data
    // return error
  }
  // handleError
)

export default service

/**
 * The workhorse; converts an object to x-www-form-urlencoded serialization. for spare,now use qs.stringify
 * @param {Object} obj
 * @return {String}
 */

export function paramToUrlencoded(obj) {
  var query = ''
  var name
  var value
  var fullSubName
  var subName
  var subValue
  var innerObj
  var i

  for (name in obj) {
    value = obj[name]

    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i]
        fullSubName = name + '[' + i + ']'
        innerObj = {}
        innerObj[fullSubName] = subValue
        query += paramToUrlencoded(innerObj) + '&'
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName]
        fullSubName = name + '[' + subName + ']'
        innerObj = {}
        innerObj[fullSubName] = subValue
        query += paramToUrlencoded(innerObj) + '&'
      }
    } else if (value !== undefined && value !== null) query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
  }

  return query.length ? query.substr(0, query.length - 1) : query
}
