<template>
  <!-- 
      添加判断设置的时候方便预览
      navObjs 是父节点传的参数,
      navObj 是缓存计算属性
   -->
  <div :style="{ background: navObjs.background }" class="top" id="top">
    <div class="info_title_left" id="info_title_left">
      <img v-show="navObjs.isLogo" :src="navObjs.logoUrl" class="logo" />
      <span class="navTitle">
        {{ navObjs.menuTitle }}
      </span>
      <span v-if="navObjs.needChildTitle" style="margin-left: 10px">|</span>
      <span v-if="navObjs.needChildTitle" class="navSysTitle">
        {{ navObjs.menuChildTitle }}
      </span>
    </div>
    <div v-if="navObjs.menuShowType === 'topList'" class="top-bar__title" id="top-bar__title">
      <div class="top-bar__item" style="background: none">
        <top-list ref="topMenu" />
      </div>
    </div>
    <div class="top-bar__right" id="top-bar__right">
      <div v-if="navObjs.menuShowType === 'topMenu'" class="top-bar__item" title="切换" style="background: none">
        <top-menu ref="topMenu" />
      </div>
      <div v-if="navObjs.needFullScreen" :title="isFullScren ? '全屏' : '退出全屏'" class="top-bar__item circle">
        <i :class="isFullScren ? 'iconfont-sys icoywtuichuquanping' : 'iconfont-sys icoywquanping'" @click="handleScreen" />
      </div>
      <div class="top-bar__item" style="background: none">|</div>
      <div class="top-bar__item user-info">
        <el-dropdown trigger="click">
          <div style="padding-right: 10px">
            <i class="iconfont-sys icoywyonghuguanli" style="padding: 0 6px 0 15px; color: #fff" />
            <span class="el-dropdown-link"> 管理员 </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item />
            <el-dropdown-item>
              <router-link to="/info/index">管理员</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div :title="'退出'" class="top-bar__item circle">
        <i class="el-icon-switch-button" @click="logout" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import topMenu from './top-menu'
import topList from './top-list'
import { menuList } from '../menu'
import siberMenuConfig from '../../../config/siber-menu.config'
export default {
  name: 'Top',
  components: {
    topMenu,
    topList
  },
  filters: {},
  props: {
    navObjs: {
      type: Object,
      default: () => {
        return siberMenuConfig
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['userInfo', 'isFullScren'])
  },
  created() {},
  mounted() {
    menuList('top', 'info_title_left', 'top-bar__title', 'top-bar__right', this)
    window.onresize = () => {
      menuList('top', 'info_title_left', 'top-bar__title', 'top-bar__right', this)
    }
  },

  methods: {
    handleScreen() {},
    setCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    setScreen() {
      this.$store.commit('SET_FULLSCREN')
    },
    logout() {
      this.$confirm('退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '退出登录中,请稍后。。。',
          spinner: 'el-icon-loading'
        })
        this.$store
          .dispatch('LogOut')
          .then(() => {
            sessionStorage.removeItem('noTenantId')
            loading.close()
            window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/'
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '退出失败'
            })
            loading.close()
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
