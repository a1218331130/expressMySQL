import { default as request, getDesignerUrl } from '@index/utils/request'
const Qs = require('qs')
const serverName = 'SysFile'

// 根据文件路径下载文件
export function downloadFileByFilePath(data) {
  return request({
    url: getDesignerUrl() + `/sysFileInfo/down`,
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}
export function downloadFileById(data) {
  return request({
    url: getDesignerUrl() + `/sysFileInfo/down`,
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}
// // 根据文件路径下载文件
// export function downTemporaryFile(data) {
//   return request({
//     url: getDesignerUrl() + `/sysFileInfo/downTemporaryFile`,
//     method: 'post',
//     data: Qs.stringify(data),
//     responseType: 'blob'
//   })
// }
// 根据文件路径下载文件
export function downTemporaryFile(data) {
  return request({
    url: getDesignerUrl() + `/sysFileInfo/down`,
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}
export function getExchangeToken(data) {
  return request({
    url: getDesignerUrl() + `/OtherExpand/getExchangeToken`,
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}
// 预览pdf && word
export function pdfView(data) {
  return request({
    url: getDesignerUrl() + `/OtherExpand/pdfView`,
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}

// 批量下载
export function batchDownload(data) {
  return request({
    url: getDesignerUrl() + serverName + '/batchDownload',
    method: 'post',
    data: Qs.stringify(data),
    responseType: 'blob'
  })
}

// 附件删除
export function deleteFile(params) {
  return request({
    url: getDesignerUrl() + serverName + '/delete',
    method: 'post',
    params
  })
}
// word转成pdf
export function docxToPdfView(data) {
  return request({
    url: getDesignerUrl() + '/OtherExpand/docxToPdfView',
    method: 'post',
    responseType: 'blob',
    data: Qs.stringify(data)
  })
}

// 上传安卓安装包
export function uploadAndroid(data) {
  // console.log(data)
  return request({
    url: getDesignerUrl() + '/OtherExpand/uploadApp',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 安卓App版本号
export function getAppVersion() {
  return request({
    url: getDesignerUrl() + '/OtherExpand/getAppVersion',
    method: 'get'
  })
}
