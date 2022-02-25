import { default as request, getDesignerUrl } from '@projects/index/utils/request'
const Qs = require('qs')
const serverName = '/smform/bpmFormView'

export function formController(data) {
  return request({
    url: getDesignerUrl() + serverName + '/getFormAttr',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function delByPk(data) {
  return request({
    url: getDesignerUrl() + serverName + '/delData',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function saveSingleData(data) {
  return request({
    url: getDesignerUrl() + serverName + '/saveData',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// //  获取表单信息
// export function taskFormData(data) {
//   return request({
//     url: getDesignerUrl() + serverName + `/taskFormData`,
//     method: 'get'
//     // data: Qs.stringify(data)
//   })
// }
