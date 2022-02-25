import request from '@index/router/axios'
import Vue from 'vue'
//  校验码
export const getCaptcha = () =>
  request({
    url: Vue.prototype.auth + '/oauth/captcha',
    method: 'get'
  })
//  登录接口
export const loginByUsername = (username, password, type, key, code) =>
  request({
    url: Vue.prototype.auth + '/oauth/token',
    method: 'post',
    headers: {
      'Captcha-Key': key,
      'Captcha-Code': code
    },
    params: {
      username,
      password,
      // 区分校验码 captcha 还是 密码登录 password
      grant_type: type ? 'captcha' : 'password'
    }
  })

//  获取权限菜单
export const grantTree = () => {
  return request({
    url: Vue.prototype.system + '/menu/grant-top-tree',
    method: 'get'
  })
}
