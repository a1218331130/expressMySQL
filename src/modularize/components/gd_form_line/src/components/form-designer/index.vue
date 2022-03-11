<template>
  <el-container class="main-container full-height">
    <el-header class="main-header">
      <div class="float-left main-title">
        {{ i18nt('application.productTitle') }}
      </div>
      <div class="float-right external-link">
        <a href="javascript:void(0)" style="position: relative" @click="showDocs">
          <!-- <svg-icon icon-class="document" /> -->
          <!-- <span style="padding-left: 25px;position: relative;"> -->
          <img style="width: 14px; position: absolute; top: 2px; left: -15px" src="../../icons/svg/document.svg" alt="" />
          {{ i18nt('application.document') }}
        </a>
      </div>
    </el-header>

    <el-container style="height: calc(100% - 50px)">
      <el-aside class="side-panel">
        <widget-panel :form-module-list="formModuleList" v-bind="$attrs" v-on="$listeners" :designer="designer" />
      </el-aside>

      <el-container class="center-layout-container">
        <el-header class="toolbar-header">
          <toolbar-panel :designer="designer" ref="toolbarRef" v-on="$listeners">
            <template #toolButton><slot name="customToolButtons"></slot></template>
          </toolbar-panel>
        </el-header>
        <el-main class="form-widget-main">
          <el-scrollbar class="container-scroll-bar" :style="{ height: scrollerHeight }">
            <v-form-widget :designer="designer" :form-config="designer.formConfig" v-bind="$attrs" v-on="$listeners"> </v-form-widget>
          </el-scrollbar>
        </el-main>
      </el-container>

      <el-aside class="right_el_side">
        <setting-panel :designer="designer" :selected-widget="designer.selectedWidget" :form-config="designer.formConfig" v-on="$listeners" v-bind="$attrs" />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import WidgetPanel from './widget-panel/index'
import ToolbarPanel from './toolbar-panel/index'
import SettingPanel from './setting-panel/index'
import VFormWidget from './form-widget/index'
import { createDesigner } from './designer'
import { addWindowResizeHandler, deepClone, getQueryParam } from '../../utils/util'
import { MOCK_CASE_URL, VARIANT_FORM_VERSION } from '../../utils/config'
import i18n, { changeLocale } from '../../utils/i18n'

