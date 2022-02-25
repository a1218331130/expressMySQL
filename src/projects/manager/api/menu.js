import request from '../utils/axios'
import Vue from 'vue'
export const getList = (current, size, params) => {
  return request({
    url: '/menu/list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}

export const getLazyList = (parentId, params) => {
  return request({
    url: '/menu/lazy-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}

export const getLazyMenuList = (parentId, params) => {
  return request({
    url: '/menu/lazy-menu-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}

export const getMenuList = (current, size, params) => {
  return request({
    url: '/menu/menu-list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}

export const getMenuTree = (tenantId) => {
  return request({
    url: '/menu/tree',
    method: 'get',
    params: {
      tenantId
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/menu/remove',
    method: 'post',
    params: {
      ids
    }
  })
}

export const add = (row) => {
  return request({
    url: '/menu/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/menu/submit',
    method: 'post',
    data: row
  })
}

export const getMenu = (id) => {
  return request({
    url: '/menu/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const getRoutes = (menuCode) =>
  request({
    url: '/menu/routesByMenuCode',
    method: 'get',
    params: {
      menuCode
    }
  })

export const dictionary = (code) =>
  request({
    url: '/dict/dictionary',
    method: 'get',
    params: {
      code
    }
  })
