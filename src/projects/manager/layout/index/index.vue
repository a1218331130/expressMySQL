<template>
  <div class="avue-contail" :class="{ 'avue--collapse': ifSideBar }">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top ref="top" />
    </div>
    <div class="avue-layout">
      <div class="avue-main">
        <div class="avue-left">
          <sidebar />
        </div>
        <tags v-show="siberMenuConfig.isNeedTag" />
        <div style="height: calc(100% - 48px); overflow-y: auto; overflow-x: hidden" id="avue-view">
          <keep-alive>
            <router-view class="avue-view" v-if="$route.meta.$keepAlive" :key="$route.fullPath" />
          </keep-alive>
          <router-view class="avue-view" v-if="!$route.meta.$keepAlive" :key="$route.fullPath" />
        </div>
      </div>
    </div>
    <!-- <div class="avue-shade" @click="showCollapse"></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tags from './TagsView'
import top from './top/'
import sidebar from './sidebar/'
export default {
  components: {
    top,
    tags,
    sidebar
  },
  provide() {
    return {}
  },
  data() {
    return {
      //搜索控制
      isSearch: false
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(['isMenu', 'menu']),
    ifSideBar() {
      return this.$store.state.tags.ifSideBar
    }
  },
  props: [],
  methods: {
    showCollapse() {
      this.$store.commit('SET_COLLAPSE')
      // console.log(commit,'commit')
    }
  }
}
</script>
<style>
.avue-view {
  height: 100%;
  background: white;
  padding: 20px;
}
</style>
