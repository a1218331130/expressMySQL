/*
 * @Author: tianlun
 * @Date: 2021-09-16 17:55:00
 * @LastEditTime: 2021-09-16 17:55:29
 */
import request from '@index/utils/request'
const Qs = require('qs')
const serverName = 'SysResource'

export function listEntity(data) {
  return request({
    url: serverName + '/listByAppCode',
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

export function hasId(data) {
  return request({
    url: serverName + '/hasId',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function deleteR(data) {
  return request({
    url: serverName + '/delete',
    method: 'post',
    data: Qs.stringify(data)
  })
}
