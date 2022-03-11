<template>
  <div>
    <el-scrollbar class="side-scroll-bar">
      <div class="panel-container">
        <el-tabs v-model="firstTab" class="no-bottom-margin indent-left-margin">
          <el-tab-pane name="componentLib">
            <span slot="label"><i class="el-icon-set-up"></i> {{ i18nt('designer.componentLib') }}</span>
            <el-collapse v-model="activeNames" class="widget-collapse">
              <el-collapse-item name="1" :title="i18nt('designer.containerTitle')">
                <draggable
                  tag="ul"
                  :list="containers"
                  :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                  :clone="handleContainerWidgetClone"
                  ghost-class="ghost"
                  :sort="false"
                  :move="checkContainerMove"
                  @end="onContainerDragEnd"
                >
                  <li
                    v-show="ctn.type !== 'gdEchart'"
                    v-for="(ctn, index) in containers"
                    :key="index"
                    class="container-widget-item"
                    :title="ctn.displayName"
                    @dblclick="addContainerByDbClick(ctn)"
                  >
                    <el-popover v-if="ctn.type === 'table'" placement="right" width="220" trigger="hover">
                      <div class="table_span">
                        <span
                          :class="activeIndex >= index && setActiveNum(activeIndex, index) ? 'spanActive' : ''"
                          v-for="(item, index) in 100"
                          :key="index"
                          @mouseover="hoverMethod('mouseover', index)"
                          @mouseleave="hoverMethod('mouseleave')"
                          @click="tableSpanMethod(ctn)"
                        >
                        </span>
                      </div>
                      <span slot="reference" style="padding-left: 25px; position: relative">
                        <img style="width: 14px; position: absolute; top: 2px; left: 5px" :src="require(`../../../icons/svg/${ctn.icon}.svg`)" alt="" />

                        {{ i18n2t(`designer.widgetLabel.${ctn.type}`, `extension.widgetLabel.${ctn.type}`) }}</span
                      >
                    </el-popover>
                    <span v-else style="padding-left: 25px; position: relative">
                      <img style="width: 14px; position: absolute; top: 2px; left: 5px" :src="require(`../../../icons/svg/${ctn.icon}.svg`)" alt="" />

                      {{ i18n2t(`designer.widgetLabel.${ctn.type}`, `extension.widgetLabel.${ctn.type}`) }}</span
                    >
                  </li>
                </draggable>
              </el-collapse-item>
              <el-collapse-item name="10" :title="i18nt('designer.echartTitle')">
                <el-button type="primary" size="small" @click="openEchart">大屏</el-button>
                <draggable
                  tag="ul"
                  :list="containersEchart"
                  :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                  :clone="handleContainerWidgetClone"
                  ghost-class="ghost"
                  :sort="false"
                  :move="checkContainerMove"
                  @end="onContainerDragEnd"
                >
                  <li v-for="(ctn, index) in containersEchart" :key="index" class="container-widget-item" :title="ctn.displayName" @dblclick="addContainerByDbClick(ctn)">
                    <span style="padding-left: 25px; position: relative">
                      <img style="width: 14px; position: absolute; top: 2px; left: 5px" :src="require(`../../../icons/svg/${ctn.icon}.svg`)" alt="" />

                      {{ ctn.echartName }}</span
                    >
                  </li>
                </draggable>
              </el-collapse-item>
              <el-collapse-item name="2" :title="i18nt('designer.basicFieldTitle')">
                <draggable tag="ul" :list="basicFields" :group="{ name: 'dragGroup', pull: 'clone', put: false }" :clone="handleFieldWidgetClone" ghost-class="ghost" :sort="false">
                  <li v-for="(fld, index) in basicFields" :key="index" class="field-widget-item" :title="fld.displayName" @dblclick="addFieldByDbClick(fld)">
                    <span style="padding-left: 25px; position: relative">
                      <img style="width: 14px; position: absolute; top: 2px; left: 5px" :src="require(`../../../icons/svg/${fld.icon}.svg`)" alt="" />

                      {{ i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`) }}</span
                    >
                  </li>
                </draggable>
              </el-collapse-item>

              <el-collapse-item name="3" :title="i18nt('designer.advancedFieldTitle')">
                <draggable
                  tag="ul"
                  :list="advancedFields"
                  :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                  :clone="handleFieldWidgetClone"
                  ghost-class="ghost"
                  :sort="false"
                >
                  <li v-for="(fld, index) in advancedFields" :key="index" class="field-widget-item" :title="fld.displayName" @dblclick="addFieldByDbClick(fld)">
                    <span style="padding-left: 25px; position: relative">
                      <img style="width: 14px; position: absolute; top: 2px; left: 5px" :src="require(`../../../icons/svg/${fld.icon}.svg`)" alt="" />
                      {{ i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`) }}</span
                    >
                  </li>
                </draggable>
              </el-collapse-item>

              <!-- -->
              <el-collapse-item name="4" :title="i18nt('designer.customFieldTitle')">
                <!-- <li v-for="(fld, index) in customFields" :key="index" class="field-widget-item" :title="fld.displayName" @dblclick="addFieldByDbClick(fld)">
                  <span style="padding-left: 25px; position: relative">
                    <img style="width: 14px; position: absolute; top: 2px; left: 5px" :src="require(`../../../icons/svg/${fld.icon}.svg`)" alt="" />
                    {{ i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`) }}</span
                  >
                </li> -->
                <el-tree :data="dataTree" :props="defaultProps" node-key="id" default-expand-all @node-click="executeSql">
                  <span slot-scope="{ data }" class="custom-tree-node modulemng-custom-tree-node" style="justify-content: left">
                    <svg-icon v-if="data.typeCode === 'searchdefData'" :icon-class="'dbziduan'" style="margin: 0 5px" />
                    <svg-icon v-else :icon-class="'el-icon-folder'" style="margin: 0 5px" />
                    <span title="右键跳转编辑">{{ data.typeName }}</span>
                  </span>
                </el-tree>
              </el-collapse-item>
              <!-- -->
            </el-collapse>
          </el-tab-pane>

          <el-tab-pane name="formLib" style="padding: 8px">
            <span slot="label"><i class="el-icon-c-scale-to-original"></i> {{ i18nt('designer.formLib') }}</span>

            <template v-for="(ft, idx) in formModuleList">
              <el-card :bord-style="{ padding: '0' }" shadow="hover" class="ft-card" :key="idx">
                <el-popover placement="right" trigger="click" width="600px">
                  <el-button type="primary" slot="reference" style="width: 200px">点击查看效果图</el-button>
                  <!-- <img :src="ft.imgUrl" style="height: 600px; width: 720px" /> -->
                  <div style="width: 1000px">
                    <Test :item-data="itemData(ft.compView)"></Test>
                  </div>
                </el-popover>
                <div class="bottom clear-fix">
                  <span class="ft-title">#{{ idx + 1 }} {{ ft.compValue }}</span>
                  <el-button type="text" class="right-button" @click="loadFormTemplate(ft.compJavascript)"> {{ i18nt('designer.hint.loadFormTemplate') }}</el-button>
                </div>
              </el-card>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
    <EchartDraw ref="openEchart"></EchartDraw>
    <!-- <gd-dialog :title="'表格设置'" :z-index="2001" :closed.sync="showDialog" :append-to-body="true" height="200px" draggable maximizable :maximized.sync="maximized">
      <dir>
        <el-radio v-model="splitRadio" label="row">拆分成行</el-radio>
        <el-radio v-model="splitRadio" label="col">拆分成列</el-radio>
        <el-input-number size="small" v-model="splitNum" :min="1"></el-input-number>
      </dir>
      <template slot="footer">
        <div>
          <el-button size="small" type="primary" @click="splitRowCol">确认</el-button>
          <el-button size="small" @click="showDialog = false">取消</el-button>
        </div>
      </template>
    </gd-dialog> -->
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { containers, containersEchart, basicFields, advancedFields, customFields } from './widgetsConfig'
import { formTemplates } from './templatesConfig'
import { addWindowResizeHandler } from '../../../utils/util'
import i18n from '../../../utils/i18n'
import { getTreeTypeAndSearchDef, iniSearch } from '../../../../api/biManger'
import ftImg1 from '../../../assets/ft-images/t1.png'
import ftImg2 from '../../../assets/ft-images/t2.png'
import ftImg3 from '../../../assets/ft-images/t3.png'
import ftImg4 from '../../../assets/ft-images/t4.png'
import ftImg5 from '../../../assets/ft-images/t5.png'
import ftImg6 from '../../../assets/ft-images/t6.png'
import ftImg7 from '../../../assets/ft-images/t7.png'
import ftImg8 from '../../../assets/ft-images/t8.png'
import Test from '../toolbar-panel/test.vue'
import EchartDraw from '../../echart'
export default {
  name: 'FieldPanel',
  mixins: [i18n],
  components: {
    Draggable,
    Test,
    EchartDraw
  },
  props: {
    designer: Object,
    formModuleList: {
      type: Array,
      default: () => []
    }
  },
  inject: ['getBannedWidgets', 'getDesignerConfig'],
  data() {
    return {
      activeIndex: -2,
      defaultProps: {
        children: 'children',
        label: 'typeName'
      },
      dataTree: [],
      designerConfig: this.getDesignerConfig(),
      formConfig: {
        modelName: 'formData',
        refName: 'vForm',
        rulesName: 'rules',
        labelWidth: 80,
        labelPosition: 'left',
        size: '',
        labelAlign: 'label-left-align',
        cssCode: '',
        customClass: '',
        functions: '',
        layoutType: 'PC',
        onFormCreated: '',
        onFormMounted: '',
        onFormDataChange: ''
      },
      firstTab: 'componentLib',

      scrollerHeight: 0,

      activeNames: ['1', '2', '3', '4'],
      containersEchart,
      containers,
      basicFields,
      advancedFields,
      customFields,

      formTemplates: formTemplates,
      ftImages: [{ imgUrl: ftImg1 }, { imgUrl: ftImg2 }, { imgUrl: ftImg3 }, { imgUrl: ftImg4 }, { imgUrl: ftImg5 }, { imgUrl: ftImg6 }, { imgUrl: ftImg7 }, { imgUrl: ftImg8 }]
    }
  },
  computed: {
    itemData() {
      return (compView) => {
        return JSON.parse(compView)
      }
    }
  },
  mounted() {
    this.loadWidgets()
    this.getTreeTypeAndSearchDef()
    this.scrollerHeight = window.innerHeight - 56 + 'px'
    addWindowResizeHandler(() => {
      this.$nextTick(() => {
        this.scrollerHeight = window.innerHeight - 56 + 'px'
        //console.log(this.scrollerHeight)
      })
    })
  },
  methods: {
    setActiveNum(num, indexNum) {
      const arrActive = num.toString().charAt(num.toString().length - 1)
      const arrIndex = indexNum.toString().charAt(indexNum.toString().length - 1)
      return parseInt(arrActive) >= parseInt(arrIndex)
    },
    hoverMethod(type, index) {
      if (type === 'mouseover') {
        this.activeIndex = index
      } else {
        this.activeIndex = -2
      }
    },
    openEchart() {
      this.$refs.openEchart.showEchart = true
    },
    // 获取参数
    async executeSql(row) {
      if (row.typeCode !== 'searchdefData') {
        return
      }
      this.$confirm('是否加载此表?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.iniSelSearch(row.id)
      })
    },
    async iniSelSearch(rowId) {
      const paramsData = {
        id: rowId
      }
      const retConfig = await iniSearch(paramsData)

      if (retConfig.success) {
        const columns = retConfig.data.aSearch.retcolumns
        const columnsView = this.getCoumns({ data: columns })
        const whereField = retConfig.data.aSearch.conditions
        const toolList = retConfig.data.aSearch.tools
        const containerList = this.getContainerList(columnsView, retConfig.data.aSearch.id)
        const basicFieldsList = this.getBasicFieldsList(whereField)
        const toolNavList = this.getToolList(toolList)
        const widgetList = [...basicFieldsList, ...toolNavList, ...containerList]

        const importObj = {
          widgetList: widgetList,
          formConfig: this.formConfig
        }
        this.doJsonImport(importObj)
      } else {
        this.$message.error(retConfig.message)
      }
    },
    doJsonImport(importObj) {
      try {
        this.designer.loadFormJson(importObj)
        this.$message.success(this.i18nt('designer.hint.importJsonSuccess'))
        this.designer.emitHistoryChange()
        this.designer.emitEvent('form-json-imported', [])

        this.designer.setSelected(this.designer.widgetList[this.designer.widgetList.length - 1])
      } catch (ex) {
        this.$message.error(ex + '')
      }
    },
    getToolList(toolList) {
      let arr = []
      toolList.forEach((el) => {
        let list = this.basicFields.find((res) => res.type === 'button')
        list.id = 'button' + el.id
        list.options.name = 'button' + el.id
        list.options.label = el.resChname
        arr.push(list)
      })
      return arr
    },
    getBasicFieldsList(whereField) {
      let arr = []
      whereField.forEach((el) => {
        if (el.type !== '') {
          let list = this.basicFields.find((res) => res.type === 'input')
          list.id = el.param1
          list.options.name = el.param1
          list.options.labelHidden = false
          list.options.label = el.fieldLabel
          arr.push(list)
        }
      })
      return arr
    },
    getContainerList(columnsView, id) {
      let arr = []
      const params = { id: id }
      if (columnsView.length > 0) {
        arr = this.containers
          .filter((res) => res.type === 'gdTable')
          .map((el) => {
            return {
              ...el,
              id: 'gdTable' + id,
              searchId: id,
              tableType: 'custom',
              options: {
                ...el.options,
                tableConfig: {
                  ...el.options.tableConfig,
                  url: '/gdbpm/BiSearchdef/executeBiQuery',
                  config4: JSON.stringify(params),
                  config5: 'data'
                },
                name: 'gdTable' + id,
                tableColumn: [{ arr: columnsView }]
              }
            }
          })
      }
      return arr
    },
    getCoumns(d) {
      let arr = []
      if (d.data.length > 0) {
        d.data = d.data.filter((res) => res.visible)
        arr = d.data.map((item) => {
          return {
            label: item.label,
            prop: item.alias,
            name: item.resName,
            id: item.resId,
            align: 'center',
            dictCode: item.dictCode
          }
        })
      }
      return arr
    },
    async getTreeTypeAndSearchDef() {
      const resData = await getTreeTypeAndSearchDef({ code: 'mbglml' })
      this.dataTree = resData.data.children
    },
    isBanned(wName) {
      return this.getBannedWidgets().indexOf(wName) > -1
    },

    showFormTemplates() {
      if (this.designerConfig['formTemplates'] === undefined) {
        return true
      }

      return !!this.designerConfig['formTemplates']
    },

    loadWidgets() {
      this.containers = this.containers
        .map((con) => {
          return {
            ...con,
            displayName: this.i18n2t(`designer.widgetLabel.${con.type}`, `extension.widgetLabel.${con.type}`)
          }
        })
        .filter((con) => {
          return !con.internal && !this.isBanned(con.type)
        })

      this.basicFields = this.basicFields
        .map((fld) => {
          return {
            ...fld,
            displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)
          }
        })
        .filter((fld) => {
          return !this.isBanned(fld.type)
        })

      this.advancedFields = this.advancedFields
        .map((fld) => {
          return {
            ...fld,
            displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)
          }
        })
        .filter((fld) => {
          return !this.isBanned(fld.type)
        })

      this.customFields = this.customFields
        .map((fld) => {
          return {
            ...fld,
            displayName: this.i18n2t(`designer.widgetLabel.${fld.type}`, `extension.widgetLabel.${fld.type}`)
          }
        })
        .filter((fld) => {
          return !this.isBanned(fld.type)
        })
    },
    tableSpanMethod(originObj) {
      if (this.activeIndex < 10) {
        this.designer.addContainerByDbClick(originObj, 1, this.activeIndex + 1)
      } else {
        const arr = this.activeIndex.toString().split('')
        this.designer.addContainerByDbClick(originObj, parseInt(arr[0]) + 1, parseInt(arr[1]) + 1)
      }
    },
    handleContainerWidgetClone(originObj) {
      // console.log(originObj, 'originorigin')
      return this.designer.copyNewContainerWidget(originObj)
    },

    handleFieldWidgetClone(origin) {
      return this.designer.copyNewFieldWidget(origin)
    },

    checkContainerMove(evt) {
      return this.designer.checkWidgetMove(evt)
    },

    onContainerDragEnd(evt) {
      //console.log('Drag end of container: ')
      //console.log(evt)
    },

    addContainerByDbClick(container) {
      this.designer.addContainerByDbClick(container)
    },

    addFieldByDbClick(widget) {
      this.designer.addFieldByDbClick(widget)
    },

    loadFormTemplate(inportModuleObj) {
      this.$confirm(this.i18nt('designer.hint.loadFormTemplateHint'), this.i18nt('render.hint.prompt'), {
        confirmButtonText: this.i18nt('render.hint.confirm'),
        cancelButtonText: this.i18nt('render.hint.cancel')
      })
        .then(() => {
          const importObj = JSON.parse(inportModuleObj)
          this.doJsonImport(importObj)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
<style lang="scss">
.side-scroll-bar {
  .el-scrollbar__view {
    overflow: hidden;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.panel-container::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.panel-container::-webkit-scrollbar-thumb {
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
.panel-container::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
</style>
<style lang="scss" scoped>
$--color-primary: #409eff;
.table_span {
  width: 220px;
  height: 230px;
  span {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 1px solid #e9e9e9;
    margin-right: 5px;
    margin-bottom: 0px;
    background: #f8f8f8;
  }
  .spanActive {
    border: 1px solid #c3d9ff;
    background: #ddeafb;
  }
}
.side-scroll-bar {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar__view {
    overflow: hidden;
  }
  div.panel-container {
    padding-bottom: 10px;
    height: 100%;
    overflow: auto;
  }

  .no-bottom-margin .el-tabs__header {
    margin-bottom: 0;
  }

  .indent-left-margin {
    .el-tabs__nav {
      margin-left: 20px;
    }
  }

  .el-collapse-item ul > li {
    list-style: none;
  }
  border-top-width: 0;

  .el-collapse-item__header {
    margin-left: 8px;
    font-style: italic;
    font-weight: bold;
  }

  .el-collapse-item__content {
    padding-bottom: 6px;
    ul {
      padding-left: 10px; /* 重置IE11默认样式 */
      margin: 0; /* 重置IE11默认样式 */
      margin-block-start: 0;
      margin-block-end: 0.25em;
      padding-inline-start: 10px;

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      .container-widget-item,
      .field-widget-item {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        width: 115px;
        float: left;
        margin: 2px 6px 6px 0;
        cursor: move;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background: #f1f2f3;
      }

      .container-widget-item:hover,
      .field-widget-item:hover {
        background: #ebeef5;
        outline: 1px solid $--color-primary;
      }

      .drag-handler {
        position: absolute;
        top: 0;
        left: 160px;
        background-color: #dddddd;
        border-radius: 5px;
        padding-right: 5px;
        font-size: 11px;
        color: #666666;
      }
    }
  }
}

.el-card.ft-card {
  border: 1px solid #8896b3;
}

.ft-card {
  margin-bottom: 10px;

  .bottom {
    margin-top: 10px;
    line-height: 12px;
  }

  /*
    .image-zoom {
      height: 500px;
      width: 620px
    }
    */

  .ft-title {
    font-size: 13px;
    font-weight: bold;
  }

  .right-button {
    padding: 0;
    float: right;
  }

  .clear-fix:before,
  .clear-fix:after {
    display: table;
    content: '';
  }

  .clear-fix:after {
    clear: both;
  }
}
</style>
