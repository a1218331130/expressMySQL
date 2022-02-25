import request from '@index/utils/request'
export const getTopMenu = () =>
  request({
    url: Vue.prototype.system + '/menu/top-menu',
    method: 'get'
  })
