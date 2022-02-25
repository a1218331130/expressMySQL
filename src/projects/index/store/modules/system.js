import { setStore, getStore } from '@modularize/util/common/store'
const system = {
  state: {
    systemInfo: getStore({ name: 'systemInfo' }) || {
      code: '0001'
    }
  },
  mutations: {
    SET_SYSTEM: (state, system) => {
      state.systemInfo = system
      setStore({ name: 'systemInfo', content: system, type: 'ops' })
    }
  }
}
export default system
