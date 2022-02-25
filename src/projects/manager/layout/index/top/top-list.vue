<template>
  <div class="top-list">
    <div class="top-list-item" :style="style">
      <span>基础运维系统</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apps: [],
      activeSystem: ''
    }
  },
  computed: {
    style() {
      return {
        background: this.siberMenuConfig.topListbg,
        color: this.siberMenuConfig.topListColor
      }
    }
  },
  created() {},
  methods: {
    jumpTo(app, isClick) {
      window.location.href = window.location.origin + '/' + app.path
    }
  }
}
</script>

<style lang="scss" scoped>
.top-list {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  text-align: center;
  .top-list-item {
    margin-right: 5px;
    padding: 0 5px;
  }
}
</style>
