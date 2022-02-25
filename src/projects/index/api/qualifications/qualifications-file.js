import request from '@index/utils/request'
import Vue from 'vue'
const Qs = require('qs')

// 上传文件
export const uploadFile = data => {
  return request({
    url: Vue.prototype.gdbpm + `/AttachmentManger/upload`,
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'form-data' }
  })
}
// // 查询文件
// export const getFile = data => {
//   return request({
//     url: Vue.prototype.gdbpm + `/AttachmentManger/getFileById`,
//     headers: { 'Content-Type': 'form-data' },
//     method: 'post',
//     data: data
//   })
// }
// 查询文件
export const getFile = data => {
  return request({
    url: Vue.prototype.gdbpm + `/AttachmentManger/getFileById`,
    //   headers: { 'Content-Type': 'form-data' },
    method: 'post',
    // data: data
    data: Qs.stringify(data)
  })
}
// 下载文件
export const downloadFile = data => {
  return request({
    url: Vue.prototype.gdbpm + `/AttachmentManger/downloadFile`,
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}
// 删除文件
export const deleteFile = data => {
  return request({
    url: Vue.prototype.gdbpm + `/AttachmentManger/deleteFileById`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
