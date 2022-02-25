let routerStr = ''
const tagStr = ''
function listEntityList(type) {
  const routes = []
  // const routesNav = []
  this.traverse(type.data[0].children, false, function (item) {
    if (item.status === '1') {
      if (item.url !== null) {
        if (item.url.includes('views')) {
          routes.push({
            path: '/' + getPath(item, type.data[0].children),
            meta: {
              code: item.menuCode,
              title: item.name,
              icon: item.icon,
              resourceId: item.id,
              type: 'dynamic',
              isDetail: item.type === 'resource_operation', // 业务登记详情和督办详情
              totalTitle: setName(item, type.data[0].children)
            },
            name: setComponentName(item),
            component: getUrl(item.url),
            url: item.url,
            appCode: item.appCode
          })
        }
      } else {
        routes.push({
          path: '/' + getPath(item, type.data[0].children),
          name: setComponentName(item),
          meta: {
            code: item.menuCode,
            title: item.name,
            icon: item.icon,
            resourceId: item.id,
            type: 'dynamic',
            isDetail: item.type === 'resource_operation', // 业务登记详情和督办详情
            totalTitle: setName(item, type.data[0].children)
          }
        })
      }
    }
  })
  return routes
}
// 设置组件名称，用来处理组件缓存
function setComponentName(item) {
  let name = ''
  // 是否带参数
  if (item.id && item.id.includes('?')) {
    name = item.id.match(/(\S*)\?/)[1]
  } else {
    name = item.id
  }
  return name.charAt(0).toUpperCase() + name.slice(1)
}
// 设置tag上面的名称,这里只写到第二级，若有需求再递归更新
function setName(item, data) {
  let name = item.name
  const routerData = handelRouter(data)
  const routerLength = routerData.filter((res) => res.id === item.parentId)
  //
  if (routerLength.length > 0) {
    name = routerLength[0].name + ' => ' + item.name
  }
  return name
}
// 平铺菜单数据
function handelRouter(data) {
  const routesNav = []
  traverse(data, false, function (item) {
    routesNav.push(item)
  })
  return routesNav
}
// 处理多层路由问题
function getMoreRouter(data, parentId, id, parentPath = '', name = '') {
  const routerData = handelRouter(data)
  const routerLength = routerData.filter((res) => res.id === parentId)
  routerStr = `${parentId}/${id}`
  //
  if (routerLength.length > 0) {
    getMoreRouter(data, routerLength[0].parentId, routerStr, '', tagStr)
  }
  // return fullPath
}

// 处理path
function getPath(item, data) {
  let url = ''
  if (item.appCode !== item.parentId) {
    getMoreRouter(data, item.parentId, item.id, '')
    const parentUrl = item.appCode + '/'
    routerStr = routerStr.replace(parentUrl, '')
    //
    // const parentUrl = '/' + item.appCode
    url = routerStr
  } else {
    url = item.id
  }
  if (url.includes('?')) {
    const pos = url.indexOf('?')
    url = url.substring(0, pos) + '/' + item.createTime
  }
  return url
}
// 处理链接'@wfmng/views/error-page/404'
// function getUrl(data) {
//   if (data.includes('sysmng/views')) {
//     data = data.replace('sysmng/views', '')
//     try {
//       return _import[1](data)
//     } catch (error) {
//       return _import[3]('/error-page/404')
//     }
//   } else if (data.includes('wfmng/views')) {
//     data = data.replace('wfmng/views', '')
//     try {
//       return _import[2](data)
//     } catch (error) {
//       return _import[3]('/error-page/404')
//     }
//   } else if (data.includes('src/views')) {
//     data = data.replace('src/views', '')
//     try {
//       return _import[0](data)
//     } catch (error) {
//       return _import[3]('/error-page/404')
//     }
//   }
// }
export default listEntityList
// else if (data.includes('src/views-sub')) {
//   data = data.replace('src/views-sub/', '')
//   try {
//     return _import[4](data)
//   } catch (error) {
//     return _import[3]('error-page/404')
//   }
// }
