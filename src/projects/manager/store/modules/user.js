import { setToken, setRefreshToken, removeToken, removeRefreshToken } from '../../utils/auth'
import { Message } from 'element-ui'
import { setStore, getStore } from '../../utils/store'
import { isURL, validatenull } from '../../utils/validate'
import { deepClone } from '../../utils/util'
import website from '@modularize/config/website'
import { loginByUsername, loginBySocial, getUserInfo, logout, refreshToken } from '../../api/user'
import { getRoutes } from '../../api/menu'
import md5 from 'js-md5'
import dictList from '../../dictionary'
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
    tenantId: getStore({ name: 'tenantId' }) || '',
    userInfo: getStore({ name: 'userInfo' }) || [],
    permission: getStore({ name: 'permission' }) || {},
    roles: [],
    menu: getStore({ name: 'menu' }) || [],
    menuId: getStore({ name: 'menuId' }) || [],
    menuAll: getStore({ name: 'menuAll' }) || [],
    token: getStore({ name: 'token' }) || '',
    refreshToken: getStore({ name: 'refreshToken' }) || '',
    firstMenu: getStore({ name: 'firstMenu' }) || [],
    platformTitle: getStore({ name: 'platformTitle' }) || {},
    platformObj: getStore({ name: 'platformObj' }) || {},
    dictionary: getStore({ name: 'dictionary' }) || []
  },
  actions: {
    // ?????????????????????
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.tenantId, userInfo.username, md5(userInfo.password), userInfo.type, userInfo.key, userInfo.code)
          .then((res) => {
            const data = res.data
            if (data.error_description) {
              Message({
                message: data.error_description,
                type: 'error'
              })
            } else {
              commit('SET_TOKEN', data.access_token)
              commit('SET_REFRESH_TOKEN', data.refresh_token)
              commit('SET_TENANT_ID', data.tenant_id)
              commit('SET_USER_INFO', data)
              commit('DEL_ALL_TAG')
              commit('CLEAR_LOCK')
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // ?????????????????????
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then((res) => {
          const data = res.data
          commit('SET_TOKEN', data)
          commit('DEL_ALL_TAG')
          commit('CLEAR_LOCK')
          resolve()
        })
      })
    },
    // ???????????????????????????
    LoginBySocial({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginBySocial(userInfo.tenantId, userInfo.source, userInfo.code, userInfo.state).then((res) => {
          const data = res.data
          if (data.error_description) {
            Message({
              message: data.error_description,
              type: 'error'
            })
          } else {
            commit('SET_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            commit('SET_USER_INFO', data)
            commit('DEL_ALL_TAG')
            commit('CLEAR_LOCK')
          }
          resolve()
        })
      })
    },
    // ??????????????????
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const data = res.data
            commit('SET_ROLES', data.roles)
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // ??????token
    refreshToken({ state, commit }) {
      window.console.log('handle refresh token')
      return new Promise((resolve, reject) => {
        refreshToken(state.refreshToken, state.tenantId)
          .then((res) => {
            const data = res.data
            commit('SET_TOKEN', data.access_token)
            commit('SET_REFRESH_TOKEN', data.refresh_token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // ??????
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_REFRESH_TOKEN', '')
            commit('SET_MENU', [])
            commit('SET_MENU_ID', {})
            commit('SET_MENU_ALL', [])
            commit('SET_ROLES', [])
            commit('SET_TAG_LIST', [])
            commit('DEL_ALL_TAG')
            commit('CLEAR_LOCK')
            removeToken()
            removeRefreshToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // ??????session
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_MENU_ID', {})
        commit('SET_MENU_ALL', [])
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('SET_TAG_LIST', [])
        commit('DEL_ALL_TAG')
        commit('CLEAR_LOCK')
        removeToken()
        removeRefreshToken()
        resolve()
      })
    },
    // ??????????????????
    GetMenu({ commit, dispatch }, appCode) {
      return new Promise((resolve) => {
        getRoutes(appCode || website.appCode).then((res) => {
          const menu = deepClone(res.data)
          menu.forEach((ele) => {
            addPath(ele, true)
          })
          commit('SET_MENU_ALL', menu)
          commit('SET_MENU', menu)
          resolve(menu)
        })
      })
    }
  },
  mutations: {
    SET_PLATFORMTITLE: (state, data) => {
      setStore({ name: 'platformTitle', content: data, type: 'session' })
      state.platformTitle = data
    },

    /**????????????????????????
     *
     * @param {boolean}  ifLogo ????????????logo
     * @param {string} navColor ???????????????
     * @param {string} chName ???????????????
     * @param {string} enName ???????????????
     * @param {string} logo logo??????
     * @param {string} headPh ??????
     *
     */
    SET_PLATFORMOBJ: (state, data) => {
      setStore({ name: 'platformObj', content: data })
      state.platformObj = data
    },
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
      setStore({ name: 'token', content: state.token })
    },
    SET_MENU_ID(state, menuId) {
      state.menuId = menuId
      setStore({ name: 'menuId', content: state.menuId })
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll
      state.firstMenu = menuAll
      setStore({ name: 'menuAll', content: state.menuAll })
      setStore({ name: 'firstMenu', content: state.firstMenu })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({ name: 'menu', content: state.menu })
      if (validatenull(menu)) return
      // ????????????????????????
      let menuAll = state.menuAll
      menuAll = menuAll.concat(menu).reverse()
      const newMenu = []
      for (const item1 of menuAll) {
        let flag = true
        for (const item2 of newMenu) {
          if (item1.name === item2.name || item1.path === item2.path) {
            flag = false
          }
        }
        if (flag) {
          newMenu.push(item1)
        }
      }
      state.menuAll = newMenu
      setStore({ name: 'menuAll', content: state.menuAll })
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      setRefreshToken(refreshToken)
      state.refreshToken = refreshToken
      setStore({ name: 'refreshToken', content: state.refreshToken })
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId
      setStore({ name: 'tenantId', content: state.tenantId })
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
    },
    SET_DICTIONARY: (state, dictionary) => {
      setStore({ name: 'dictionary', content: dictionary })
      state.dictionary = dictionary
    }
  }
}
export default user
