<template>
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :rules="rules"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <el-select
      ref="fieldEditor"
      v-model="field.options.defaultValue"
      class="full-width-input"
      :disabled="field.options.disabled"
      :size="field.options.size"
      :clearable="field.options.clearable"
      :filterable="field.options.filterable"
      :allow-create="field.options.allowCreate"
      :default-first-option="allowDefaultFirstOption"
      :automatic-dropdown="field.options.automaticDropdown"
      :multiple="field.options.multiple"
      :multiple-limit="field.options.multipleLimit"
      :placeholder="field.options.placeholder || i18nt('render.hint.selectPlaceholder')"
      :remote="this.field.options.remote"
      :remote-method="remoteQuery"
      @focus="handleFocusCustomEvent"
      @blur="handleBlurCustomEvent"
      @change="handleChangeEvent"
    >
      <el-option v-for="item in isLine ? lineList : field.options.optionItems" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"> </el-option>
    </el-select>
  </form-item-wrapper>
</template>

<script>
import FormItemWrapper from './form-item-wrapper'
import emitter from 'element-ui/lib/mixins/emitter'
import i18n, { translate } from '../../../../utils/i18n'
import fieldMixin from './fieldMixin'
// import { default as request, getDesignerUrl } from '@/projects/erp/utils/axios'
const Qs = require('qs')
export default {
  name: 'select-widget',
  componentName: 'FieldWidget', //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,

    designState: {
      type: Boolean,
      default: false
    },

    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ''
    }
  },
  components: {
    FormItemWrapper
  },
  inject: ['refList', 'formConfig', 'globalOptionData', 'globalModel'],
  data() {
    return {
      oldFieldValue: null, //field组件change之前的值
      fieldModel: null,
      lineList: [],
      rules: []
    }
  },
  computed: {
    allowDefaultFirstOption() {
      return !!this.field.options.filterable && !!this.field.options.allowCreate
    },
    isLine() {
      return this.field.options.selectConfig.otherObj.isLine
    }
  },
  beforeCreate() {
    /* 这里不能访问方法和属性！！ */
  },

  created() {
    /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
    this.initOptionItems()
    this.initFieldModel()
    this.registerToRefList()
    this.initEventHandler()
    this.buildFieldRules()

    this.handleOnCreated()
  },

  mounted() {
    this.handleOnMounted()
    if (this.field.options.selectConfig.otherObj.isLine) {
      this.getTableList()
    }
  },

  beforeDestroy() {
    this.unregisterFromRefList()
  },

  methods: {
    async getTableList() {
      let params = {}
      const paramsList = this.field.options.selectConfig.searchParams
      if (paramsList.length > 0) {
        paramsList.forEach((res) => {
          params[res.label] = res.value
        })
      }
      const backType = this.field.options.selectConfig.otherObj.backData
      const requestType = this.field.options.selectConfig.methodType
      // const formData = genVueData(this.designer.formConfig, this.designer.widgetList).join('\n')
      // let dataObj = `{
      //     ${formData}
      //   }`
      // dataObj = eval(`(${dataObj})`)
      // const options2 = formData.map((res) => {
      //   const arr = res.split(':')
      //   return {
      //     value: arr[1] === null ? '' : arr[1],
      //     label: arr[0]
      //   }
      // })
      let newData = {}
      if (requestType === 'post') {
        newData = await this.requestToForm({
          url: this.getDesignerUrl + this.field.options.selectConfig.url,
          method: 'post',
          data: Qs.stringify(params)
        })
      } else {
        newData = await this.requestToForm({
          url: this.getDesignerUrl + this.field.options.selectConfig.url,
          method: 'get',
          params: {
            ...params
          }
        })
      }
      if (backType !== '' && backType.includes('.')) {
        backType.split('.').forEach((res) => {
          newData = newData[res]
        })
      }
      const resetMethed = eval(`(${this.field.options.selectConfig.otherObj.backMethod})`)
      this.lineList = resetMethed(newData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/global.scss'; //* form-item-wrapper已引入，还需要重复引入吗？ *//

.full-width-input {
  width: 100% !important;
}
</style>
