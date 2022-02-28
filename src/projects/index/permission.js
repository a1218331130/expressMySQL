import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from '@index/router'

NProgress.configure({
  showSpinner: false
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = 22 || '国地业务流程定制平台12'
  next()
})
router.onReady((to, from) => {})
router.afterEach(() => {
  NProgress.done()
})
