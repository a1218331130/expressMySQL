import { constantRoutes } from '@/router'
// import Layout from '@/layout'
import Layout from '@/layout/sub-system'
import AppMain from '@/layout/components/AppMain'
// console.log(asyncRoutes, 'asyncRoutesasyncRoutesasyncRoutesasyncRoutes')
const formatId = (id, type = 'id', createTime = '') => {
  if (id) {
    if (type === 'id') {
      return id.includes('?') ? id.split('?')[0] : id
    }
    if (type === 'path') {
      if (id.includes('?')) {
        const pos = id.indexOf('?')
        id = id.substring(0, pos) + '/' + createTime + id.substring(pos, id.length)
      }
      // if (id.includes('url')) {
      //   const pos = id.indexOf('?')
      //   id = id.substring(0, pos) + '/' + createTime
      //   return id
      // } else {
      //   return id.replace(/\?|\=/g, '/')
      // }
      return id
      // return id.replace(/\?|\=/g, '/')
    }
  }
  return id
}

const createLastChildItem = (menuItem, routes, { id, icon, name }) => {
  // 筛选权限对应的route数组对象 && routeItem.meta.resourceId === formatId(id)
  const filterRoutes = routes.filter((routeItem) => {
    return routeItem.meta
  })
  // debugger
  // 还没有定义相应的route信息, 生成默认route
  if (!filterRoutes.length) {
  } else {
    const usedRoute = filterRoutes[0]
    menuItem.component = usedRoute.component
    const meta = {
      setIcon: icon && icon.split(' ').length === 1 ? icon : undefined,
      title: name
    }
    menuItem.meta = {
      ...meta
    }
  }

  return menuItem
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menus
 */
function filterAsyncRoutes(routes, resourceTree, appCode, menus) {
  return resourceTree
    .filter((item) => item.type === 'resource_menu' || item.type === 'resource_module')
    .map((menuItem) => {
      const { id, parentId, children } = menuItem
      // id带?特殊处理
      const idParams = {}
      if (id.includes('?')) {
        id.split('?')[1]
          .split('&')
          .forEach((str) => {
            const [key, val] = str.split('=')
            idParams[key] = val
          })
      }
      menuItem.query = idParams

      // 子节点处理
      if (children && children.length) {
        menuItem.children = filterAsyncRoutes(routes, menuItem.children, appCode)
      }

      // 默认找到该层对应的component并赋予meta属性
      menuItem = createLastChildItem(menuItem, routes, menuItem)

      if (parentId === appCode) {
        // 第一层强制重置component为Layout
        menuItem.component = Layout

        if (menuItem.children.length === 0) {
          menuItem.children = [createLastChildItem({}, routes, menuItem)]
        }
      } else if (menuItem.children && menuItem.children.length) {
        // 非第一层的父节点层级强制重置component为AppMain
        menuItem.component = AppMain
      }
      // const arr = menuItemIcon(menuItem, menus)
      // menuItem.meta.icon = arr
      // console.log(menuItem, 'menuItemmenuItemmenuItem')
      // console.log(menus, 'menusmenusmenusmenusmenus')
      return menuItem
    })
}
// 处理icon问题
// function menuItemIcon(meta, menus) {
//   const iconList = menus.filter(item => { return item.name === meta.title })
//   // console.log(iconList, 'iconListiconListiconList')
//   return iconList[0].icon
// }

// 子排序排序
const sortChildren = (children) => {
  return children.sort((obj1, obj2) => {
    const sort1 = /^\d*$/.test(obj1.sort) ? parseInt(obj1.sort, 10) : 0
    const sort2 = /^\d*$/.test(obj2.sort) ? parseInt(obj2.sort, 10) : 0
    if (sort1 < sort2) {
      return -1
    } else if (sort1 > sort2) {
      return 1
    }
    return 0
  })
}

// 路由转码
function formatRoute(route, parentPath, menus) {
  const { path, id, component, children, query, name, meta, createTime, url } = route
  // const arr = menuItemIcon(meta, menus)
  // console.log(formatId(id, 'path', createTime), 'formatIdformatIdformatId')
  // console.log(route, 'routerouterouterouteroute')
  const usedPath = path || formatId(id, 'path', createTime) || ''
  const fullPath = `${parentPath}/${usedPath}`
  let redirect = ''
  if ((children || []).length) {
    if (children.length === 1) {
      redirect = `${fullPath}`
    } else {
      redirect = `${fullPath}/${children[0].path || formatId(children[0].id, 'path')}`
    }
  }
  // console.log(children, 'sortChildren(children)sortChildren(children)')
  return {
    path: usedPath,
    name: id,
    component,
    children: children && children.length ? sortChildren(children).map((child) => formatRoute(child, fullPath, menus)) : undefined,
    redirect: redirect || undefined,
    meta: {
      props: {
        ...query
      },
      title: name,
      icon: '1233333',
      url,
      ...meta
    }
  }
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ rootGetters, commit }, menus) {
    let asyncRoutes = []
    if (localStorage.getItem('router')) {
      asyncRoutes = JSON.parse(localStorage.getItem('router'))
    }
    const { system, resourceTree } = rootGetters
    return new Promise((resolve) => {
      let accessedRoutes
      if (menus.length > 0) {
        try {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, resourceTree, system, menus)
          accessedRoutes = accessedRoutes
            .map((route) => formatRoute(route, '', menus))
            .map((route) => ({
              ...route,
              path: `/${route.path}`
            }))
        } catch (err) {
          console.error(err)
        }
      } else {
        accessedRoutes = []
      }
      // console.log(menus, 'menusmenusmenusmenus')
      // console.log(accessedRoutes, 'accessedRoutes2333')
      commit('SET_ROUTES', accessedRoutes)

      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
