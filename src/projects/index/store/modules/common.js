/*
 * @Author: tianlun
 * @Date: 2021-09-07 11:02:52
 * @LastEditTime: 2021-09-15 16:05:55
 */
import { setStore, getStore, removeStore } from '@modularize/util/common/store'
import website from '@modularize/config/website'

const common = {
  state: {
    language: getStore({ name: 'language' }) || 'zh',
    isCollapse: false,
    isFullScren: false,
    isMenu: true,
    isShade: false,
    screen: -1,
    isLock: getStore({ name: 'isLock' }) || false,
    showTag: true,
    showDebug: true,
    showCollapse: true,
    showSearch: true,
    showLock: true,
    showFullScren: true,
    showTheme: true,
    showMenu: true,
    showColor: true,
    lockPasswd: getStore({ name: 'lockPasswd' }) || '',
    website: website
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setStore({
        name: 'language',
        content: state.language
      })
    },
    SET_SHADE: (state, active) => {
      state.isShade = active
    },
    SET_COLLAPSE: state => {
      state.isCollapse = !state.isCollapse
    },
    SET_FULLSCREN: state => {
      state.isFullScren = !state.isFullScren
    },
    SET_IS_MENU: (state, menu) => {
      state.isMenu = menu
    },
    SET_LOCK: state => {
      state.isLock = true
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    SET_SCREEN: (state, screen) => {
      state.screen = screen
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    CLEAR_LOCK: state => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore({
        name: 'lockPasswd',
        type: 'session'
      })
      removeStore({
        name: 'isLock',
        type: 'session'
      })
    }
  }
}
export default common
