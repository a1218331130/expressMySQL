<template>
  <div>
    <el-form ref="form" :model="echartOption" label-width="150px" label-position="left" label-suffix="：">
      <el-form-item label="是否显示标题组件" prop="show">
        <el-switch size="mini" v-model="echartOption.show"></el-switch>
      </el-form-item>
      <el-form-item v-if="echartOption.show" label="标题文本" prop="text">
        <el-input size="mini" v-model="echartOption.text"></el-input>
      </el-form-item>
      <el-form-item label="主标题文本超链接" prop="link">
        <el-input size="mini" v-model="echartOption.link"></el-input>
      </el-form-item>
      <el-form-item label="指定窗口打开主标题超链接" prop="target">
        <el-select size="mini" v-model="echartOption.target">
          <el-option value="self">当前窗口打开</el-option>
          <el-option value="blank">新窗口打开</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="副标题文本" prop="subtext">
        <el-input size="mini" v-model="echartOption.subtext"></el-input>
      </el-form-item>
      <el-form-item label="副标题文本超链接" prop="sublink">
        <el-input size="mini" v-model="echartOption.sublink"></el-input>
      </el-form-item>
      <el-form-item label="指定窗口打开副标题超链接" prop="subtarget">
        <el-select size="mini" v-model="echartOption.subtarget">
          <el-option value="self">当前窗口打开</el-option>
          <el-option value="blank">新窗口打开</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="整体（包括 text 和 subtext）的水平对齐" prop="textAlign">
        <el-select size="mini" v-model="echartOption.textAlign">
          <el-option value="auto">自动</el-option>
          <el-option value="top">顶部</el-option>
          <el-option value="bottom">底部</el-option>
          <el-option value="middle">中间</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="整体（包括 text 和 subtext）的垂直对齐" prop="textVerticalAlign">
        <el-select size="mini" v-model="echartOption.textVerticalAlign">
          <el-option value="auto">自动</el-option>
          <el-option value="top">顶部</el-option>
          <el-option value="bottom">底部</el-option>
          <el-option value="middle">中间</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否触发事件" prop="triggerEvent">
        <el-switch size="mini" v-model="echartOption.triggerEvent"></el-switch>
      </el-form-item>
      <el-form-item label="标题内边距" prop="padding">
        <el-input size="mini" v-model="echartOption.padding" placeholder="单位px，默认各方向内边距为5，接受数组分别设定上右下左边距"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'title',
  props: {
    designer: Object,
    selectedWidget: Object
  },
  data() {
    return {}
  },
  computed: {
    echartOption() {
      return this.selectedWidget.options.title
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.el-form-item {
  margin-bottom: 5px;
}
</style>
