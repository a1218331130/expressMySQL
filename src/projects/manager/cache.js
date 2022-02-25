import Vue from 'vue'
import store from './store';
Vue.mixin({
  // 清除已关闭标签的组件缓存
  beforeRouteLeave: function (to, from, next) {
    if (this.$route.meta.$keepAlive === true) {
      const result = store.state.tags.tagList.some(ele => {
        return ele.value === this.$route.fullPath;
      });
      if (!result && this.$vnode.parent) {
        let componentKey = this.$vnode.tag.split('-').pop()
        delete this.$vnode.parent.componentInstance.cache[componentKey]
      }
    }
    next();
  },
});
