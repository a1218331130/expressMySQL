import request from '@projects/index/utils/request'
const Qs = require('qs')
import Vue from 'vue'
export function importZip(data) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + '/gdbpm/ZipFileUpload/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 获取个人待办数目
export function getPersonTaskNumber(data) {
  return request({
    url: 'TaskNumber/getPersonTaskNumber',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function instFormData(data) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + '/gdbpm/smform/bpmFormView/instFormData',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function getFileByInstId(data) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + '/gdbpm/ZipFileUpload/getFileByInstId',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function getFileListByInstId(params) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + `/gdbpm/sys/core/sysFileInfo/getFileListByInstId?InstId=${params.instId}`,
    method: 'get'
    // data: Qs.stringify(data)
    // params: {
    //   instId
    // }
  })
}
export function updateInstId(data) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + '/gdbpm/ZipFileUpload/updateInstId',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function updateStatus(data) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + '/gdbpm/SfGhcgxxb/updateStatus',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function updateFormMes(data) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + '/gdbpm/SfGhcgxxb/update',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 待办列表
export function getAllTasks(params) {
  // var appendPara = ''
  // if (params.Q_DESCRIPTION__S_LK) {
  //   appendPara += '&Q_DESCRIPTION__S_LK=' + params.Q_DESCRIPTION__S_LK
  // }
  // if (params.flag === 'all') {
  //   appendPara += '&flag=all'
  // }
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + `/gdbpm/Searches/findUpcomingList`,
    method: 'post',
    data: Qs.stringify(params)
  })
}
// 我的处理列表
export function getMyProcesses(params) {
  var appendPara = ''
  if (params.subject) {
    appendPara += '&subject=' + params.subject
  }
  if (params.solId) {
    appendPara += '&solId=' + params.solId
  }
  if (params.status) {
    // status=RUNNING（已办）或者status=SUCCESS_END（办结）
    appendPara += '&status=' + params.status
  }
  return request({
    // url: Vue.prototype.VUE_APP_BASE_API + `/Searches/findDoneList?current=${params.current}&size=${params.size}` + appendPara,
    url: Vue.prototype.VUE_APP_BASE_API + `/gdbpm/Searches/findDoneList?current=${params.current}&size=${params.size}` + appendPara,
    method: 'post',
    data: Qs.stringify(params)
  })
}
// 获取文件上传进度
export function getTestUploadInfo(data, key) {
  return request({
    url:
      Vue.prototype.VUE_APP_BASE_API +
      '/gdbpm/sys/core/sysFileInfo/getSlicesUploadInfo?id=' +
      key +
      `&fileName=${data.data}&fileSize=${data.fileSize}&tmpFileKey=${data.tmpFileKey}&hasReload=${data.hasReload}`,
    method: 'get',
    data: Qs.stringify(data)
  })
}
// 获取文件下载大小
export function delTmpFile(data) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + '/gdbpm/sys/core/sysFileInfo/delTmpFile',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 文件断点上传
export function testUpload(data, key) {
  return request({
    url: Vue.prototype.VUE_APP_BASE_API + '/gdbpm/AttachmentManger/slicesUpload?id=' + key,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
