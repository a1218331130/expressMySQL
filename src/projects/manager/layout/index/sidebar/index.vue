<template>
  <div class="avue-sidebar" :style="style">
    <!-- <div style="color:white">{{ defalutTagValue }}</div> -->
    <logo />
    <el-scrollbar style="height: 100%">
      <div v-if="validatenull(menu)" class="avue-sidebar--tip">没有发现菜单</div>
      <el-menu :default-active="defalutTagValue" :show-timeout="200" :collapse="ifSideBar" unique-opened mode="vertical">
        <sidebar-item :menu="menu" :init-tag-value="defalutTagValue" :screen="screen" :props="website.menu.props" :collapse="ifSideBar" first />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from '../logo'
import sidebarItem from './sidebarItem'
import { validatenull } from '@/projects/manager/utils/validate'
export default {
  name: 'Sidebar',
  components: { sidebarItem, logo },
  data() {
    return {
      validatenull: validatenull,
      defalutTagValue: ''
    }
  },
  created() {},
  computed: {
    ...mapGetters(['website', 'menu', 'tag', 'screen', 'menuId']),
    ifSideBar() {
      return false
    },
    style() {
      return {
        background: this.siberMenuConfig.backgroundLeft
      }
    }
  },
  watch: {
    $route(to, from) {
      this.defalutTagValue = to.path
    }
  },
  mounted() {
    this.defalutTagValue = this.getDefalutTagValue()
  },
  methods: {
    getDefalutTagValue() {
      if (this.$route.path !== '/') {
        return this.$route.path
      }
      if (this.menu.length !== 0) {
        let paths = ''
        if (this.menu[0].children.length !== 0) {
          paths = this.menu[0].children[0].path
        } else {
          paths = this.menu[0].path
        }
        return paths
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
