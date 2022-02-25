import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import system from './modules/system'
import logs from './modules/logs'
import getters from './getters'
import app from './modules/app'
import tagsView from './modules/tagsView'
import region from './modules/region'
import workFlowConfig from './modules/workFlowConfig'
import settings from './modules/settings'
// import { storeJSON } from '@wfmng/store'
Vue.use(Vuex)
const storeAll = {
  modules: {
    // ...storeJSON.modules,
    settings,
    tagsView,
    user,
    common,
    logs,
    system,
    app,
    region,
    workFlowConfig
  },
  getters: {
    // ...storeJSON.getters,
    ...getters
  }
}
const store = new Vuex.Store(storeAll)
export default store
