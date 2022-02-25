import request from '@index/utils/request'
const Qs = require('qs')
const serverName = 'ApPublish'

// 通知公告管理
export function listByEntity(data) {
  return request({
    url: serverName + '/doingTasks',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function detail(data) {
  return request({
    url: serverName + '/findById',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function updateNews(data) {
  return request({
    url: serverName + '/updateNews',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function delNotice(data) {
  return request({
    url: serverName + '/delete',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function saveNews(data) {
  return request({
    url: serverName + '/saveNews',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 政务分类
export function zwlistByEntity(data) {
  return request({
    url: 'SysDictItem/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function zwUpdate(data) {
  return request({
    url: 'SysDictItem/update',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function zwUpdateStatus(data) {
  return request({
    url: 'SysDictItem/updateStatus',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function zwDelete(data) {
  return request({
    url: 'SysDictItem/delete',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function zwSave(data) {
  return request({
    url: 'SysDictItem/save',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 手机发送
export function sendMobile(data) {
  return request({
    url: 'ApplyTask/sendApPublishMobile',
    method: 'post',
    data: Qs.stringify(data)
  })
}
