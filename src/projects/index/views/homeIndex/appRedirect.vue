<template>
  <div ref="wrapperSelect" class="wrapper-common wrapper-app">
    <!-- <Header></Header> -->
    <el-container id="main">
      <el-aside width="300px" height="100%"><Header></Header></el-aside>
      <el-main style="background: #eaeaea">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './components/header'
export default {
  components: {
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
#main .el-main {
  padding: 0;
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
