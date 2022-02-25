import request from '@index/utils/request'
const Qs = require('qs')
const serverName = 'SysUser'

export function save(data) {
  return request({
    url: serverName + '/save',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function findById(data) {
  return request({
    url: serverName + '/findById',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getAppUsers(data) {
  return request({
    url: serverName + '/getAppUsers',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function update(data) {
  return request({
    url: serverName + '/update',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function updateStatus(data) {
  return request({
    url: serverName + '/updateStatus',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function resetPwd(data) {
  return request({
    url: serverName + '/resetPwd',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getCurrentUser(data) {
  return request({
    url: serverName + '/getCurrentUser',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function listByEntity(data) {
  return request({
    url: serverName + '/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function listByEntityStation(data) {
  return request({
    url: '/SysPostion/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function hasLoginName(data) {
  return request({
    url: serverName + '/hasLoginName',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function updatePwd(data) {
  return request({
    url: serverName + '/updatePwd',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 导出
export function exportExcel(data) {
  return request({
    url: '/SysUserExportAndImport/exportUserItem',
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}
// 导入
export function importExcel(data) {
  return request({
    url: '/SysUserExportAndImport/importUserItem',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
