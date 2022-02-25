import { traverse } from '../common/util'
function listEntityList(menuData, systemName, routerRequirePath) {
  const routes = []
  traverse(menuData, false, function (item) {
    if (item.status === 1) {
      routes.push({
        path: getPath(item),
        name: item.menuName,
        icon: item.icon,
        meta: {
          code: item.menuCode,
          title: item.menuName,
          isTab: true,
          icon: item.icon,
          resourceId: item.id,
          type: 'dynamic'
        },
        component: getUrl(item, systemName, routerRequirePath)
      })
    }
  })
  console.log(routes, 'routesroutes')
  return routes
}

// 处理path
function getPath(item) {
  return item.path
}
// 处理链接'@sysmng/views/error-page/404'
function getUrl(data, systemName, routerRequirePath) {
  // console.log(routerRequirePath(data.path), 122222222222222222)
  try {
    return routerRequirePath(data.path)
  } catch (error) {
    // return require('@projects/system/components/error-page/404.vue').default
  }
}
export default listEntityList
