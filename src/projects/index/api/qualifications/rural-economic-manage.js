/**
 *
 * 农村集体经济管理模块api
 */
import request from '@index/utils/request'
const Qs = require('qs')
import Vue from 'vue'
export function updateRuralDetailApi(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsRuralEconomy/update`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function saveRuralDetailApi(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsRuralEconomy/save`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function listByEntity(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsRuralEconomy/listByEntity`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function deletelistByEntity(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsRuralEconomy/delete`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function findDetailById(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsRuralEconomy/findById`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// export function upload(data) {
//   return request({
//     url: Vue.prototype.gdbpm + `/AttachmentManger/upload`,
//     method: 'post',
//     data: Qs.stringify(data)
//   })
// }

// 文件上传
export function upload(data, key) {
  return request({
    url: Vue.prototype.gdbpm + '/AttachmentManger/upload',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// // 文件下载
// export function upload(data, key) {
//   return request({
//     url: Vue.prototype.gdbpm + '/BsRuralEconomy/exportExcel',
//     method: 'post',
//     data: data,
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })
// }
// 导出excel
export function exportExcel(data) {
  return request({
    url: Vue.prototype.gdbpm + '/BsRuralEconomy/exportExcel',
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}
