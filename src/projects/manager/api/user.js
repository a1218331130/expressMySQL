import request from '../utils/axios'
import website from '@modularize/config/website'
import Vue from 'vue'
export const loginByUsername = (tenantId, username, password, type, key, code) =>
  request({
    url: Vue.prototype.auth + '/oauth/token',
    method: 'post',
    headers: {
      'Tenant-Id': tenantId
      // 'Captcha-Key': key,
      // 'Captcha-Code': code
    },
    params: {
      tenantId,
      username,
      password,
      grant_type: website.captchaMode ? 'captcha' : 'password',
      scope: 'all',
      type
    }
  })

export const loginBySocial = (tenantId, source, code, state) =>
  request({
    url: Vue.prototype.auth + '/oauth/token',
    method: 'post',
    headers: {
      'Tenant-Id': tenantId
    },
    params: {
      tenantId,
      source,
      code,
      state,
      grant_type: 'social',
      scope: 'all'
    }
  })

export const refreshToken = (refresh_token, tenantId) =>
  request({
    url: Vue.prototype.auth + '/oauth/token',
    method: 'post',
    headers: {
      'Tenant-Id': tenantId
    },
    params: {
      tenantId,
      refresh_token,
      grant_type: 'refresh_token',
      scope: 'all'
    }
  })

export const registerGuest = (form, oauthId) =>
  request({
    url: Vue.prototype.system + '/register-guest',
    method: 'post',
    params: {
      tenantId: form.tenantId,
      name: form.name,
      account: form.account,
      password: form.password,
      oauthId
    }
  })

export const getCaptcha = () =>
  request({
    url: Vue.prototype.auth + '/oauth/captcha',
    method: 'get'
  })

export const logout = () =>
  request({
    url: Vue.prototype.auth + '/oauth/logout',
    method: 'get'
  })

export const getUserInfo = () =>
  request({
    url: Vue.prototype.auth + '/oauth/user-info',
    method: 'get'
  })

export const sendLogs = (list) =>
  request({
    url: Vue.prototype.auth + '/oauth/logout',
    method: 'post',
    data: list
  })

export const clearCache = () =>
  request({
    url: Vue.prototype.auth + '/oauth/clear-cache',
    method: 'get'
  })
