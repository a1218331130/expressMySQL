<template>
  <gd-dialog
    :title="title"
    size="small"
    headerHeight="40px"
    :btnTextAlign="btnTextAlign"
    :z-index="201"
    :closed.sync="showDialog"
    :append-to-body="true"
    draggable
    :maximized.sync="maximized"
  >
    <div>
      <div class="warning">密码将要过期，是否需要修改密码?</div>
      <div>
        <el-radio v-model="radio" label="1">修改密码</el-radio>
        <el-radio v-model="radio" label="2">直接登录</el-radio>
      </div>
    </div>
    <template slot="footer">
      <div>
        <el-button size="small" type="primary" @click="onSubmit">确定 </el-button>
      </div>
    </template>
  </gd-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '提醒',
      showDialog: false,
      maximized: false,
      radio: '1',
      btnTextAlign: 'center'
    }
  },
  created() {},

  methods: {
    handleOpen() {
      this.showDialog = true
    },
    onSubmit() {
      if (this.radio === '1') {
        // 到密码修改页
        window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/info'
      } else {
        window.location.href = window.origin + (process.env.PRO_NAME ? '/' + process.env.PRO_NAME : '') + '/#/page-change'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.warning {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
}
/deep/ .ns-dialog__header {
  clear: both;
  padding: 0 20px;
  line-height: 40px;
  border-bottom: 1px solid #efefef;
  border-radius: 4px 4px 0 0;
}
</style>
