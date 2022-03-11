<template>
  <div>
    {{ optionModel.selectConfig }}
    <el-form-item label-width="0">
      <el-divider class="custom-divider-margin-top">{{ i18nt('designer.setting.optionsSetting') }}</el-divider>
      <option-items-setting :designer="designer" :selected-widget="selectedWidget"></option-items-setting>
      <el-divider class="custom-divider-margin-top">接口获取</el-divider>
    </el-form-item>
    <el-form-item label="接口数据：" label-width="80px">
      <el-switch v-model="optionModel.selectConfig.otherObj.isLine"></el-switch>
    </el-form-item>
    <el-form-item label="接口地址：" label-width="80px">
      <el-input type="text" v-model="optionModel.selectConfig.url"></el-input>
    </el-form-item>
    <el-form-item label="请求方式：" label-width="80px">
      <el-select v-model="optionModel.selectConfig.methodType" placeholder="请选择请求方式" size="small" clearable>
        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="返回字段：" label-width="80px">
      <el-select
        v-model="optionModel.selectConfig.otherObj.backData"
        filterable
        allow-create
        default-first-option
        clearable
        placeholder="请选择或输入数据返回字段名称"
        size="small"
      >
        <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-button style="margin-top: 8px" type="primary" size="mini" @click="showDialogMethod = true">接口数据处理</el-button>
    </el-form-item>
    <el-form-item label-width="0">
      <el-divider class="custom-divider-margin-top">查询参数</el-divider>
      <div style="margin-bottom: 5px" v-for="(item, index) in optionModel.selectConfig.searchParams" :key="index">
        <el-row :gutter="20">
          <el-col :span="10"><el-input type="text" v-model="item.label" placeholder="字段名"></el-input></el-col>
          <el-col :span="10"><el-input type="text" v-model="item.value" placeholder="字段值"></el-input></el-col>
          <el-col :span="4" style="color: red; cursor: pointer"><span @click="deletOption(index)">删除</span></el-col>
        </el-row>
      </div>
      <el-button type="text" @click="addOption">增加查询项</el-button>
    </el-form-item>
    <gd-dialog :title="'接口数据处理'" size="small" :z-index="2002" :closed.sync="showDialogMethod" :append-to-body="true" draggable :maximized.sync="maximized" width="800px">
      <code-editor :mode="'javascript'" :readonly="false" v-model="optionModel.selectConfig.otherObj.backMethod" style="margin-top: 10px"></code-editor>
      <template slot="footer">
        <div>
          <el-button size="small" @click="showDialogMethod = false">关闭</el-button>
        </div>
      </template>
    </gd-dialog>
  </div>
</template>

<script>
import i18n from '../../../../utils/i18n'
import OptionItemsSetting from './option-items-setting'
import CodeEditor from '../../../code-editor/index'
import propertyMixin from './propertyMixin'
export default {
  name: 'optionItems-editor',
  mixins: [i18n, propertyMixin],
  data() {
    return {
      showDialogMethod: false,
      options4: [
        {
          value: 'get',
          label: 'GET'
        },
        {
          value: 'post',
          label: 'POST'
        }
      ],
      options6: [
        {
          value: 'data',
          label: 'data'
        },
        {
          value: 'data.records',
          label: 'data.records'
        }
      ]
    }
  },
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  },
  computed: {},
  components: {
    OptionItemsSetting,
    CodeEditor
  },
  methods: {
    addOption() {
      this.optionModel.selectConfig.searchParams.push({ value: '', label: '' })
    },
    deletOption(index) {
      this.optionModel.selectConfig.searchParams.splice(index, 1)
    }
  }
}
</script>

<style scoped></style>
