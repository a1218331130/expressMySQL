// import { getStore, setStore } from '../../utils/store'
import { setStore, getStore } from '@modularize/util/common/store'

const state = {
  sidebar: {
    opened: (getStore({ name: 'opened' }) + '').toString() ? getStore({ name: 'opened' }) : true,
    withoutAnimation: false
  },
  device: 'desktop',
  selectApp: getStore({ name: 'selectApp' }) || {},
  systemYear: String(new Date().getFullYear() - 1)
}

const mutations = {
  SET_SELECTAPP: (state, selectApp) => {
    state.selectApp = selectApp
    setStore({ name: 'selectApp', content: selectApp })
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      setStore({ name: 'opened', content: true })
    } else {
      setStore({ name: 'opened', content: false })
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    setStore({ name: 'opened', content: false })
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
