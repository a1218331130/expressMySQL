<template>
  <div ref="wrapperSelect" class="wrapper-common wrapper-app">
    <Header></Header>
    <el-container id="main">
      <el-main>
        <router-view />
      </el-main>
      <el-aside width="250px">Aside</el-aside>
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
#main {
  width: 1100px;
  margin: 0 auto;
}
</style>