export default {
  name: 'VFormDesigner',
  componentName: 'VFormDesigner',
  mixins: [i18n],
  components: {
    WidgetPanel,
    ToolbarPanel,
    SettingPanel,
    VFormWidget
  },
  props: {
    /* 后端字段列表API */
    fieldListApi: {
      type: Object,
      default: null
    },

    /* 禁止显示的组件名称数组 */
    bannedWidgets: {
      type: Array,
      default: () => []
    },
    formModuleList: {
      type: Array,
      default: () => []
    },
    designerConfig: {
      type: Object,
      default: () => {
        return {
          languageMenu: true, //是否显示语言切换菜单
          externalLink: true, //是否显示GitHub、文档等外部链接
          formTemplates: true, //是否显示表单模板
          eventCollapse: true, //是否显示组件事件属性折叠面板
          clearDesignerButton: true, //是否显示清空设计器按钮
          previewFormButton: true, //是否显示预览表单按钮
          importJsonButton: true, //是否显示导入JSON按钮
          exportJsonButton: true, //是否显示导出JSON器按钮
          exportCodeButton: true, //是否显示导出代码按钮
          generateSFCButton: true //是否显示生成SFC按钮
        }
      }
    }
  },
  data() {
    return {
      vFormVersion: VARIANT_FORM_VERSION,
      curLangName: '',

      vsCodeFlag: false,
      caseName: '',

      scrollerHeight: 0,

      designer: createDesigner(this),

      fieldList: []
    }
  },
  provide() {
    return {
      serverFieldList: this.fieldList,
      getDesignerConfig: () => this.designerConfig,
      getBannedWidgets: () => this.bannedWidgets
    }
  },
  created() {
    this.vsCodeFlag = getQueryParam('vscode') == 1
    this.caseName = getQueryParam('case')
  },
  mounted() {
    this.initLocale()

    this.scrollerHeight = window.innerHeight - 56 - 36 + 'px'
    addWindowResizeHandler(() => {
      this.$nextTick(() => {
        this.scrollerHeight = window.innerHeight - 56 - 36 + 'px'
      })
    })

    this.loadCase()

    this.loadFieldListFromServer()
  },
  methods: {
    showDocs() {
      this.$message.warning('暂无文档')
    },

    loadCase() {
      if (!this.caseName) {
        return
      }

      axios
        .get(MOCK_CASE_URL + this.caseName + '.txt')
        .then((res) => {
          if (!!res.data.code) {
            this.$message.error(this.i18nt('designer.hint.sampleLoadedFail'))
            return
          }

          this.setFormJson(res.data)
          this.$message.success(this.i18nt('designer.hint.sampleLoadedSuccess'))
        })
        .catch((error) => {
          this.$message.error(this.i18nt('designer.hint.sampleLoadedFail') + ':' + error)
        })
    },

    initLocale() {
      let curLocale = localStorage.getItem('v_form_locale')
      if (!!this.vsCodeFlag) {
        curLocale = curLocale || 'en-US'
      } else {
        curLocale = curLocale || 'zh-CN'
      }
      this.curLangName = this.i18nt('application.' + curLocale)
      this.changeLanguage(curLocale)
    },

    loadFieldListFromServer() {
      if (!this.fieldListApi) {
        return
      }

      axios
        .get(this.fieldListApi.URL)
        .then((res) => {
          let labelKey = this.fieldListApi.labelKey || 'label'
          let nameKey = this.fieldListApi.nameKey || 'name'

          res.data.forEach((fieldItem) => {
            this.fieldList.push({
              label: fieldItem[labelKey],
              name: fieldItem[nameKey]
            })
          })
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },

    handleLanguageChanged(command) {
      this.changeLanguage(command)
      this.curLangName = this.i18nt('application.' + command)
    },

    changeLanguage(langName) {
      changeLocale(langName)
    },

    setFormJson(formJson) {
      let modifiedFlag = false
      if (!!formJson) {
        if (typeof formJson === 'string') {
          modifiedFlag = this.designer.loadFormJson(JSON.parse(formJson))
        } else if (formJson.constructor === Object) {
          modifiedFlag = this.designer.loadFormJson(formJson)
        }

        if (modifiedFlag) {
          this.designer.emitHistoryChange()
        }
      }
    },

    getFormJson() {
      return {
        widgetList: deepClone(this.designer.widgetList),
        formConfig: deepClone(this.designer.formConfig)
      }
    },

    clearDesigner() {
      this.$refs.toolbarRef.clearFormWidget()
    },

    /**
     * 刷新表单设计器
     */
    refreshDesigner() {
      //this.designer.loadFormJson( this.getFormJson() )  //只有第一次调用生效？？

      let fJson = this.getFormJson()
      this.designer.clearDesigner(true) //不触发历史记录变更
      this.designer.loadFormJson(fJson)
    },

    /**
     * 预览表单
     */
    previewForm() {
      this.$refs.toolbarRef.previewForm()
    },

    /**
     * 导入表单JSON
     */
    importJson() {
      this.$refs.toolbarRef.importJson()
    },

    /**
     * 导出表单JSON
     */
    exportJson() {
      this.$refs.toolbarRef.exportJson()
    },

    /**
     * 导出Vue/HTML代码
     */
    exportCode() {
      this.$refs.toolbarRef.exportCode()
    },

    /**
     * 生成SFC代码
     */
    generateSFC() {
      this.$refs.toolbarRef.generateSFC()
    }

    //TODO: 增加更多方法！！
  }
}
</script>
<style scoped>
.right_el_side::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.right_el_side::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.right_el_side::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
</style>
<style lang="scss" scoped>
.el-container.full-height {
  height: 100%;
  overflow-y: hidden;
}

.el-container.center-layout-container {
  min-width: 680px;
  border-left: 2px dotted #ebeef5;
  border-right: 2px dotted #ebeef5;
}

.el-header.main-header {
  border-bottom: 2px dotted #ebeef5;
  height: 48px !important;
  line-height: 48px !important;
  min-width: 800px;
}

div.main-title {
  font-size: 18px;
  color: #242424;
  display: flex;
  align-items: center;
  justify-items: center;

  img {
    cursor: pointer;
    width: 36px;
    height: 36px;
  }

  span.bold {
    font-size: 20px;
    font-weight: bold;
    margin: 0 6px 0 6px;
  }

  span.version-span {
    font-size: 14px;
    color: #101f1c;
    margin-left: 6px;
  }
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.el-dropdown-link {
  margin-right: 12px;
  cursor: pointer;
}

div.external-link a {
  font-size: 13px;
  text-decoration: none;
  margin-right: 10px;
  color: #606266;
}

.el-header.toolbar-header {
  font-size: 14px;
  border-bottom: 1px dotted #cccccc;
  height: 42px !important;
  //line-height: 42px !important;
}

.el-aside.side-panel {
  width: 260px !important;
  overflow-y: auto;
}

.el-main.form-widget-main {
  padding: 0;

  position: relative;
  overflow-x: hidden;
}
.form-widget-main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.form-widget-main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.form-widget-main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
.container-scroll-bar {
  ::v-deep .el-scrollbar__wrap,
  ::v-deep .el-scrollbar__view {
    overflow-x: hidden;
  }
}
</style>
