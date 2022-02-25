import request from '@index/utils/request'
const Qs = require('qs')
export function getList(data) {
  return request({
    url: '/getlist/' + data.parentId,
    method: 'get'
    // params: {
    //   ...data
    // }
  })
}
export function addList(data) {
  return request({
    url: '/addlist',
    method: 'get',
    params: {
      ...data
    }
  })
}
export function updatelist(data) {
  return request({
    url: '/updatelist/' + data.id,
    method: 'get',
    params: {
      ...data
    }
  })
}
export function deletlist(data) {
  return request({
    url: '/deletlist/' + data.id,
    method: 'get'
  })
}
