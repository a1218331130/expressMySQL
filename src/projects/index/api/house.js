/**
 *
 * 建房需求管理模块api
 */
import request from '@index/utils/request'
const Qs = require('qs')
import Vue from 'vue'
export function updateQualificationDetailApi(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/update`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
/**
 * 新增资格权管理详情
 */
export function saveQualificationDetailApi(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/save`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function listByEntity(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzBuildhouse/listByEntity`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function deletelistByEntity(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/delete`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 根据编码获取字典项
export function getUtilsItems(data) {
  return request({
    url: '/gdbpm/Utils/getItems',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 根据Id获取字典项
export function getUtilsItemsById(data) {
  return request({
    url: '/gdbpm/SysDictItem/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 根据code获取字典项
export function getUtilsItemsByCode(data) {
  return request({
    url: '/sys-system/dict/dictionary-tree',
    method: 'get',
    params: {
      ...data
    }
  })
}
