/**
 * 资格权管理模块api
 */
// import { post } from '@index/utils/generalRequest'
// import { getDesignerUrl } from '@index/utils/request'
import request from '@index/utils/request'
const Qs = require('qs')
import Vue from 'vue'
// const designerUrl = getDesignerUrl()
/**
 * 更新资格权管理详情
 */
// export const updateQualificationDetailApi = (data, { ...options } = {}) =>
//   post({
//     url: `/BsXzQualification/update`,
//     data,
//     ...options
//   })

/**
 * 新增资格权管理详情
 */
// export const saveQualificationDetailApi = (data, { ...options } = {}) =>
//   post({
//     url: `/BsXzQualification/save`,
//     data,
//     ...options
//   })
/**
 * 更新资格权管理详情
 */
export function updateQualificationDetailApi(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/update`,
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'application/json' }
  })
}
/**
 * 新增资格权管理详情
 */
export function saveQualificationDetailApi(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/save`,
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'application/json' }
  })
}
export function listByEntity(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/listByEntity`,
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
export function findById(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/findById`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 获取户主
export function findName(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/findName`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 迁出
export function deleteFamily(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/deleteFamily`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 分户
export function deleteProperty(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/deleteProperty`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 查询变更记录
export function findByParentId(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/findByParentId`,
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 关联农村经济组织
export function findByCode(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsRuralEconomy/findByCode`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 生成农户代码
export function getFarmerCode(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/getFarmerCode`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 回收农户代码
export function addFarmerCode(data) {
  return request({
    url: Vue.prototype.gdbpm + `/BsXzQualification/addFarmerCode`,
    method: 'post',
    data: Qs.stringify(data)
  })
}
