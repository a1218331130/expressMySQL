<template>
  <div class="top-nav-bar">
    <div class="nav-btn" @mouseenter="show = true" @mouseleave="show = false">
      <div class="active-menu menu-item-title" :style="{ background: show ? '#008CE5' : '' }">
        <!-- <i :class="selectApp.source"></i>
        <span>{{ selectApp.name }}</span> -->
        <!-- <i class="el-icon-circle-plus-outline"></i> -->
        <span>
          工程demo
          <i class="el-icon-arrow-down"></i>
        </span>
      </div>
      <transition name="el-fade-in-linear">
        <div v-show="show" class="menu-wrapper">
          <div @click="toPage(item)" class="menu-item menu-item-box" :style="{ background: `url(${item.background})` }" v-for="(item, index) in menuList" :key="index">
            <i :class="item.source"></i>
            <span :title="item.name">{{ item.name }}</span>
          </div>
        </div>
      </transition>
    </div>

    <!-- <transition name="el-fade-in">
        <div v-show="show" class="transition-box">.el-fade-in</div>
      </transition> -->
    <!-- <div class="nav-item"><i style="font-size: 26px" @click="returnHome" class="el-icon-s-home"></i></div>
    <el-tabs style="max-width: calc(100% - 150px)" :value="selectApp.path" @tab-click="selectModule($event.$attrs.menuData)" type="card">
      <el-tab-pane v-for="(item, index) in menu" :menuData="item" :key="index" :label="item.name" :name="item.path">
        <div class="pane-content" slot="label">
          <i :class="item.source" v-if="item.source"></i>
          <div>{{ item.name }}</div>
        </div></el-tab-pane
      >
    </el-tabs>
    <div class="more-sub-sys">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="color: #fff"> 更多菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu slot="dropdown">
         {{ subMemu }} -->
    <!-- <el-dropdown-item v-for="item in subMemu" :key="item.name">
            <span @click="toSubSys(item)"> {{ item.name }}</span>
          </el-dropdown-item> -->
    <!-- <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item> -->
    <!-- </el-dropdown-menu>
      </el-dropdown>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'TopNavBar',
  data() {
    return {
      show: false
    }
  },
  computed: {
    menuList() {
      return [
        { name: '首页', source: 'el-icon-s-home', path: '/home' },
        { name: '基础运维', source: 'el-icon-s-home', path: '/system' }
      ].map((item) => {
        return item
      })
    },
    selectApp() {
      return this.$store.getters.selectApp
    }
  },
  watch: {},
  created() {
    //console.log(this.subMemu, 'subMemu')
  },
  methods: {
    // 判断是什么页面 决定跳转
    toPage(menu) {
      if (menu.path === '/home') {
        window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/'
      } else {
        window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + menu.path + '#/'
      }
      // alert(process.env.PRO_NAME)
      // alert(window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/')
      // window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/'
    }
  }
}
</script>

<style lang="scss" scoped>
.top-nav-bar {
  display: flex;
  padding-left: 20px;
  align-items: center;
  color: #fff;
  justify-content: center;
  .nav-btn {
    width: 96px;
    height: 100%;
    position: relative;
    justify-content: center;
    display: flex;
    .active-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: 20px;
    }
  }
  .active {
    background: #008ce5;
  }
  .menu-item-box {
    min-width: 100px;
    text-align: center;
    i {
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 5px;
    }
    span {
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      overflow: hidden;
      width: 120px;
      line-height: 14px;
    }
  }
  .menu-item-title {
    i {
      margin-left: 5px;
    }
  }
  .menu-wrapper {
    width: 515px;
    display: flex;
    flex-wrap: wrap;
    z-index: 9999;
    min-height: 150px;
    top: 54px;
    right: 0;
    position: absolute;
    background: #ffffff;
    box-shadow: 0px 2px 6px 0px rgba(20, 23, 53, 0.15);
    border-radius: 0px 0px 4px 4px;
    padding: 10px;
    .menu-item {
      height: 75px;
      // padding: 0 5px;
      position: relative;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      width: calc(25% - 20px);
      border-radius: 5px;
      display: flex;
      margin: 10px;
      flex-direction: column;
      background-size: 100% 100%;
      &:hover {
        &::after {
          content: '';
          position: absolute;
          height: 14px;
          width: 14px;
          background-size: 100% 100%;
          display: block;
          bottom: 5px;
          right: 10px;
        }
      }
    }
  }
  // .nav-item {
  //   margin-right: 20px;
  //   display: flex;
  //   cursor: pointer;
  //   align-items: center;
  // }
  // .more-sub-sys {
  //   margin-left: 30px;
  // }
}
// /deep/.el-tabs {
//   height: 100%;
//   .is-top,
//   .el-tabs__nav-scroll {
//     height: 100%;
//   }
//   .el-icon-arrow-left,
//   .el-icon-arrow-right {
//     color: #fff;
//   }
//   &__header {
//     border-bottom: none;
//   }
//   &__nav {
//     display: flex;
//     align-items: center;
//   }
//   &__item,
//   &__nav {
//     color: #fff;
//     // font-weight: bold;
//     border: none !important;
//   }
//   &__nav {
//     &-wrap {
//       margin: 0;
//       display: flex;
//       align-items: center;
//     }
//   }
//   &__item.is-active {
//     background: linear-gradient(180deg, #2082eb 0%, #4cc2f8 100%);
//     color: #fff;
//   }
//   // &__item:hover {
//   //   color: rgb(40, 195, 255);
//   // }
//   .pane-content {
//     height: 100%;
//     display: flex;
//     text-align: center;
//     flex-direction: column;
//     padding: 5px 0;

//     box-sizing: border-box;
//     align-items: center;
//     justify-content: center;
//     div {
//       height: 20px;
//       line-height: 20px;
//     }
//     i {
//       height: 16px;
//       margin-bottom: 5px;
//       line-height: 16px;
//     }
//   }
// }
// .more-sub-sys {
//   .el-dropdown-link {
//     cursor: pointer;
//     white-space: nowrap;
//   }
// }
</style>
