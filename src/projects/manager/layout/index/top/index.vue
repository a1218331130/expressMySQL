<template>
  <div :style="{ background: navObjs.background }" class="top" id="top">
    <div class="info_title_left" id="info_title_left">
      <span class="navTitle"> 博客后台管理 </span>
    </div>
  </div>
</template>
<script>
import siberMenuConfig from '../../../config/siber-menu.config'
export default {
  name: 'Top',
  components: {},
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
  computed: {},
  created() {},
  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
