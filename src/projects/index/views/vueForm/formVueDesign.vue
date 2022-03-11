<template>
  <div style="background: white; height: 100%">
    <GdForm ref="gdForm"></GdForm>
  </div>
</template>
<script>
const GdForm = () => import('@modularize/components/gd_form_line/src/components/form-designer')
// import request from '../../utils/axios'
// import Vue from 'vue'
// Vue.prototype.requestToForm = request
// Vue.prototype.getDesignerUrl = ''
export default {
  name: 'gd_form_design_item',
  components: {
    GdForm: GdForm
  },
  data() {
    return {}
  },
  methods: {},

  mounted() {},
  destroyed() {}
}
</script>
<style lang="scss" scoped></style>
