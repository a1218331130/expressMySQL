import request from '@index/utils/request'
const Qs = require('qs')
export function getHeaderData(data) {
  return request({
    url: '/getpost/' + data.name,
    method: 'get'
    // params: {
    //   ...data
    // }
  })
}
export function addHeaderData(data) {
  return request({
    url: '/addpost',
    method: 'get',
    params: {
      ...data
    }
  })
}
export function updataHeaderData(data) {
  return request({
    url: '/updatepost/' + data.id,
    method: 'get',
    params: {
      ...data
    }
  })
}
export function deleteHeaderData(data) {
  return request({
    url: '/deletepost/' + data.id,
    method: 'get'
  })
}
