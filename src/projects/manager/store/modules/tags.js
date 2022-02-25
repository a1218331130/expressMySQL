import md5 from 'js-md5'
const tagList = {
  state: {
    visitedViews: [],
    cachedViews: [],
    showa: false,
    ifSideBar: false
  },
  mutations: {
    TOGGLE_SIDEBAR: (state, bol) => {
      state.ifSideBar = bol
    },
    ADD_VISITED_VIEW: (state, view) => {
      let title = 'no-name'
      let view_new = {
        ...view.meta,
        fullPath: view.fullPath,
        query: view.query,
        path: view.path
      }
      if (view.meta.title) {
        title = view.meta.title
      }
      if (view.query && view.query.tag) {
        title = `${view.query.tag}`
      }
      const key = getViewKey(view)
      if (state.visitedViews.some(v => v._key === key)) {
        const index = state.visitedViews.findIndex(v => v._key === key)
        state.visitedViews.splice(index, 1, {
          ...view,
          title,
          _key: key
        })
        return
      }
      if (title === 'no-name') {
        return
      }
      state.visitedViews.push(
        Object.assign({}, view_new, {
          title,
          _key: key
        })
      )
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name) || state.cachedViews.includes(view.meta.routerName)) return
      if (!view.meta.noCache) {
        if (view.name) {
          state.cachedViews.push(view.name)
        } else if (view.meta.routerName) {
          state.cachedViews.push(view.meta.routerName)
        }
      }
    },

    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v._key === view._key) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.fullPath === view.fullPath
      })
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, index + 1)
          break
        }
      }
    },

    DEL_ALL_VISITED_VIEWS: state => {
      // keep affix tags
      // const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
      state.visitedViews = []
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = []
    },

    UPDATE_VISITED_VIEW: (state, view) => {
      const key = getViewKey(view)

      for (let v of state.visitedViews) {
        if (v._key === key) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  },
  actions: {
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },

    delView({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delVisitedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', view)
        resolve([...state.visitedViews])
      })
    },
    delCachedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_CACHED_VIEW', view)
        resolve([...state.cachedViews])
      })
    },

    delOthersViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delOthersVisitedViews', view)
        dispatch('delOthersCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
      })
    },

    delAllViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view)
        dispatch('delAllCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    delAllCachedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    },

    updateVisitedView({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view)
    }
  }
}

const getViewKey = view => {
  return md5(
    JSON.stringify({
      query: view.query,
      title: view.title,
      fullPath: view.fullPath,
      path: view.path
    })
  )
}

export default tagList
