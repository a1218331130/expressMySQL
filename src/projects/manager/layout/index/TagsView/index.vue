<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @contextmenu.prevent.native="openMenu($event)">
      <hamburger v-show="siberMenuConfig.isNeedCollage" id="hamburger-container" :is-active="ifSideBar" class="hamburger-container" @toggleClick="toggleSideBar" />
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag._key"
        :data-id="tag._key"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :title="tag.title"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
      >
        <span v-html="getTitle(tag)"> </span>
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>

    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="closeOthersTags">关闭其他标签页</li>
      <li @click="closeAllTags(selectedTag)">关闭所有标签页</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import Hamburger from './hamburger'
// import Mixin from '@/mixin'
import md5 from 'js-md5'
export default {
  components: { ScrollPane, Hamburger },
  // mixins: [Mixin],
  props: {
    showTag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      visitedList: [],
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },

  computed: {
    visitedViews() {
      return this.$store.state.tags.visitedViews
    },
    ifSideBar() {
      return this.$store.state.tags.ifSideBar
    },
    currentRouteKey() {
      return md5(
        JSON.stringify({
          query: this.$route.query,
          title: this.$route.title,
          fullPath: this.$route.fullPath,
          path: this.$route.path
        })
      )
    }
  },
  watch: {
    $route(to, from) {
      if (this.visitedViews.length > 0 && this.visitedViews[0].fullPath === to.fullPath) {
        this.$router.push({
          path: to.path,
          query: this.visitedViews[0].query
        })
      }
      this.addTags(to)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addTags()
  },
  methods: {
    // 获取标题
    getTitle(item) {
      return item.title
    },
    // 高亮标题
    isActive(route) {
      return route._key === this.currentRouteKey
    },
    // 添加tag
    addTags(params = this.$route) {
      const { path } = this.$route
      if (path) {
        this.$store.dispatch('addView', params)
      }
      return false
    },
    // 移到当前选中的tag
    closeSelectedTag(view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        console.log(visitedViews, 'visitedViewsvisitedViewsvisitedViews')
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    // 关闭其他的tag
    closeOthersTags() {
      this.$store.dispatch('delOthersViews', this.$route).then(() => {
        this.$router.push({ path: this.$route.fullPath })
      })
    },
    // 关闭所有的tag
    closeAllTags(view) {
      this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      if (visitedViews.length === 0) {
        this.handleToSystemFirstChildRoute()
        return
      }
      const latestView = visitedViews.slice(-1)[0]

      if (!latestView.title.includes('[Home]') && latestView.title !== 'Home') {
        this.$router.push(latestView)
      } else {
        this.handleToSystemFirstChildRoute()
      }
    },
    // 跳转到系统第一个子路由
    handleToSystemFirstChildRoute() {
      const { menu } = this.$store.getters
      let paths = ''
      if (menu.length !== 0) {
        if (menu[0].children.length !== 0) {
          paths = menu[0].children[0].path
        } else {
          paths = menu[0].path
        }
      }
      this.$router.push({
        path: paths
      })
    },
    // 右键
    openMenu(e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY - 40
      this.visible = true
      // this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    toggleSideBar() {
      this.$store.commit('TOGGLE_SIDEBAR', !this.ifSideBar)
    }
  }
}
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      border: 1px solid #dcdfe6;
      color: gray;
      border-radius: 5px;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      max-width: calc(100% / 2);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        // background-color: rgba(85, 128, 235, 0.1);
        color: #1e81f1;
        border-color: #1e81f1;
        &::before {
          content: '';
          background: #1e81f1;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .detail-font {
        font-size: 14px;
      }
    }

    .hamburger-container {
      line-height: 33px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      // &:hover {
      //   background: #1e81f1;
      // }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    padding-right: 18px !important;

    .el-icon-close {
      position: absolute;
      right: 3px;
      top: 8px;
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #1e81f1;
        color: #fff;
      }
    }
  }
}
</style>
