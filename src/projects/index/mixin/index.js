import { getToken, getUpmsToken } from '@modularize/util/common/auth'
import store from '@index/store'
import router from '@index/router'
export default {
  methods: {
    // 权限控制
    getLimitRoute(menus, route, appCode) {
      if (route === 'Frame/toHomePage') {
        return route
      }
      // 排序
      menus = menus.filter((res) => res.type === 'resource_menu')
      let routerList = JSON.parse(localStorage.getItem('router'))
      routerList = routerList.filter((res) => res.appCode === appCode && menus[0].id === res.meta.resourceId)
      const index = route.lastIndexOf('/')
      // 是否带参数
      if (routerList[0].meta.resourceId.includes('?')) {
        routerList[0].path = routerList[0].path + '?' + routerList[0].meta.resourceId.split('?')[1]
      }
      route = route.substring(0, index) + routerList[0].path

      return route
    },
    // 子系统跳转
    async toApp(code, app, type = false, noticeId = '') {
      let token = ''
      let route = ''
      if (app) {
        route = app.url
        if (['testing', 'staging'].includes(process.env.NODE_ENV) && app.testUrl) {
          route = app.testUrl
        }
      }
      if (store.getters.upmsToken) {
        token = getUpmsToken()
      }
      if (store.getters.token) {
        token = getToken()
      }
      // 路径参数获取
      let tokenUrlParam = `${route?.includes('?') ? '&&' : '?'}token=${encodeURI(token)}`
      // 跳转
      // if (code === 'onemap') {
      //   window.open(`${route}`)
      //   return
      // }
      if (['designer'].includes(code) || route.includes('http')) {
        window.open(`${route}${tokenUrlParam}`)
      } else {
        // 判断新系统菜单是否有权限
        const { menus } = await store.dispatch('user/getMenus', code)
        if (!menus || !menus.length) {
          this.$message.warning('该项目没有可浏览的权限页面，请联系管理员')
          return
        }

        // 权限控制
        route = this.getLimitRoute(menus, route, app.appCode)
        // 跳转类型, 数据字典打开方式(0: 跳转; 1: 弹出; 3: 独立)
        const openType = parseInt(app.openType || 0)
        const openTypeList = ['_self', '_blank']
        if (openType === 3) {
          return
        }
        if (openType === 0) {
          // 设置系统
          this.$store.dispatch('app/setSystem', code)
          // 设置最新菜单
          await store.dispatch('user/setLatestRoute', menus)
        }
        // 通知公告首页跳转
        if (type) {
          this.$router.push({
            name: 'NoticeDetail',
            query: {
              id: noticeId
            }
          })
          return
        }
        // process.env.NODE_ENV === 'development' &&
        if (route.includes('?')) {
          tokenUrlParam = ''
        }
        if (route.includes('/#/')) {
          if (process.env.NODE_ENV === 'development') {
            route = `${location.origin}/#/${route.split('/#/')[1]}${tokenUrlParam}`
          } else {
            route = `${location.origin}${route}${tokenUrlParam}`
          }
          window.open(route, openTypeList[openType])
        } else {
          if (route === 'Frame/toHomePage') {
            if (openType !== 0) {
              this.$message.warning('后台运维系统的openType参数值应为0')
              await store.dispatch('user/logout')
              return
            }
            // 运维系统跳转

            this.handleToSystemFirstChildRoute()
          }
        }
      }
    },

    // 跳转到系统第一个子路由
    handleToSystemFirstChildRoute() {
      const { add_permission_routes } = store.getters
      const firRoute = add_permission_routes[0]
      router.push({
        path: firRoute.redirect || firRoute.path
      })
    }
  }
}
