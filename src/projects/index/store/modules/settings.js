import defaultSettings from '@index/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  printParms: {}
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  GET_PRINT_PARMS: (state, newObj) => {
    state.printParms = newObj
  },
  Get_Current_AttTab_TreeData: (state, newObj) => {
    state.currentAttTabTreeData = newObj
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  getPrintParms({ commit }, data) {
    commit('GET_PRINT_PARMS', data)
  },
  getCurrentAttTabTreeData({ commit }, data) {
    commit('Get_Current_AttTab_TreeData', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
