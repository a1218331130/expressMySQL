import { setToken, setRefreshToken, removeToken, removeRefreshToken } from '@modularize/util/common/auth'
import { Message } from 'element-ui'
import { setStore, getStore } from '@modularize/util/common/store'
import { isURL, validatenull } from '@/projects/index/utils/validate'
import website from '@modularize/config/website'
import { loginByUsername } from '@/projects/index/api/login/index'
import { getTopMenu } from '@projects/index/api/menu.js'
import md5 from 'js-md5'
function addPath(ele, first) {
  const menu = website.menu
  const propsConfig = menu.props
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon]
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
  if (!isChild) ele[propsDefault.children] = []
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach((child) => {
      addPath(child)
    })
  }
}

const user = {
  state: {
    userInfo: getStore({ name: 'userInfo' }) || [],
    permission: getStore({ name: 'permission' }) || {},
    roles: [],
    menu: getStore({ name: 'menu' }) || [],
    menuId: getStore({ name: 'menuId' }) || [],
    token: getStore({ name: 'token' }) || '',
    refreshToken: getStore({ name: 'refreshToken' }) || '',
    platformTitle: getStore({ name: 'platformTitle' }) || {},
    dictionary: {},
    subSystemMemu: getStore({ name: 'subMenu' }) || [],
    platformObj: getStore({ name: 'platformObj' }) || {}
  },
  actions: {
    // 根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.username, md5(userInfo.password), userInfo.type, userInfo.key, userInfo.code)
          .then((res) => {
            const data = res.data.data
            if (data.error_description) {
              Message({
                message: data.error_description,
                type: 'error'
              })
              reject(res)
            } else {
              commit('SET_TOKEN', data.access_token)
              commit('SET_REFRESH_TOKEN', data.refresh_token)
              commit('SET_USER_INFO', res.data)
              commit('CLEAR_LOCK')
            }
            resolve(res)
          })
          .catch((error) => {
            const statusWhiteList = website.statusWhiteList || []
            // 如果在白名单里则自行catch逻辑处理
            const data = error?.data?.data
            if (statusWhiteList.includes(error?.data?.code)) {
              commit('SET_TOKEN', data.access_token)
              commit('SET_REFRESH_TOKEN', data.refresh_token)
              commit('SET_USER_INFO', error.data)
              commit('CLEAR_LOCK')
            }
            reject(error)
          })
      })
    },
    // get userinfo
    getCurrentUser({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {})
    },
    // 根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then((res) => {
          const data = res.data.data
          commit('SET_TOKEN', data)
          commit('CLEAR_LOCK')
          resolve()
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {})
    },
    // 刷新token
    refreshToken({ state, commit }) {
      window.console.log('handle refresh token')
      return new Promise((resolve, reject) => {
        // refreshToken(state.refreshToken)
        //   .then((res) => {
        //     const data = res.data.data
        //     commit('SET_TOKEN', data.access_token)
        //     commit('SET_REFRESH_TOKEN', data.refresh_token)
        //     resolve()
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
    // remove token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        // logout()
        //   .then(() => {
        //     clearStore({ type: 1 })
        //     clearStore()
        //     removeToken()
        //     removeRefreshToken()
        //     resolve()
        //   })
        //   .catch(() => {
        //     clearStore({ type: 1 })
        //     clearStore()
        //     removeToken()
        //     removeRefreshToken()
        //     resolve()
        //   })
      })
    },
    // 注销session
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_MENU_ID', {})
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('SET_TAG_LIST', [])
        commit('CLEAR_LOCK')
        removeToken()
        removeRefreshToken()
        resolve()
      })
    },
    // 获取顶部菜单
    GetTopMenu() {
      return new Promise((resolve) => {
        getTopMenu().then((res) => {
          const data = res.data.data || []
          resolve(data)
        })
      })
    },
    // 获取子系统
    getSubSystem({ commit }) {
      return new Promise((resolve) => {
        // getLazyList('0').then((res) => {
        //   const data = res.data.data || []
        //   commit('SET_SUB_SYS', data)
        //   resolve(data)
        // })
      })
    },

    // 获取系统菜单
    GetMenu({ commit, dispatch }, appCode) {
      return new Promise((resolve, reject) => {
        // getRoutes(appCode || website.appCode)
        //   .then((res) => {
        //     const data = res.data.data
        //     const menu = deepClone(data)
        //     menu.forEach((ele) => {
        //       addPath(ele, true)
        //     })
        //     commit('SET_MENU', menu)
        //     resolve(menu)
        //   })
        //   .catch((err) => {
        //     reject(new Error(err))
        //   })
      })
    },
    // get latest menus(no change role)
    getLatestMenus({ commit, dispatch }, appCode) {
      return new Promise(async (resolve) => {
        const { menus } = await dispatch('getMenus', appCode)
        await dispatch('setLatestRoute', menus)
        resolve(menus)
      })
    },

    // set latest route
    setLatestRoute({ commit, dispatch }, menus) {
      return new Promise(async (resolve) => {
        // resetRouter()
        await dispatch('permission/generateRoutes', menus, {
          root: true
        })
        // generate accessible routes map based on roles
        // const accessRoutes = await dispatch('permission/generateRoutes', menus, {
        //   root: true
        // })
        // router.addRoutes(accessRoutes)
        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, {
          root: true
        })
        resolve()
      })
    }
  },
  mutations: {
    /** 设置平台信息缓存
     *
     * @param {boolean}  ifLogo 是否显示logo
     * @param {string} navColor 导航栏颜色
     * @param {string} chName 平台中文名
     * @param {string} enName 平台英文名
     * @param {string} logo logo地址
     * @param {string} headPh 头像
     *
     */
    SET_PLATFORMOBJ: (state, data) => {
      setStore({ name: 'platformObj', content: data })
      state.platformObj = data
    },
    SET_SUB_SYS: (state, val) => {
      setStore({ name: 'subMenu', content: val })
      state.subSystemMemu = val
    },
    SET_DICTIONARY: (state, dictionary) => {
      setStore({ name: 'dictionary', content: dictionary })
      state.dictionary = dictionary
    },
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
      // state.userInfo = userInfo
      setStore({ name: 'userInfo', content: state.userInfo })
    },
    SET_PLATFORMTITLE: (state, data) => {
      setStore({ name: 'platformTitle', content: data, type: 'session' })
      state.platformTitle = data
    },
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
      setStore({ name: 'token', content: state.token })
    },
    SET_zjd_TOKEN: (state, token) => {
      state.zjdtoken = token
      setStore({ name: 'token', content: state.token })
    },
    SET_MENU_ID(state, menuId) {
      state.menuId = menuId
      setStore({ name: 'menuId', content: state.menuId })
    },

    SET_MENU: (state, menu) => {
      state.menu = menu
      // setStore({ name: 'menu', content: state.menu }) // 宅基地菜单
      setStore({ name: 'menu', content: state.menu })
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      setRefreshToken(refreshToken)
      state.refreshToken = refreshToken
      setStore({ name: 'refreshToken', content: state.refreshToken })
    },

    SET_USER_INFO: (state, userInfo) => {
      if (validatenull(userInfo.avatar)) {
        userInfo.avatar = '/img/bg/img-logo.png'
      }

      state.userInfo = userInfo
      setStore({ name: 'userInfo', content: state.userInfo })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSION: (state, permission) => {
      const result = []

      function getCode(list) {
        list.forEach((ele) => {
          if (typeof ele === 'object') {
            const chiildren = ele.children
            const code = ele.code
            if (chiildren) {
              getCode(chiildren)
            } else {
              result.push(code)
            }
          }
        })
      }

      getCode(permission)
      state.permission = {}
      result.forEach((ele) => {
        state.permission[ele] = true
      })
      setStore({ name: 'permission', content: state.permission })
    }
  }
}
export default user
