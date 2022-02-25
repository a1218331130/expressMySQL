import request from '@index/utils/request'
const Qs = require('qs')
import Vue from 'vue'

// 查询附件树
export function attachTreeFileList(params) {
  return request({
    url: Vue.prototype.gdbpm + '/sys/core/sysFileInfo/getFileList',
    method: 'get',
    // data: Qs.stringify(data),
    params: {
      ...params
    }
  })
}
// 查询附件树
export function attachTreeFileListPost(data) {
  return request({
    url: Vue.prototype.gdbpm + '/sys/core/sysFileInfo/getFileList',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 查询项目树
export function attProTreeTabFileList(data = 'ProTree') {
  return request({
    url: Vue.prototype.gdbpm + `/Utils/getSubTypeTree?code=${data}`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 项目树业务数据接口
export function attProTreeTabData(data) {
  return request({
    url: Vue.prototype.gdbpm + `/sys/db/sysSqlCustomQuery/queryForJson?token=${localStorage.getItem('token')}&alias=proTreeYwData`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 文件重命名
export function renameFileName(data) {
  return request({
    url: Vue.prototype.gdbpm + '/sys/core/sysFileInfo/renameFileName?token=' + localStorage.getItem('token'),
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 平铺式列表
export function platFileList(data) {
  return request({
    url:
      Vue.prototype.gdbpm + '/sys/core/sysFileInfo/getByProcInstIdAndDirId?token=' + localStorage.getItem('token') + '&dirId=' + data.dirId + '&procInstId=' + data.procInstId,
    method: 'post'
  })
}
// 平铺式上传附件目录
// designUrl +
//         '/sys/core/sysFileInfo/toSysFileUplod?token=' +
//         localStorage.getItem('token') +
//         '&dirId=' +
//         dirId +
//         '&procInstId=' +
//         WF.inst.actInstId +
//         '&nodeId=' +
//         WF.task.nodeId,
export function uploadPlatFileList(data) {
  return request({
    url:
      Vue.prototype.gdbpm +
      `/sys/core/sysFileInfo/toSysFileUplod?token=${localStorage.getItem('token')}&dirId=${data.dirId}&procInstId=${data.procInstId}&nodeId=${data.nodeId}`,
    method: 'post'
  })
}
// 上传
export function uploadFileList(data) {
  return request({
    url: Vue.prototype.gdbpm + '/sys/core/sysFileInfo/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 收文 上传
export function startUploadFileList(data) {
  return request({
    url: Vue.prototype.gdbpm + '/sys/core/sysFileInfo/uploadTemporaryFile',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 删除
export function delFileList(data) {
  return request({
    url: Vue.prototype.gdbpm + '/sys/core/sysFileInfo/del',
    method: 'post',
    data: Qs.stringify(data)
  })
}
