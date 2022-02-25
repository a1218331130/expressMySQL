import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '@sysTest/layout/index/'
Vue.use(VueRouter)
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export const constantRoutes = [
  {
    path: '/app',
    name: '入口页',
    component: () => import('../App.vue'),
  },
]
// 创建路由
export const createRouter = () =>
  new VueRouter({
    routes: [...constantRoutes],
  })
const Router = createRouter() // 获得 route 实例
export function resetRouter() {
  // 重置路由 比如用于身份验证失败，需要重新登录时 先清空当前的路有权限
  const newRouter = createRouter()
  Router.matcher = newRouter.matcher // reset router
}
export default Router
