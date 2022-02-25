import { listEntity } from '@index/api/system-resource'
import listEntityList from '../common'
// import store from '@wfmng/store'
// 根据当前用户所拥有的权限获取相应模块的路由
async function getCommonApi(code) {
  localStorage.setItem('appCode', code)
  const routerArr = await getRouterList(code)
  return routerArr
}
// 循环调用路由接口
async function getRouterList(appCode) {
  const data = await listEntity({
    appCode: appCode
  })
  const dataList = listEntityList(data)
  return dataList
}
export default getCommonApi
