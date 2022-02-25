
import request from '@index/utils/request'
const Qs = require('qs')
import Vue from 'vue'

// 人口情况
export function findHouseByCode(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/findHouseByCode`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// 建房需求
export function buildHouseDemand(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/findByCode`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// 用地需求
export function findTotalLandUse(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/findTotalLandUse`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// 拟建房户类型
export function findHouseType(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/findHouseType`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// 建房方式
export function findHouseMode(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/findHouseMode`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// 合并接口
export function findSummaryByCode(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/findSummaryByCode`,
        method: 'post',
        data: Qs.stringify(data)
    })
}

