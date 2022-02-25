import request from '@index/utils/request'
const Qs = require('qs')
const serverName = 'SysOrg'

export function findById(data) {
  return request({
    url: serverName + '/findById',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 按应用编码查询单已经授权机构
export function findByAppCode(data) {
  return request({
    url: serverName + '/findByAppCode',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function hasCode(data) {
  return request({
    url: serverName + '/hasCode',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 按区划代码查询单位列表
export function listUnit(data) {
  return request({
    url: serverName + '/listUnit',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function listUnitAndUser(data) {
  return request({
    url: serverName + '/listOrgUserTree',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function listUnitTree(data) {
  data = { returnFmt: 'list' }
  return request({
    url: serverName + '/listOrgUserTree',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function orgListUnitTree(data) {
  return request({
    url: serverName + '/listOrgUserTree',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function listUnitTreeByCode(data) {
  // if (!data.isLogout) {
  //   data.isLogout = false
  // }
  return request({
    url: serverName + '/getOrgsByUnitIds',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// export function getOrgsByUnitIds(data) {
//   return request({
//     url: serverName + '/getOrgsByUnitIds',
//     method: 'post',
//     data: Qs.stringify(data)
//   })
// }
export function save(data) {
  return request({
    url: serverName + '/save',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function update(data) {
  return request({
    url: serverName + '/update',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function updateStatus(data) {
  return request({
    url: serverName + '/updateStatus',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function listOrgUserTree(data) {
  return request({
    url: serverName + '/listOrgUserTree',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function allUnitTree() {
  return request({
    url: 'org/org/sysOrg/allUnitTree',
    method: 'post'
  })
}

export function getParentUnits(data) {
  return request({
    url: '/SysOrg/getParentUnits',
    method: 'post',
    data: Qs.stringify(data)
  })
}
