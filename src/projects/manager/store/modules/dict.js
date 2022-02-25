import { getStore, setStore } from '../../utils/store'

const dict = {
  state: {
    flowRoutes: getStore({ name: 'flowRoutes' }) || {}
  },
  actions: {},
  mutations: {
    SET_FLOW_ROUTES: (state, data) => {
      state.flowRoutes = data.map((item) => {
        return {
          routeKey: `${item.code}_${item.dictKey}`,
          routeValue: item.remark
        }
      })
      setStore({ name: 'flowRoutes', content: state.flowRoutes })
    }
  }
}

export default dict
