<template>
  <div class="add_col_clss">
    <gd-dialog
      :title="'添加表格列数据'"
      size="small"
      :z-index="1200"
      :closed.sync="showDialog"
      :append-to-body="true"
      draggable
      :maximized.sync="maximized"
      width="1000px"
      height="600px"
    >
      <!-- {{ tableTotal }} -->
      <div style="text-align: right; margin-bottom: 10px">
        <el-button type="primary" size="mini" @click="addData">导入数据</el-button>
        <el-button type="primary" size="mini" @click="addCol">添加列</el-button>
      </div>
      <div v-for="(item, index) in tableTotal" :key="index" class="table">
        <div class="colitem">
          第{{ index + 1 }}列
          <span>
            <el-radio v-model="item.useValue" label="1">是</el-radio>
            <el-radio v-model="item.useValue" label="0">否</el-radio>
            <el-button type="primary" size="mini" @click="codeEdit(item, index)">代码编辑</el-button>
            <el-button v-if="index !== 0" type="warning" size="mini" @click="deleteCol(index)">删除列</el-button>
          </span>
        </div>
        <gd-table ref="gdtable" :columns="item.tableColumn" :data="item.tableData">
          <template slot="labelTable" slot-scope="scope">
            <el-select v-model="scope.row.label" allow-create filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </template>
          <template slot="valueTable" slot-scope="scope">
            <el-input v-model="scope.row.value" placeholder="请输入内容"></el-input>
          </template>
          <template slot="deleteCol" slot-scope="scope">
            <el-button type="warning" size="mini" @click="deleteColChild(item.tableData, scope.$index)">删除</el-button>
          </template>
        </gd-table>
        <div class="addIcon" title="添加列字段" @click="addColItem(item)"><i class="el-icon-circle-plus-outline"></i></div>
      </div>
      <template slot="footer">
        <div>
          <el-button size="small" type="primary" @click="submit">确定</el-button>
          <el-button size="small" @click="showDialog = false">关闭</el-button>
        </div>
      </template>
    </gd-dialog>
    <gd-dialog
      :title="'导入列数据'"
      size="small"
      :z-index="2001"
      :closed.sync="showImportDialog"
      :append-to-body="true"
      draggable
      :maximized.sync="maximized"
      width="1000px"
      height="600px"
    >
      <code-editor :mode="'javascript'" :readonly="false" v-model="importData" style="margin-top: 10px"></code-editor>
      <template slot="footer">
        <div>
          <el-button size="small" type="primary" @click="submitImportData">确定</el-button>
          <el-button size="small" @click="showImportDialog = false">关闭</el-button>
        </div>
      </template>
    </gd-dialog>
    <BtnDrawer ref="btnDrawer" :generate-conf="generateConf" size="100%" @saveCodeData="saveCodeData" @closedPreview="closedPreview" />
  </div>
</template>

<script>
import i18n from '../../../../../utils/i18n'
import CodeEditor from '../../../../code-editor/index'
const BtnDrawer = () => import('gd_vue_components/src/components_others/gd_form_design/src/views/index/BtnDrawer')
export default {
  name: 'add-column',
  components: { BtnDrawer, CodeEditor },
  mixins: [i18n],
  data() {
    return {
      visibleDraw: false,
      codeObj: {},
      viewDialog: true,
      showDialog: false,
      showImportDialog: false,
      importData: '',
      generateConf: { fileName: '', type: 'file' },
      options: [
        { label: 'prop', value: 'prop' },
        { label: 'width', value: 'width' },
        { label: 'fixed', value: 'fixed' },
        { label: 'align', value: 'align' },
        { label: 'label', value: 'label' },
        { label: 'type', value: 'type' }
      ],
      tableTotal: [
        {
          tableData: [],
          tableColumn: [
            { prop: 'labelTable', label: '字段名' },
            { prop: 'valueTable', label: '字段值' },
            { prop: 'deleteCol', label: '操作', width: '100' }
          ]
        }
      ]
    }
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    designer: Object,
    selectedWidget: Object,
    optionModel: Object
  },
  mounted() {
    const initValue = this.value

    if (initValue.length > 0) {
      if (initValue[0].tableTotal) {
        this.tableTotal = initValue[0].tableTotal
      } else {
        this.tableTotal = this.setCustomTableData(initValue[0].arr)
      }
    }
  },
  methods: {
    addData() {
      this.showImportDialog = true
    },
    submitImportData() {
      const importList = eval(`(${this.importData})`)
      this.tableTotal = this.setCustomTableData(importList)
      this.showImportDialog = false
    },
    setCustomTableData(initValue) {
      let arr = []
      initValue.forEach((res) => {
        arr.push({
          tableData: this.setTableItem(res),
          tableColumn: [
            { prop: 'labelTable', label: '字段名' },
            { prop: 'valueTable', label: '字段值' },
            { prop: 'deleteCol', label: '操作', width: '100' }
          ]
        })
      })
      return arr
    },
    setTableItem(res) {
      let list = []
      for (let i in res) {
        const l = this.options.filter((item) => item.value === i)
        if (l.length > 0) {
          list.push({ labelTable: 'prop', valueTable: '字段名', label: i, value: res[i] })
        }
      }
      return list
    },
    closedPreview() {
      this.showDialog = true
    },
    codeEdit(row, index) {
      const canEdit = row.dragConfig && row.dragConfig !== ''
      this.codeObj = { ...row, index }
      this.showDialog = false
      this.$refs.btnDrawer.onOpen({ compJavascript: row.compJavascript + '#code#' || '', compView: row.compView || '', compCss: row.compCss || '' }, canEdit)
    },
    saveCodeData({ htmlCode, jsCode, cssCode, otherJsCode }) {
      this.$set(this.tableTotal[this.codeObj.index], 'compJavascript', jsCode)
      this.$set(this.tableTotal[this.codeObj.index], 'compCss', cssCode)
      this.$set(this.tableTotal[this.codeObj.index], 'compView', htmlCode)
    },
    submit() {
      let arr = []
      this.tableTotal.forEach((res) => {
        const newObj = this.getColData(res, res.tableData)
        arr.push(newObj)
      })
      this.$emit('input', [{ tableTotal: this.tableTotal, arr: arr }])
      this.showDialog = false
    },
    getColData(totalRes, data) {
      let dataArr = {}
      for (let i = 0; i < data.length; i++) {
        dataArr[data[i].label] = data[i].value
        dataArr[`props${data[i].value}_compJavascript`] = totalRes.compJavascript || ''
        dataArr[`props${data[i].value}compCss`] = totalRes.compCss || ''
        dataArr[`props${data[i].value}compView`] = totalRes.compView || ''
        dataArr[`props${data[i].value}useValue`] = totalRes.useValue || ''
        dataArr[`dragConfig`] = totalRes.dragConfig || ''
      }
      return dataArr
    },
    addColItem(item) {
      item.tableData.push({
        labelTable: 'prop',
        valueTable: '字段名'
      })
    },
    deleteCol(index) {
      this.tableTotal.splice(index, 1)
    },
    deleteColChild(itemData, index) {
      itemData.splice(index, 1)
    },
    addCol() {
      this.tableTotal.push({
        tableData: [],
        tableColumn: [
          { prop: 'labelTable', label: '字段名' },
          { prop: 'valueTable', label: '字段值' },
          { prop: 'deleteCol', label: '操作', width: '100' }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.addIcon {
  text-align: center;
  color: rgb(30, 129, 241);
  cursor: pointer;
}
.colitem {
  padding: 5px 0;
  margin-bottom: 8px;
  position: relative;
  span {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
