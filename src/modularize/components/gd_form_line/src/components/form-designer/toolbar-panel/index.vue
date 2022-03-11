<template>
  <div class="toolbar-container">
    <div class="left-toolbar">
      <el-button size="small" type="text" :disabled="undoDisabled" :title="i18nt('designer.toolbar.undoHint')" @click="undoHistory">
        <span style="padding-left: 25px; position: relative">
          <img style="width: 14px; position: absolute; top: 2px; left: 5px" src="../../../icons/svg/undo.svg" alt="" />
        </span>
      </el-button>
      <el-button size="small" type="text" :disabled="redoDisabled" :title="i18nt('designer.toolbar.redoHint')" @click="redoHistory">
        <span style="padding-left: 25px; position: relative">
          <img style="width: 14px; position: absolute; top: 2px; left: 5px" src="../../../icons/svg/redo.svg" alt="" />
        </span>
      </el-button>
      <el-button-group style="margin-left: 20px">
        <el-button size="small" :type="layoutType === 'PC' ? 'primary' : ''" @click="changeLayoutType('PC')"> {{ i18nt('designer.toolbar.pcLayout') }}</el-button>
        <el-button size="small" :type="layoutType === 'Pad' ? 'primary' : ''" @click="changeLayoutType('Pad')"> {{ i18nt('designer.toolbar.padLayout') }}</el-button>
        <el-button size="small" :type="layoutType === 'H5' ? 'primary' : ''" @click="changeLayoutType('H5')"> {{ i18nt('designer.toolbar.mobileLayout') }}</el-button>
      </el-button-group>
      <el-button size="small" type="" style="margin-left: 20px" :title="i18nt('designer.toolbar.nodeTreeHint')" @click="showNodeTreeDrawer">
        <!-- <svg-icon icon-class="node-tree" /> -->
        <span style="padding-left: 25px; position: relative">
          <img style="width: 14px; position: absolute; top: 2px; left: 5px" src="../../../icons/svg/node-tree.svg" alt="" />
        </span>
      </el-button>
    </div>

    <el-drawer
      :title="i18nt('designer.toolbar.nodeTreeTitle')"
      direction="ltr"
      :visible.sync="showNodeTreeDrawerFlag"
      :modal="false"
      :size="280"
      :destroy-on-close="true"
      class="node-tree-drawer"
    >
      <el-tree
        ref="nodeTree"
        :data="nodeTreeData"
        node-key="id"
        default-expand-all
        highlight-current
        class="node-tree"
        icon-class="el-icon-arrow-right"
        @node-click="onNodeTreeClick"
      ></el-tree>
    </el-drawer>

    <div class="right-toolbar">
      <el-button type="text" @click="clearFormWidget"> <i class="el-icon-delete" />{{ i18nt('designer.toolbar.clear') }}</el-button>
      <!-- <el-button type="text" @click="previewForm"> <i class="el-icon-view" />存为草稿</el-button>
      <el-button type="text" @click="previewForm"> <i class="el-icon-view" />元数据</el-button>
      <el-button type="text" @click="previewForm"> <i class="el-icon-view" />关联实体</el-button> -->
      <el-button type="text" @click="previewForm"> <i class="el-icon-view" />{{ i18nt('designer.toolbar.preview') }}</el-button>
      <!-- <el-button type="text" @click="importJson"> {{ i18nt('designer.toolbar.importJson') }}</el-button> -->
      <!-- <el-button type="text" @click="exportJson(false)"> {{ i18nt('designer.toolbar.exportJson') }}</el-button> -->
      <el-button type="text" @click="generateSFC">
        <!-- <svg-icon icon-class="vue-sfc" /> -->
        生成代码
      </el-button>
      <el-button type="text" @click="generateSave">保存并发布</el-button>
      <el-button type="text" @click="saveFormModule">保存表单模板</el-button>
      <el-button type="text" @click="setMenu">生成菜单</el-button>
      <el-button type="text" @click="baseInfoForm">基本信息</el-button>
      <slot name="toolButton"></slot>
    </div>

    <gd-dialog
      :title="i18nt('designer.toolbar.preview')"
      :closed.sync="showPreviewDialogFlag"
      draggable
      maximizable
      :maximized.sync="maximized"
      v-if="showPreviewDialogFlag"
      class="small-padding-dialog"
      width="800px"
    >
      <div>
        <div class="form-render-wrapper" :class="[layoutType === 'H5' ? 'h5-layout' : '']">
          <!-- <VFormRender
            ref="preForm"
            :form-json="formJson"
            :form-data="testFormData"
            :preview-state="true"
            :option-data="testOptionData"
            @appendButtonClick="testOnAppendButtonClick"
            @buttonClick="testOnButtonClick"
            @formChange="handleFormChange"
          ></VFormRender> -->
          <Test :item-data="itemData"></Test>
        </div>
      </div>
      <code-editor v-model="testFunc" style="display: none"></code-editor>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getFormData">{{ i18nt('designer.hint.getFormData') }}</el-button>
        <el-button type="primary" @click="resetForm">{{ i18nt('designer.hint.resetForm') }}</el-button>
        <el-button type="primary" @click="setFormDisabled">{{ i18nt('designer.hint.disableForm') }}</el-button>
        <el-button type="primary" @click="setFormEnabled">{{ i18nt('designer.hint.enableForm') }}</el-button>
        <el-button type="" @click="showPreviewDialogFlag = false">{{ i18nt('designer.hint.closePreview') }}</el-button>
      </div>
    </gd-dialog>

    <gd-dialog
      :title="i18nt('designer.toolbar.importJson')"
      :closed.sync="showImportJsonDialogFlag"
      class="small-padding-dialog"
      :maximized.sync="maximized"
      draggable
      maximizable
      :append-to-body="false"
    >
      <el-alert type="info" :title="i18nt('designer.hint.importJsonHint')" show-icon class="alert-padding"></el-alert>
      <code-editor :mode="'json'" :readonly="false" v-model="importTemplate"></code-editor>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doJsonImport"> {{ i18nt('designer.hint.import') }}</el-button>
        <el-button @click="showImportJsonDialogFlag = false"> {{ i18nt('designer.hint.cancel') }}</el-button>
      </div>
    </gd-dialog>

    <gd-dialog
      :title="i18nt('designer.toolbar.exportJson')"
      :closed.sync="showExportJsonDialogFlag"
      class="small-padding-dialog"
      :maximized.sync="maximized"
      draggable
      maximizable
      :append-to-body="false"
    >
      <code-editor :mode="'json'" :readonly="true" v-model="jsonContent"></code-editor>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="copy-json-btn" :data-clipboard-text="jsonRawContent" @click="copyFormJson"> {{ i18nt('designer.hint.copyJson') }}</el-button>
        <el-button @click="saveFormJson">{{ i18nt('designer.hint.saveFormJson') }}</el-button>
        <el-button type="" @click="showExportJsonDialogFlag = false"> {{ i18nt('designer.hint.closePreview') }}</el-button>
      </div>
    </gd-dialog>

    <gd-dialog
      :title="i18nt('designer.toolbar.exportCode')"
      :closed.sync="showExportCodeDialogFlag"
      class="small-padding-dialog"
      :maximized.sync="maximized"
      draggable
      maximizable
      :append-to-body="false"
    >
      <el-tabs type="border-card" class="no-box-shadow no-padding" v-model="activeCodeTab">
        <el-tab-pane label="Vue" name="vue">
          <code-editor :mode="'html'" :readonly="true" v-model="vueCode" :user-worker="false"></code-editor>
        </el-tab-pane>
        <el-tab-pane label="HTML" name="html">
          <code-editor :mode="'html'" :readonly="true" v-model="htmlCode" :user-worker="false"></code-editor>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="copy-vue-btn" :data-clipboard-text="vueCode" @click="copyVueCode"> {{ i18nt('designer.hint.copyVueCode') }}</el-button>
        <el-button type="primary" class="copy-html-btn" :data-clipboard-text="htmlCode" @click="copyHtmlCode"> {{ i18nt('designer.hint.copyHtmlCode') }}</el-button>
        <el-button @click="saveVueCode">{{ i18nt('designer.hint.saveVueCode') }}</el-button>
        <el-button @click="saveHtmlCode">{{ i18nt('designer.hint.saveHtmlCode') }}</el-button>
        <el-button type="" @click="showExportCodeDialogFlag = false"> {{ i18nt('designer.hint.closePreview') }}</el-button>
      </div>
    </gd-dialog>

    <gd-dialog
      :title="i18nt('designer.hint.exportFormData')"
      :closed.sync="showFormDataDialogFlag"
      class="small-padding-dialog"
      :maximized.sync="maximized"
      draggable
      maximizable
      :append-to-body="false"
    >
      <div style="border: 1px solid #dcdfe6">
        <code-editor :mode="'json'" :readonly="true" v-model="formDataJson"></code-editor>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="copy-form-data-json-btn" :data-clipboard-text="formDataRawJson" @click="copyFormDataJson">
          {{ i18nt('designer.hint.copyFormData') }}</el-button
        >
        <el-button @click="saveFormData">{{ i18nt('designer.hint.saveFormData') }}</el-button>
        <el-button type="" @click="showFormDataDialogFlag = false"> {{ i18nt('designer.hint.closePreview') }}</el-button>
      </div>
    </gd-dialog>

    <gd-dialog
      title="代码预览"
      :closed.sync="showExportSFCDialogFlag"
      v-if="showExportSFCDialogFlag"
      draggable
      maximizable
      :maximized.sync="maximized"
      :show-close="true"
      class="small-padding-dialog"
      width="1000px"
      height="450px"
    >
      <code-editor :mode="'html'" :readonly="true" v-model="sfcCode" :user-worker="false"></code-editor>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="copy-vue2-sfc-btn" :data-clipboard-text="sfcCode" @click="copyV2SFC"> {{ i18nt('designer.hint.copyVue2SFC') }}</el-button>
        <el-button @click="saveV2SFC">{{ i18nt('designer.hint.saveVue2SFC') }}</el-button>
        <el-button type="" @click="showExportSFCDialogFlag = false"> {{ i18nt('designer.hint.closePreview') }}</el-button>
      </div>
    </gd-dialog>
  </div>
