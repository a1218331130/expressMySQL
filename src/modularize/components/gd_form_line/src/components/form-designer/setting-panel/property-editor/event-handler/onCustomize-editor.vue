<template>
  <div>
    <el-form-item label="onCustomize" label-width="150px">
      <el-button type="primary" icon="el-icon-plus" round @click="editEventHandler('onClick', eventParams)">添加流程策略</el-button>
    </el-form-item>
    <gd-dialog
      title="流程策略"
      class="small-padding-dialog"
      :z-index="2001"
      :closed.sync="showWidgetEventDialogFlag"
      :append-to-body="true"
      draggable
      :maximized.sync="maximized"
      width="800px"
    >
      <div class="flow">
        <div class="sub-block-head">
          <label>判断条件：</label>
        </div>
        <div class="sub-trigger">
          <div class="condition-common-head"><span>1</span><label>当触发以下任一时机</label></div>
          <div class="common-content">
            <div class="sub-stategy-line">
              <div class="sub-strategy-idx">
                <span>1</span>
              </div>
              <div class="object-cascader-container">
                <el-select v-model="form.action" placeholder="请选择" size="small">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="condition-common-head"><span>2</span><label>并且满足下列条件(查询字段不选默认全部)</label></div>
          <div class="common-content">
            <div class="sub-stategy-line">
              <div class="sub-strategy-idx">
                <span>1</span>
              </div>
              <div class="object-cascader-container">
                <el-select v-model="form.action1" placeholder="请选择条件" size="small" clearable style="width: 150px">
                  <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <el-select
                  v-if="form.action1 === 'routerPath'"
                  v-model="form.action7"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择或输入跳转地址"
                  size="small"
                  style="width: 200px"
                >
                  <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <el-select
                  v-if="form.action1 === 'routerPath'"
                  v-model="form.action8"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择或输入路由传参"
                  size="small"
                  style="width: 200px"
                >
                  <el-option v-for="item in options8" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <!-- <el-select
                  v-if="form.action1 === 'searchData' || form.action1 === 'resetSearch'"
                  v-model="form.action2"
                  placeholder="请选择需要查询的字段"
                  multiple
                  size="small"
                  clearable
                >
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <el-select
                  v-if="form.action1 === 'searchData' || form.action1 === 'resetSearch'"
                  v-model="form.action3"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择分页"
                  size="small"
                  style="width: 200px"
                >
                  <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select> -->
              </div>
            </div>
            <div v-if="form.action1 === 'searchData' || form.action1 === 'resetSearch'" class="sub-stategy-line">
              <div class="sub-strategy-idx">
                <span>2</span>
              </div>
              <div class="object-cascader-container">
                <!-- <el-select v-model="form.action4" placeholder="请选择请求方式" size="small" clearable style="width: 150px">
                  <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select> -->
                <el-select v-model="form.action9" filterable allow-create default-first-option placeholder="对应的表格id" size="small" clearable style="width: 150px">
                  <el-option v-for="item in options9" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <!-- <el-select v-model="form.action5" filterable allow-create default-first-option placeholder="请选择或输入接口地址" size="small" style="width: 200px">
                  <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select> -->
              </div>
            </div>
          </div>
          <div class="condition-common-head"><span>3</span><label>响应以下所有动作</label></div>
          <div class="common-content">
            <div class="sub-stategy-line">
              <div class="sub-strategy-idx">
                <span>1</span>
              </div>
              <div class="object-cascader-container">
                <el-select v-model="form.action6" filterable allow-create default-first-option placeholder="请选择或输入数据返回字段名称" size="small" style="width: 200px">
                  <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <el-button type="primary" size="small" @click="showDialogMethod = true">接口数据处理</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showWidgetEventDialogFlag = false"> {{ i18nt('designer.hint.cancel') }}</el-button>
        <el-button type="primary" @click="saveEventHandler"> {{ i18nt('designer.hint.confirm') }}</el-button>
      </div>
    </gd-dialog>
    <gd-dialog :title="'接口数据处理'" size="small" :z-index="2002" :closed.sync="showDialogMethod" :append-to-body="true" draggable :maximized.sync="maximized" width="800px">
      <code-editor :mode="'javascript'" :readonly="false" v-model="configMethod" style="margin-top: 10px"></code-editor>
      <template slot="footer">
        <div>
          <el-button size="small" @click="showDialogMethod = false">关闭</el-button>
        </div>
      </template>
    </gd-dialog>
  </div>
