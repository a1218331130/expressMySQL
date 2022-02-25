<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item['children']) && vaildRoles(item)" :index="item['path']" @click="open(item)" :key="item['menuName']">
        <i :class="item['icon']"></i>
        <span slot="title" :alt="item['path']">{{ generateTitle(item) }}</span>
      </el-menu-item>
      <el-submenu v-else-if="!validatenull(item['children']) && vaildRoles(item)" :index="item['path'] === '' ? item['menuName'] : item['path']" :key="item['menuName']">
        <template slot="title">
          <i :class="item['icon']"></i>
          <span slot="title" :class="{ 'el-menu--display': collapse && first }">{{ generateTitle(item) }}</span>
        </template>
        <template v-for="(child, cindex) in item['children']">
          <el-menu-item
            :index="child['path'] || cindex"
            @click="open(child)"
            v-if="validatenull(child['children'])"
            :key="child['menuName']"
            :class="{ 'is-active': vaildAvtive(child) }"
          >
            <i :class="child['icon']"></i>
            <span slot="title">{{ generateTitle(child) }}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex" :props="props" :screen="screen" :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validatenull } from '@/projects/manager/utils/validate'

export default {
  name: 'sidebarItem',
  data() {
    return {}
  },
  props: {
    menu: {
      type: Array
    },
    screen: {
      type: Number
    },
    first: {
      type: Boolean,
      default: false
    },
    initTagValue: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    collapse: {
      type: Boolean
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {
    generateTitle(item) {
      return item.menuName
    },
    vaildAvtive(item) {
      const groupFlag = (item['group'] || []).some((ele) => this.$route.path.includes(ele))
      return this.initTagValue === item['path'] || groupFlag
    },
    vaildRoles(item) {
      item.meta = item.meta || {}
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true
    },
    validatenull(val) {
      return validatenull(val)
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit('SET_COLLAPSE')
      this.$router.push({
        path: item.path,
        query: item.query
      })
    }
  }
}
</script>
