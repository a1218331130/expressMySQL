import request from '@index/utils/request'
// const Qs = require('qs')
import Vue from 'vue'

export const getLazyTree = (parentCode, params) => {
    return request({
        url: Vue.prototype.system + '/region/lazy-tree',
        method: 'get',
        params: {
            ...params,
            parentCode
        }
    })
}
export const getLazyList = (params) => {
    return request({
        url: Vue.prototype.system + '/region/lazy-list',
        method: 'get',
        params
    })
}
// 获取行政区 筛选广东省和汕尾市
export const getSWRegion = () => {
    return request({
        url: Vue.prototype.system + '/region/lazy-list',
        method: 'get',
    }).then(res => {
        // 广东
        let gdRgion = res.data.filter(item => item.name === '广东省')
        // 汕尾
        if (gdRgion && gdRgion.length && gdRgion[0].children) {
            let swRgion = gdRgion[0].children.filter(item => item.name === '汕尾市')
            gdRgion[0].children = swRgion;
            return gdRgion;
        } else {
            return []
        }
    })
}
