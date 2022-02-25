import listEntityList from './common'
function getDynamicRouter(Layout, menuData = [], systemName = 'system', routerRequirePath) {
  var allListNav = listEntityList(menuData, systemName, routerRequirePath)
  const arrList = [
    {
      path: '/',
      component: Layout,
      redirect: '/',
      children: allListNav
    }
  ]
  // arrList.push({
  //   path: '*',
  //   redirect: '/404',
  //   meta: {
  //     title: '404',
  //     resourceId: '404'
  //   }
  // })
  // console.log(arrList, 'arrList')
  return arrList
}
export default getDynamicRouter
