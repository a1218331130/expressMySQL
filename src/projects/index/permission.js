/*
 * @Author: tianlun
 * @Date: 2021-09-07 11:02:52
 * @LastEditTime: 2021-09-15 15:43:45
 */

import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@modularize/util/common/auth' // get token from cookie
import router from '@index/router'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login', '/info', '/auth-redirect', '/transfer', '/located'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  store.dispatch('settings/getPrintParms', {})
  store.dispatch('settings/getCurrentAttTabTreeData', [])
  NProgress.start()

  document.title = 22 || '国地业务流程定制平台12'
  //判断 是否有token
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.onReady((to, from) => {
  // 刷新页面
  // if (!to.path.includes('page-change')) {
  //   router.push(`/page-change?reflesh=${to.path}&&query=${JSON.stringify(to.query)}`)
  // }
})
router.afterEach(() => {
  NProgress.done()
})
