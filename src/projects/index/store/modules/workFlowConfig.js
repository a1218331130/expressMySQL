import { getUtilsItems, getUtilsItemsById, getUtilsItemsByCode } from '@index/api/house.js'
// import { makeMap } from '@index/utils/nornalizeRegion'
const workFlowConfig = {
  state: {
    // regionMap: new Map(),
    // regionList: [],
    // regoinTree: []
    schemeConfig: []
  },
  mutations: {
    SET_SCHEME_CONFIG_(state, res) {
      res.map(item => {
        item.text = item.dictValue
        item.code = item.dictKey
        return item
      })
      state.schemeConfig = res
    },
    GET_SCHEME_CONFIG_(state, res) {
      state.schemeConfig = res
    }
  },
  actions: {
    // 宅基地方案配置信息
    async getSolidConfig_({ commit }) {
      // const res0 = await getUtilsItems({ types: 'ZJDFAPZ' })
      getUtilsItemsByCode({ typeCode: 'ZJDFAPZ' }).then(res => {
        commit('SET_SCHEME_CONFIG_', res.data)
      })
    }
  }
}
export default workFlowConfig
