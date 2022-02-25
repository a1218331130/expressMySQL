import request from '@index/utils/request'
const Qs = require('qs')
import Vue from 'vue'
// 需求填报
// 新增
export function xqtbAdd(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/save`,
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'application/json' }
    })
}
// 列表查询
export function xqtbList(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/listByEntity`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// 单数据查询
export function xqtbDetail(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/findById`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// 删除
export function xqtbDelete(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/delete`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// 编辑
export function xqtbUpdate(data) {
    return request({
        url: Vue.prototype.gdbpm + `/BsXzJfxq/update`,
        method: 'post',
        data: data,
        headers: { 'Content-Type': 'application/json' }
    })
}
