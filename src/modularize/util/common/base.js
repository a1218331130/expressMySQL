import Vue from 'vue'
import axios from 'axios'

/**
 * 遍历树数据节点，查找符合条件的节点
 * @param {Array|Object} data 数据树，如 {id:1, children:[{id:2}]}
 * @param {Boolean} isFindOne 是否只找最先符合条件的一个
 * @param {Function} fn 查找回调函数，回调参数：item 节点，index节点当前兄弟节点中的索引，data 查找的数据树，函数返回true表示符合条件
 * @param {string} [field=children] 子级字段名称
 * @returns {Array|Object} 查找结果，isFindOne为true时返回Object， false时返回Array
 */
export function traverse(data = [], isFindOne, fn, field = 'children') {
  let result = []
  data = Array.isArray(data) ? data : [data]
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i]
    const checked = fn(item, i, data)
    const children = item[field]
    if (checked) {
      result.push(item)
      if (isFindOne) break
    }
    if (children) {
      const child = traverse(children, isFindOne, fn, field)
      if (child) result = result.concat(child)
    }
  }
  return isFindOne ? result[0] || null : result
}
// 使用递归形式拼接树格式
export function getListData(
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
export function isJsonString(str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {
    console.log(e)
  }
  return false
}
// 深拷贝
export const deepClone = function(obj) {
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
/**
 * 防抖函数
 * @param {function} fn 事件处理函数
 * @param {number} [delay=20] 延迟时间
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @param {object} [context=this] 上下文对象
 * @returns {Function} 事件处理函数
 */
// export function debounce_(fn, delay = 20, isImmediate = false, context = this) {
//   // 使用闭包，保存执行状态，控制函数调用顺序
//   let timer

//   return function() {
//     const _args = [].slice.call(arguments)

//     clearTimeout(timer)

//     const _fn = function() {
//       timer = null
//       if (!isImmediate) fn.apply(context, _args)
//     }

//     // 是否滚动时立刻执行
//     const callNow = !timer && isImmediate

//     timer = setTimeout(_fn, delay)

//     if (callNow) fn.apply(context, _args)
//   }
// }
/**
 * 节流函数
 * @param {function} fn 事件处理函数
 * @param {object} [context=this] 上下文对象
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @returns {Function} 事件处理函数
 */
export function throttle(fn, context = this, isImmediate = false) {
  let isLocked
  return function() {
    const _args = arguments

    if (isLocked) return

    isLocked = true
    raFrame(function() {
      isLocked = false
      fn.apply(context, _args)
    })

    isImmediate && fn.apply(context, _args)
  }
}
/**
 * 生成随机GUID
 * @return {string}
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .toUpperCase()
}
/**
 * 生成唯一id
 * @return {string}
 */
export function uid() {
  const rnd = Math.floor(Math.random() * 1000)
  const timestamp = new Date().getTime()
  return [timestamp, rnd].join('')
}
/**
 * 对数组按制定字段名称进行分组
 * @param {Array} data 数组数组
 * @param {string} [field=group] 分组字段名称
 * @returns {object} 结果
 *
 * @example
 * [{name:1, group:'a'},{name:2, group:'a'}, {name:3, group:'b'}]  ->
 * {
 *  'a':[{name:1, group:'a'}, {name:2, group:'a'}]
 *  'b': [{name:3, group:'b'}]
 * }
 */
export function grouping(data = [], field = 'group') {
  const result = {
    default: []
  }
  data.forEach(item => {
    const group = item[field]
    if (group) {
      if (!result[group]) {
        result[group] = []
      }
      result[group].push(item)
    } else {
      result.default.push(item)
    }
  })
  return result
}

/*
 * @param {api} 下载的地址
 * @param {params} 参数
 * @param {type} 请求类型 (get,post) 默认get
 * @param {downName} 下载的文件名 默认（文件）
 * @param {fileType} 下载的地址 默认（.xlsx）
 * */
export function inExport(api, params, type, downName, fileType) {
  type = type || 'get'
  fileType = fileType || '.xlsx'
  downName = downName || '文件'
  // 首先判断是get请求还是post请求
  const data = type.toLocaleLowerCase() === 'get' ? 'params' : 'data'
  const methods = {
    methods: type,
    url: api,
    [data]: params, // 差异点在于data的值
    responseType: 'arraybuffer'
  }
  if (type.toLocaleLowerCase() === 'get') {
    methods['headers'] = { 'Content-Type': 'application/json,charset=utf-8' }
  }
  axios(methods)
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
      const downloadElement = document.createElement('a')
      const href = window.URL.createObjectURL(blob) // 创建下载的链接
      downloadElement.href = href
      downloadElement.download = downName + fileType // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    })
    .catch(data => {
      console.log('导出失败')
    })
}
/*
 * @param {href} 下载的地址
 * @param {name} 下载的文件名 默认（文件）
 * @param {fileType} 下载的地址 默认（.xlsx）
 * */
export function inExportXml(href, name, fileType) {
  const downloadElement = document.createElement('a')
  downloadElement.href = href
  downloadElement.download = name + fileType// 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}