</template>

<script>
import i18n from '../../../../../utils/i18n'
import { genVueData } from '../../../../../utils/vue2js-generator'
import CodeEditor from '../../../../code-editor/index'
export default {
  name: 'onCustomize-editor',
  mixins: [i18n],
  components: { CodeEditor },
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
    formConfig: Object
  },
  data() {
    return {
      configMethod: '',
      eventParams: [],
      options5: [],
      options7: [],
      options8: [],
      options9: [],
      options10: [],
      showDialogMethod: false,
      options: [
        {
          value: 'click',
          label: '单击'
        },
        {
          value: 'dblclick',
          label: '双击'
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
      ],
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
      options3: [
        {
          value: 'current',
          label: 'current'
        },
        {
          value: 'size',
          label: 'size'
        }
      ],
      options1: [
        {
          value: 'searchData',
          label: '查询'
        },
        {
          value: 'justReset',
          label: '仅重置'
        },
        {
          value: 'resetSearch',
          label: '重置并查询'
        },
        {
          value: 'routerPath',
          label: '路由跳转'
        }
      ],
      options2: [],
      form: {
        action: '',
        action1: '',
        action2: '',
        action3: '',
        action4: '',
        action5: '',
        action6: '',
        action7: '',
        action8: '',
        action9: '',
        action10: ''
      },
      showWidgetEventDialogFlag: false
    }
  },
  mounted() {
    const formData = genVueData(this.designer.formConfig, this.designer.widgetList)
    this.options2 = formData.map((res) => {
      const arr = res.split(':')
      return {
        value: arr[0],
        label: arr[0]
      }
    })
    this.form = this.optionModel.onCustomize !== '' ? JSON.parse(this.optionModel.onCustomize) : this.form
    // debugger
    // console.log(this.designer, 'designerdesigner')
    // console.log(this.desigselectedWidgetner, 'selectedWidgetselectedWidget')
    // console.log(this.optionModel, 'optionModeloptionModel')
  },
  methods: {
    onChangeinput19114() {
      alert(22)
    },
    editEventHandler() {
      this.showWidgetEventDialogFlag = true
    },
    saveEventHandler() {
      this.showWidgetEventDialogFlag = false
      this.$set(this.optionModel, 'onCustomize', JSON.stringify(this.form))
    }
  }
}
</script>

<style lang="scss" scoped>
.flow {
  border: 1px solid #e1e1e1;
  margin-top: 20px;
  border-radius: 2px;
  color: #5b5b5b;
  .sub-block-head {
    height: 40px;
    margin-left: 30px;
    display: flex;
    align-items: center;
  }
  .sub-trigger {
    margin-top: 10px;
    padding: 0 30px;
    .common-content {
      background-color: #f6f6f6;
      padding: 0 12px;
      margin-bottom: 10px;
      .sub-stategy-line {
        padding-top: 12px;
        position: relative;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding-right: 20px;
        margin-left: 24px;
        margin-top: 10px;
        height: 50px;
        .sub-strategy-idx {
          height: 28px;
          width: 18px;
          display: flex;
          margin-right: 6px;
          position: absolute;
          left: -24px;
          top: 18px;
          text-align: center;
        }
        .sub-strategy-idx > span {
          width: 18px;
          height: 18px;
          background-color: #b2b2b2;
          color: #fff;
          text-align: center;
          line-height: 18px;
          margin-bottom: 10px;
        }
      }
    }
    .condition-common-head {
      display: flex;
      align-items: center;
    }
    .condition-common-head > span {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 1px solid #1989fa;
      color: #1989fa;
      text-align: center;
    }
    .condition-common-head > label {
      color: #5b5b5b;
      font-size: 14px;
      margin-left: 8px;
    }
  }
}
</style>