</template>

<script>
import VFormRender from '../../form-render/index'
import CodeEditor from '../../code-editor/index'
import Test from './test.vue'
import Clipboard from 'clipboard'
import { deepClone, copyToClipboard, generateId, getQueryParam, traverseAllWidgets } from '../../../utils/util'
import i18n from '../../../utils/i18n'
import { generateCode } from '../../../utils/code-generator'
import { genSFC } from '../../../utils/sfc-generator'
import loadBeautifier from '../../../utils/beautifierLoader'
import { saveAs } from 'file-saver'

export default {
  name: 'ToolbarPanel',
  mixins: [i18n],
  components: {
    VFormRender,
    CodeEditor,
    Test,
    Clipboard
  },
  props: {
    designer: Object
  },
  inject: ['getDesignerConfig'],
  data() {
    return {
      maximized: false,
      designerConfig: this.getDesignerConfig(),

      showPreviewDialogFlag: false,
      showImportJsonDialogFlag: false,
      showExportJsonDialogFlag: false,
      showExportCodeDialogFlag: false,
      showFormDataDialogFlag: false,
      showExportSFCDialogFlag: false,
      showNodeTreeDrawerFlag: false,
      itemData: {},
      nodeTreeData: [],

      testFunc: '',
      importTemplate: '',
      jsonContent: '',
      jsonRawContent: '',

      formDataJson: '',
      formDataRawJson: '',

      vueCode: '',
      htmlCode: '',

      sfcCode: '',
      sfcCodeV3: '',

      activeCodeTab: 'vue',
      activeSFCTab: 'vue2',

      testFormData: {
        // 'userName': '666888',
        // 'productItems': [
        //   {'pName': 'iPhone12', 'pNum': 10},
        //   {'pName': 'P50', 'pNum': 16},
        // ]

        select62173: 2
      },
      testOptionData: {
        select62173: [
          { label: '01', value: 1 },
          { label: '22', value: 2 },
          { label: '333', value: 3 }
        ]
      }
    }
  },
  computed: {
    formJson() {
      return {
        widgetList: this.designer.widgetList,
        formConfig: this.designer.formConfig
      }
    },

    undoDisabled() {
      return !this.designer.undoEnabled()
    },

    redoDisabled() {
      return !this.designer.redoEnabled()
    },

    layoutType() {
      return this.designer.getLayoutType()
    }
  },
  watch: {
    'designer.widgetList': {
      deep: true,
      handler(val) {
        //console.log('test-----', val)
        //this.refreshNodeTree()
      }
    }
  },
  methods: {
    baseInfoForm() {
      this.$emit('getBaseInfoForm', true)
    },
    // 保存
    generateSave() {
      loadBeautifier((beautifier) => {
        this.itemData = genSFC(this.designer.formConfig, this.designer.widgetList, beautifier, false, true)
        console.log(this.itemData, 'this.sfcCode this.sfcCode ')
        const jsonData = this.exportJson(true)
        this.$emit('templateData', this.designer.formConfig, this.designer.widgetList, this.designer, jsonData, this.itemData)
      })
    },
    // 保存表单模板
    saveFormModule() {
      const params = {
        formConfig: this.designer.formConfig,
        widgetList: this.designer.widgetList
      }
      loadBeautifier((beautifier) => {
        this.itemData = genSFC(this.designer.formConfig, this.designer.widgetList, beautifier, false, true)
        this.$emit('getFormModule', params, this.itemData)
      })
    },
    setMenu() {
      const params = {
        formConfig: this.designer.formConfig,
        widgetList: this.designer.widgetList
      }
      loadBeautifier((beautifier) => {
        this.itemData = genSFC(this.designer.formConfig, this.designer.widgetList, beautifier, false, true)
        this.$emit('setMenu', params, this.itemData)
      })
    },
    showToolButton(configName) {
      if (this.designerConfig[configName] === undefined) {
        return true
      }

      return !!this.designerConfig[configName]
    },

    buildTreeNodeOfWidget(widget, treeNode) {
      let curNode = {
        id: widget.id,
        label: widget.options.label || widget.type
        //selectable: true,
      }
      treeNode.push(curNode)

      if (widget.category === undefined) {
        return
      }

      curNode.children = []
      if (widget.type === 'grid') {
        widget.cols.map((col) => {
          let colNode = {
            id: col.id,
            label: col.options.name || widget.type,
            children: []
          }
          curNode.children.push(colNode)
          col.widgetList.map((wChild) => {
            this.buildTreeNodeOfWidget(wChild, colNode.children)
          })
        })
      } else if (widget.type === 'table') {
        //TODO: 需要考虑合并单元格！！
        widget.rows.map((row) => {
          let rowNode = {
            id: row.id,
            label: 'table-row',
            selectable: false,
            children: []
          }
          curNode.children.push(rowNode)

          row.cols.map((cell) => {
            if (!!cell.merged) {
              //跳过合并单元格！！
              return
            }

            let rowChildren = rowNode.children
            let cellNode = {
              id: cell.id,
              label: 'table-cell',
              children: []
            }
            rowChildren.push(cellNode)

            cell.widgetList.map((wChild) => {
              this.buildTreeNodeOfWidget(wChild, cellNode.children)
            })
          })
        })
      } else if (widget.type === 'tab') {
        widget.tabs.map((tab) => {
          let tabNode = {
            id: tab.id,
            label: tab.options.name || widget.type,
            selectable: false,
            children: []
          }
          curNode.children.push(tabNode)
          tab.widgetList.map((wChild) => {
            this.buildTreeNodeOfWidget(wChild, tabNode.children)
          })
        })
      } else if (widget.type === 'sub-form') {
        widget.widgetList.map((wChild) => {
          this.buildTreeNodeOfWidget(wChild, curNode.children)
        })
      } else if (widget.category === 'container') {
        //自定义容器
        widget.widgetList.map((wChild) => {
          this.buildTreeNodeOfWidget(wChild, curNode.children)
        })
      }
    },

    refreshNodeTree() {
      this.nodeTreeData.length = 0
      this.designer.widgetList.forEach((wItem) => {
        this.buildTreeNodeOfWidget(wItem, this.nodeTreeData)
      })
    },

    showNodeTreeDrawer() {
      this.refreshNodeTree()
      this.showNodeTreeDrawerFlag = true
      this.$nextTick(() => {
        if (!!this.designer.selectedId) {
          //同步当前选中组件到节点树！！！
          this.$refs.nodeTree.setCurrentKey(this.designer.selectedId)
        }
      })
    },

    undoHistory() {
      this.designer.undoHistoryStep()
    },

    redoHistory() {
      this.designer.redoHistoryStep()
    },

    changeLayoutType(newType) {
      this.designer.changeLayoutType(newType)
    },

    clearFormWidget() {
      this.designer.clearDesigner()
    },

    previewForm() {
      loadBeautifier((beautifier) => {
        this.itemData = genSFC(this.designer.formConfig, this.designer.widgetList, beautifier, false, true)
        this.showPreviewDialogFlag = true
      })
    },

    saveAsFile(fileContent, defaultFileName) {
      this.$prompt(this.i18nt('designer.hint.fileNameForSave'), this.i18nt('designer.hint.saveFileTitle'), {
        inputValue: defaultFileName,
        closeOnClickModal: false,
        inputPlaceholder: this.i18nt('designer.hint.fileNameInputPlaceholder')
      })
        .then(({ value }) => {
          if (!value) {
            value = defaultFileName
          }

          if (getQueryParam('vscode') == 1) {
            this.vsSaveFile(value, fileContent)
            return
          }

          const fileBlob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' })
          saveAs(fileBlob, value)
        })
        .catch(() => {
          //
        })
    },

    vsSaveFile(fileName, fileContent) {
      const msgObj = {
        cmd: 'writeFile',
        data: {
          fileName,
          code: fileContent
        }
      }
      window.parent.postMessage(msgObj, '*')
    },

    importJson() {
      this.importTemplate = JSON.stringify(this.designer.getImportTemplate(), null, '  ')
      this.showImportJsonDialogFlag = true
    },

    doJsonImport() {
      try {
        let importObj = JSON.parse(this.importTemplate)
        this.designer.loadFormJson(importObj)

        this.showImportJsonDialogFlag = false
        this.$message.success(this.i18nt('designer.hint.importJsonSuccess'))

        this.designer.emitHistoryChange()

        this.designer.emitEvent('form-json-imported', [])
      } catch (ex) {
        this.$message.error(ex + '')
      }
    },

    exportJson(type = false) {
      let widgetList = deepClone(this.designer.widgetList)
      let formConfig = deepClone(this.designer.formConfig)
      this.jsonContent = JSON.stringify({ widgetList, formConfig }, null, '  ')
      this.jsonRawContent = JSON.stringify({ widgetList, formConfig })
      if (type) {
        return this.jsonRawContent
      }
      this.showExportJsonDialogFlag = true
    },

    copyFormJson(e) {
      copyToClipboard(this.jsonRawContent, e, this.$message, this.i18nt('designer.hint.copyJsonSuccess'), this.i18nt('designer.hint.copyJsonFail'))
    },

    saveFormJson() {
      this.saveAsFile(this.jsonContent, `vform${generateId()}.json`)
    },

    exportCode() {
      this.vueCode = generateCode(this.formJson)
      this.htmlCode = generateCode(this.formJson, 'html')
      this.showExportCodeDialogFlag = true
    },

    copyVueCode(e) {
      copyToClipboard(this.vueCode, e, this.$message, this.i18nt('designer.hint.copyVueCodeSuccess'), this.i18nt('designer.hint.copyVueCodeFail'))
    },

    copyHtmlCode(e) {
      copyToClipboard(this.htmlCode, e, this.$message, this.i18nt('designer.hint.copyHtmlCodeSuccess'), this.i18nt('designer.hint.copyHtmlCodeFail'))
    },

    saveVueCode() {
      this.saveAsFile(this.vueCode, `vform${generateId()}.vue`)
    },

    saveHtmlCode() {
      this.saveAsFile(this.htmlCode, `vform${generateId()}.html`)
    },

    generateSFC() {
      loadBeautifier((beautifier) => {
        this.sfcCode = genSFC(this.designer.formConfig, this.designer.widgetList, beautifier)
        console.log(this.designer.formConfig, 'this.designer.formConfigthis.designer.formConfig')
        console.log(this.designer.widgetList, 'this.designer.widgetListthis.designer.widgetList')
        this.sfcCodeV3 = genSFC(this.designer.formConfig, this.designer.widgetList, beautifier, true)
        this.showExportSFCDialogFlag = true
      })
    },

    copyV2SFC(e) {
      copyToClipboard(this.sfcCode, e, this.$message, this.i18nt('designer.hint.copySFCSuccess'), this.i18nt('designer.hint.copySFCFail'))
    },

    copyV3SFC(e) {
      copyToClipboard(this.sfcCodeV3, e, this.$message, this.i18nt('designer.hint.copySFCSuccess'), this.i18nt('designer.hint.copySFCFail'))
    },

    saveV2SFC() {
      this.saveAsFile(this.sfcCode, `vformV2-${generateId()}.vue`)
    },

    saveV3SFC() {
      this.saveAsFile(this.sfcCodeV3, `vformV3-${generateId()}.vue`)
    },

    getFormData() {
      this.$refs['preForm']
        .getFormData()
        .then((formData) => {
          this.formDataJson = JSON.stringify(formData, null, '  ')
          this.formDataRawJson = JSON.stringify(formData)

          this.showFormDataDialogFlag = true
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },

    copyFormDataJson(e) {
      copyToClipboard(this.formDataRawJson, e, this.$message, this.i18nt('designer.hint.copyJsonSuccess'), this.i18nt('designer.hint.copyJsonFail'))
    },

    saveFormData() {
      this.saveAsFile(this.htmlCode, `formData${generateId()}.json`)
    },

    resetForm() {
      this.$refs['preForm'].resetForm()
    },

    setFormDisabled() {
      this.$refs['preForm'].disableForm()
    },

    setFormEnabled() {
      this.$refs['preForm'].enableForm()
    },

    handleFormChange(fieldName, newValue, oldValue, formModel) {
      /*
        console.log('---formChange start---')
        console.log('fieldName', fieldName)
        console.log('newValue', newValue)
        console.log('oldValue', oldValue)
        console.log('formModel', formModel)
        console.log('---formChange end---')
        */
    },

    testOnAppendButtonClick(clickedWidget) {
      console.log('test', clickedWidget)
    },

    testOnButtonClick(button) {
      console.log('test', button)
    },

    findWidgetById(wId) {
      let foundW = null
      traverseAllWidgets(this.designer.widgetList, (w) => {
        if (w.id === wId) {
          foundW = w
        }
      })

      return foundW
    },

    onNodeTreeClick(nodeData, node, nodeEl) {
      //console.log('test', JSON.stringify(nodeData))

      if (nodeData.selectable !== undefined && !nodeData.selectable) {
        this.$message.info(this.i18nt('designer.hint.currentNodeCannotBeSelected'))
      } else {
        const selectedId = nodeData.id
        const foundW = this.findWidgetById(selectedId)
        if (!!foundW) {
          this.designer.setSelected(foundW)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.toolbar-container {
}

.left-toolbar {
  float: left;
  margin-top: 5px;
  font-size: 16px;
}

.right-toolbar {
  float: right;

  ::v-deep .el-button--text {
    font-size: 14px !important;
  }
}

.el-button i {
  margin-right: 3px;
}

.small-padding-dialog {
  ::v-deep .el-dialog__header {
    //padding-top: 3px;
    //padding-bottom: 3px;
    background: #f1f2f3;
  }

  ::v-deep .el-dialog__body {
    padding: 12px 15px 12px 15px;

    .el-alert.alert-padding {
      padding: 0 10px;
    }
  }

  ::v-deep .ace-container {
    border: 1px solid #dcdfe6;
  }
}

.dialog-title-light-bg {
  ::v-deep .el-dialog__header {
    background: #f1f2f3;
  }
}

.no-box-shadow {
  box-shadow: none;
}

.no-padding.el-tabs--border-card {
  ::v-deep .el-tabs__content {
    padding: 0;
  }
}

.form-render-wrapper {
  //height: calc(100vh - 142px);
  all: revert !important; /* 防止表单继承el-dialog等外部样式，未生效，原因不明？？ */
}

.form-render-wrapper.h5-layout {
  margin: 0 auto;
  width: 420px;
  border-radius: 15px;
  //border-width: 10px;
  box-shadow: 0 0 1px 10px #495060;
  height: calc(100vh - 142px);
}

.node-tree-drawer ::v-deep {
  .el-drawer {
    padding: 15px;
    overflow: auto;
  }

  .el-drawer__header {
    margin-bottom: 12px;
    padding: 5px 5px 0;
  }
}

/*.node-tree-scroll-bar {*/
/*  height: 100%;*/
/*  overflow: auto;*/
/*}*/

.node-tree ::v-deep {
  .el-tree > .el-tree-node:after {
    border-top: none;
  }
  .el-tree-node {
    position: relative;
    padding-left: 12px;
  }

  .el-tree-node__content {
    padding-left: 0 !important;
  }

  .el-tree-node__expand-icon.is-leaf {
    display: none;
  }
  .el-tree-node__children {
    padding-left: 12px;
  }

  .el-tree-node :last-child:before {
    height: 38px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  .el-tree-node:before {
    content: '';
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:after {
    content: '';
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:before {
    border-left: 1px dashed #4386c6;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  .el-tree-node:after {
    border-top: 1px dashed #4386c6;
    height: 20px;
    top: 12px;
    width: 16px;
  }

  .el-tree-node.is-current > .el-tree-node__content {
    background: #c2d6ea !important;
  }

  .el-tree-node__expand-icon {
    margin-left: -3px;
    padding: 6px 6px 6px 0px;
    font-size: 16px;
  }

  .el-tree-node__expand-icon.el-icon-caret-right:before {
    //font-size: 16px;
    //content: "\e723";
  }

  .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    //font-size: 16px;
    //content: "\e722";
  }
}
</style>
