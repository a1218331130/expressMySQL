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
export function getNewlist(data) {
  return request({
    url: '/getNewlist',
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
    url: '/updatelist',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function deletlist(data) {
  return request({
    url: '/deletlist/' + data.id,
    method: 'get'
  })
}
export function getSingCategories(data) {
  return request({
    url: '/myJsonp?json=true',
    method: 'get'
  })
}
export function listCount() {
  return request({
    url: '/listCount',
    method: 'get'
  })
}
