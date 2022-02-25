import { getLazyList } from '@index/api/region'
import { makeMap } from '@index/utils/nornalizeRegion'
const region = {
  state: {
    regionMap: new Map(),
    regionList: [],
    regoinTree: []
  },
  mutations: {
    SET_(state, res) {
      // 过滤广东
      if (!res.data.length) {
        return
      }
      const { id, name, code } = res.data.filter(item => item.code === '44')[0]
      const temp = res.data.filter(item => item.code === '44')[0].children.filter(i => i.name === '汕尾市')
      state.regoinTree = [{ id, name, code, children: temp }]
      state.regionList = makeMap(JSON.parse(JSON.stringify(state.regoinTree)), 'id', 'name', state.regionMap)
    },
    GET_(state, status) {
      state.needTagsView = status
    }
  },
  actions: {
    // 存储区划数据
    async getLazyList({ commit }) {
      const res = await getLazyList()
      commit('SET_', res)
    }
  }
}
export default region
