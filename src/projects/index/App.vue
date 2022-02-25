<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { getToken } from '@/projects/index/utils/auth'
export default {
  name: 'App',
  created() {},
  mounted() {
    if (!getToken()) {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
<style></style>
