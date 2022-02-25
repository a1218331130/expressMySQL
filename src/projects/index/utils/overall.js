import moment from 'moment'
import Element from 'element-ui'
// import styles from '@/styles/variables.scss'
// import theme from '@sysmng/utils/theme'
// import getDynamicRouter from './dymamicRouting'
// import date from '@sysmng/utils/date'
// import api from '@sysmng/utils/apiList'
// import { traverse } from '@sysmng/utils/util'
export default {
  async install(Vue, options) {
    // 注册全局api
    // Vue.prototype.api = api
    // 定义全局开始结束时间函数
    // Vue.prototype.timeType = function(type, typeTime = 'yyyy-MM-dd hh:mm:ss', num) {
    //   if (type === 'start') {
    //     return date(new Date(), typeTime, { d: num })
    //   } else {
    //     return date(new Date(), typeTime)
    //   }
    // }
    // 平铺多维度数组
    // 平铺数组
    // Vue.prototype.traverseTree = function(data) {
    //   const list = []
    //   traverse(data, false, function(item) {
    //     list.push(item)
    //   })
    //   return list
    // }
    // 使用递归形式拼接树格式
    Vue.prototype.getListData = function(
      data,
      config = {
        id: 'id',
        pid: 'parentId',
        children: 'children'
      }
    ) {
      var id = config.id || 'id'
      var pid = config.pid || 'pid'
      var children = config.children || 'children'
      // var label=config.label || 'LctnName';
      var idMap = {}
      var jsonTree = []
      data.forEach(function(v) {
        idMap[v[id]] = v
      })
      data.forEach(function(v) {
        var parent = idMap[v[pid]]
        if (parent) {
          !parent[children] && (parent[children] = [])
          parent[children].push(v)
        } else {
          jsonTree.push(v)
        }
      })
      return jsonTree
    }
    // 判断数据可否被json.parse解析
    Vue.prototype.isJsonString = function(str) {
      try {
        if (typeof JSON.parse(str) === 'object') {
          return true
        }
      } catch (e) {
        console.log(e)
      }
      return false
    }
    // 日期转换
    Vue.prototype.formatDateTime = function(val, format = 'YYYY-MM-DD') {
      const formatString = moment(val).format(format)
      return formatString === 'Invalid date' ? '-' : formatString
    }
    // 深拷贝
    Vue.prototype.deepClone = function(obj) {
      const result = Array.isArray(obj) ? [] : {}
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
              result[key] = Vue.prototype.deepClone(obj[key])
            } else {
              result[key] = obj[key]
            }
          }
        }
      }
      return result
    }
    // 点击当前接口时取消所有其他请求
    Vue.prototype.cancel = function(key = '', deleteAll = true) {
      const cancelArr = window.axiosCancel
      // 是不是需要删除全部请求
      if (deleteAll) {
        cancelArr.forEach((ele, index) => {
          delete window.axiosCancel[index]
          // 取消请求的方法
          ele.cancel({
            duration: 100
          })
        })
      } else {
        cancelArr.forEach((ele, index) => {
          if (ele.url.includes(key)) {
            delete window.axiosCancel[index]
            // 取消请求的方法
            ele.cancel({
              duration: 100
            })
          }
        })
      }
    }
    Vue.prototype.$mymess = {
      success: message =>
        Element.Notification.success({
          title: '成功',
          message,
          duration: 1500
        }),
      warning: message =>
        Element.Notification.warning({
          title: '警告',
          message,
          duration: 4000
        }),
      info: message =>
        Element.Notification.info({
          title: '提示',
          message,
          duration: 4000
        }),
      error: message =>
        Element.Notification.error({
          title: '错误',
          message,
          duration: 4000
        })
    }
    Vue.prototype.$moment = moment
    // 设置主题的全局方法
    // Vue.prototype.theme = theme

    // 设置主题的全局颜色
    Vue.prototype.themeColor = '#1e81f1'

    // 设置表格上一层div高度
    Vue.prototype.tableHeightDiv = function(num) {
      return {
        height: `calc(100% - ${num})`
      }
    }
    // 拖拽方式设置，默认为false
    Vue.prototype.maximized = false

    // 设置table高度
    var tableH
    Vue.prototype.fetTableHeight = async function(refs) {
      tableH = await resetHeight(refs)
      var heightTable = tableH.height
      return {
        heightTable: heightTable || 0
      }
    }
    // 重置table高度
    function resetHeight(refs) {
      return new Promise((resolve, reject) => {
        resolve({ height: refs?.getBoundingClientRect().height - 50 - 10 })
      })
    }

    // 设置路由
    // async function getDynamicRouterNew() {
    //   return getDynamicRouter
    // }
    // Vue.prototype.getDynamicRouter = getDynamicRouter

    Vue.prototype.commonStyleFun = function(sysType, classType) {
      localStorage.setItem('sysName', sysType)
      Vue.prototype.sysName = sysType
      Vue.prototype.className = classType
      // return {
      //   sysType,
      //   classType
      // }
    }
  }
}
