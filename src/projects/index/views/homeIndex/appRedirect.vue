<template>
  <div ref="wrapperSelect" class="wrapper-common wrapper-app">
    <!-- <Header></Header> -->
    <el-container id="main">
      <el-aside width="300px" height="100%"><Header></Header></el-aside>
      <el-main>
        <router-view />
      </el-main>
      <el-aside width="300px" height="100%"><RightSide></RightSide></el-aside>
    </el-container>
  </div>
</template>

<script>
import RightSide from './components/rightSide'
import Header from './components/header'
export default {
  components: {
    RightSide,
    Header
  },
  props: {},
  data() {
    return {}
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style>
::-webkit-scrollbar {
  width: 0 !important;
}
#main .el-main {
  padding: 0;
}
#main .el-main {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
#main .el-aside {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<style lang="scss" scoped>
.wrapper-common {
  height: 100%;
  #main {
    height: 100%;
  }
}
// #main {
//   width: 1100px;
//   margin: 0 auto;
// }
</style>
