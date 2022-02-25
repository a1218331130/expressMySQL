/**
 * 全站权限配置
 *
 */
import router from './router'
import store from './store'
import Layout from './layout/index'
import getDynamicRouter from '@modularize/util/dymamicRouting'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    //如果登录成功访问登录页跳转到主页
    next({ path: '/' })
  } else {
    next()
  }
})
function getRequire(path) {
  return require(`@projects/manager/views${path}.vue`).default
}
router.onReady((to, from) => {
  store.dispatch('GetMenu', '0008').then(async (data) => {
    if (to.path === '/') {
      let paths = ''
      if (data.length !== 0) {
        if (data[0].children.length !== 0) {
          paths = data[0].children[0].path
        } else {
          paths = data[0].path
        }
      }
      router.push({ path: paths })
    } else {
      router.push({ path: to.path })
    }
    router.addRoutes(getDynamicRouter(Layout, data, '', getRequire))
  })
})
router.afterEach(() => {
  NProgress.done()
  // let title = store.getters.tag.label
  // let i18n = ''
  // if (store.getters.tag.meta) store.getters.tag.meta.i18n
  // title = router.$avueRouter.generateTitle(title, i18n)
  // //根据当前的标签也获取label的值动态设置浏览器标题
  // router.$avueRouter.setTitle(title)
})
