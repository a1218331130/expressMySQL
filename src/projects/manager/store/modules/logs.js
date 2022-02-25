import { setStore, getStore } from '../../utils/store'

const logs = {
  state: {
    logsList: getStore({ name: 'logsList' }) || []
  },
  actions: {},
  mutations: {
    ADD_LOGS: (state, { type, message, stack, info }) => {
      setStore({ name: 'logsList', content: state.logsList })
    },
    CLEAR_LOGS: state => {
      state.logsList = []
      setStore({ name: 'logsList', content: state.logsList })
    }
  }
}

export default logs
