<template>
  <div ref="baseContain" class="base-contain-dict" style="height: 100%">
    <div ref="menu_container" class="menu_container">
      <div class="menu_left">
        <div class="menu_top">导航列表</div>
        <div class="menu_bottom">
          <el-tree ref="tree" :data="dictTreeList" :props="defaultProps" class="filter-tree" default-expand-all @node-click="nodeClick">
            <span slot-scope="{ node }" class="custom-tree-node">
              <span>
                <svg-icon icon-class="icoyygongneng" style="vertical-align: 0.3em; color: #409eff" />
                <span class="tree-node-label">{{ node.label }}</span>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="menu_right">
        <div class="menu_top">数据列表</div>
        <div class="query-condition-box">
          <el-form :inline="true" size="small">
            <el-form-item>
              <el-button type="primary" size="small" icon="el-icon-plus" @click="addChildItem('add', { type: activeName })"> 新增 </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-loading="loadingTable" class="menu_table" style="width: calc(100% - 1px)">
          <gd-table ref="gdtable" :columns="tableColumn" :bottom-offset="80" :data="tableRightList" border>
            <template slot="tagList" slot-scope="scope">
              <el-tag style="display: inline-block; margin-right: 5px" v-for="(item, index) in getTagList(scope.row.tagList)" :key="index">{{ item.name }}</el-tag>
            </template>
            <template slot="caozuo" slot-scope="scope">
              <el-button type="text" size="small" @click="editChildItem(scope.row)"> 编辑</el-button>
              <el-button type="text" size="small" @click="handleDelChild(scope.row)"> 删除</el-button>
              <el-button type="text" size="small" @click="codeMarkDown(scope.row)"> Markdown 编辑器</el-button>
              <el-button type="text" size="small" @click="codeEdit(scope.row)"> 代码编辑</el-button>
            </template>
          </gd-table>
        </div>
      </div>
    </div>
    <gd-dialog ref="gdDialog" :title="childDialogOpt.title" :closed.sync="childDialogOpt.showChild" width="720px" height="600px" draggable maximizable>
      <el-form ref="elForm" :inline="true" :rules="rules" :model="listForm" size="small" label-width="100px" style="padding: 20px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="listForm.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="作者:" prop="author">
          <el-input v-model="listForm.author" placeholder="作者" />
        </el-form-item>
        <el-form-item label="图片地址:" prop="imageUrl">
          <el-input v-model="listForm.imageUrl" placeholder="图片地址" />
        </el-form-item>
        <el-form-item :label="`${childDialogOpt.title}时间:`">
          <el-input v-model="listForm.time" :placeholder="`${childDialogOpt.title}时间`" disabled />
        </el-form-item>
        <el-divider>内容</el-divider>
        <el-form-item>
          <div style="display: flex; width: 666px; margin-bottom: 5px" :key="index" v-for="(content, index) in contentList">
            <div style="flex: 1">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="content.name"> </el-input>
            </div>
            <div style="width: 80px; margin-left: 5px; margin-top: 8px"><el-button type="warning" size="mini" @click="deleteContent(content, index)">删除</el-button></div>
          </div>
          <div style="text-align: center">
            <el-button type="primary" size="mini" @click="addContent">新增</el-button>
          </div>
        </el-form-item>
        <el-divider>标签</el-divider>
        <el-form-item>
          <span :key="index" v-for="(tag, index) in dynamicTags" style="padding-right: 10px" @dblclick="clickMethod(tag)">
            <el-tag v-if="!tag.value" effect="dark" closable :disable-transitions="false" @close="handleClose(tag, index)">
              {{ tag.name }}
            </el-tag>
            <el-input v-else class="input-new-tag" v-model="tag.name" size="small" @keyup.enter.native="handleInputTag(tag)" @blur="handleInputTag(tag)"> </el-input>
          </span>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>
          <!-- <el-input v-model="listForm.tagList" placeholder="标签" /> -->
        </el-form-item>
      </el-form>
      <template slot="footer">
        <div>
          <el-button size="small" type="primary" @click="submitList">确定</el-button>
          <el-button size="small" @click="childDialogOpt.showChild = false">关闭</el-button>
        </div>
      </template>
    </gd-dialog>
    <BtnDrawer ref="btnDrawer" :generate-conf="generateConf" size="100%" @saveCodeData="saveCodeData" @update:visible="visibleDraw" />
    <MarkDown ref="markDown" />
    <!--导入-->
  </div>
</template>
<script>
import { getHeaderData } from '@index/api/header'
import { addList, getList, updatelist, deletlist } from '@projects/manager/api/list'
const BtnDrawer = () => import('gd_vue_components/src/components_others/gd_form_design/src/views/index/BtnDrawer')
const MarkDown = () => import('./markdown.vue')
export default {
  components: {
    BtnDrawer,
    MarkDown
  },
  data() {
    return {
      // 函数变量
      title: '',
      dynamicTags: [{ name: '前端', value: false }],
      contentList: [{ name: '文本', value: false }],
      inputVisible: false,
      inputValue: '',
      dialogIndex: 2000,
      listForm: {
        author: '莫沫达',
        time: this.date(new Date(), 'yyyy-MM-dd hh:mm:ss', { d: 0 }),
        detailText: '',
        compView: '',
        compCss: '',
        compJavascript: ''
      },
      generateConf: { fileName: '', type: 'file' },
      drawerVisible: false,
      loadingTable: false,
      activeName: '',
      activeId: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      codeObj: {},
      dictTreeList: [],
      childDialogOpt: {
        show: false,
        showChild: false,
        type: 'add',
        title: '',
        source: null
      },
      tableColumn: [
        {
          label: '标题',
          prop: 'title',
          align: 'center'
        },
        {
          label: '作者',
          prop: 'author',
          width: '100px',
          align: 'center'
        },
        {
          label: '图片地址',
          prop: 'imageUrl',
          width: '150px',
          align: 'center'
        },
        {
          label: '标签',
          prop: 'tagList',
          align: 'center'
        },
        {
          label: '创建时间',
          prop: 'time',
          width: '100px',
          align: 'center'
        },
        {
          label: '操作',
          prop: 'caozuo',
          width: '280px',
          align: 'center'
        }
      ],
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        imageUrl: [{ required: true, message: '请输入图片地址', trigger: 'blur' }]
      },
      tableRightList: [],
      queryForm: {},
      dialogTitle: '',
      isEditCode: false,
      editRow: {},
      // 控件数据
      compData: {
        compCss: '',
        compJavascript: '',
        compView: '',
        compOthers: ''
      }
    }
  },
  computed: {
    getTagList() {
      return (list) => {
        return JSON.parse(list)
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getDictList()
  },
  methods: {
    codeMarkDown(row) {
      this.listForm = row
      this.$refs.markDown.showMarkDown = true
    },
    addContent() {
      this.contentList.push({ name: '文本', value: false })
    },
    deleteContent(content, index) {
      if (index === 0) {
        return
      }
      this.contentList.splice(this.contentList.indexOf(content), 1)
    },
    handleInputTag(tag) {
      this.$set(tag, 'value', false)
    },
    clickMethod(tag) {
      this.$set(tag, 'value', true)
    },
    handleClose(tag, index) {
      if (index === 0) {
        return
      }
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push({ name: inputValue, value: false })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitList() {
      this.$refs['elForm'].validate((valid) => {
        if (valid) {
          this.listForm.parentId = this.activeId
          this.listForm.contentList = JSON.stringify(this.contentList)
          this.listForm.tagList = JSON.stringify(this.dynamicTags)
          if (this.childDialogOpt.title === '新建') {
            addList(this.listForm).then((res) => {
              this.$message.success('新增成功')
              this.childDialogOpt.showChild = false
              this.getTableList()
            })
          } else {
            updatelist(this.listForm).then((res) => {
              this.$message.success('修改成功')
              this.childDialogOpt.showChild = false
              this.getTableList()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getTableList() {
      getList({ parentId: this.activeId }).then((res) => {
        this.tableRightList = res
      })
    },
    // 代码编辑
    codeEdit(row) {
      this.$refs.btnDrawer.onOpen(row)
      this.isEditCode = true
      this.editRow = row
      let jsCode = ''
      let otherJsCode = ''
      if (row.compJavascript.includes('#code#')) {
        const arr = row.compJavascript.split('#code#')
        jsCode = 'export default' + arr[0]
        otherJsCode = 'export default' + arr[1]
      }
      this.compData = {
        compCss: row.compCss,
        compJavascript: jsCode,
        compView: row.compView,
        compOthers: otherJsCode
      }
      this.drawerVisible = true
    },
    saveCodeData({ htmlCode, jsCode, cssCode, otherJsCode }) {
      this.compData = {
        compCss: cssCode,
        compJavascript: jsCode + '#code#' + otherJsCode,
        compView: htmlCode
      }
      this.codeObj = eval(`(${jsCode})`)
      this.drawerVisible = false
      if (this.isEditCode) {
      }
      this.isEditCode = false
      this.visibleDraw(false)
    },
    visibleDraw(val) {
      if (!val) {
        this.dialogIndex = 2000
      }
    },
    // 获取控件数据
    getDictList() {
      getHeaderData({ name: '' }).then((res) => {
        this.dictTreeList = res.map((item) => {
          return {
            ...item,
            children: []
          }
        })
        this.activeId = this.dictTreeList[0].id
        this.activeName = this.dictTreeList[0].name
        this.getTableList()
      })
    },
    // 点击树
    async nodeClick(data, bol = false) {
      this.activeId = data.id
      this.dialogTitle = data.name
      this.activeName = data.name
      this.getTableList()
    },
    editChildItem(row) {
      this.childDialogOpt.title = `编辑`
      this.childDialogOpt.showChild = true
      this.listForm = row
      this.dynamicTags = JSON.parse(row.tagList)
      this.contentList = JSON.parse(row.contentList)
    },
    addChildItem(type, parent) {
      this.compData = {
        compCss: '',
        compJavascript: '',
        compView: '',
        compOthers: ''
      }
      this.listForm = {
        author: '莫沫达',
        time: this.date(new Date(), 'yyyy-MM-dd', { d: 0 })
      }
      this.dynamicTags = [{ name: '前端', value: false }]
      this.contentList = [{ name: '文本', value: false }]
      this.childDialogOpt.type = type
      this.childDialogOpt.title = `新建`
      this.childDialogOpt.showChild = true
    },

    // 右边删除子项
    handleDelChild(row) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletlist({ id: row.id }).then((res) => {
            this.getTableList()
          })
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
    }
  }
}
</script>
<style>
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
</style>
<style lang="scss" scope>
.hisClass {
  display: inline-block;
  width: 180px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #999;
  margin-left: 5px;
  margin-top: 5px;
  text-align: center;
}
.activeHisClass {
  border: 1px solid #409eff;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .tree-node-label {
    // width: 180px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.popperClass {
  padding: 0;
}
.module_span {
  span {
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
  span:hover {
    background-color: rgba(79, 139, 255, 1);
    color: white;
  }
}
.query-condition-box {
  margin-top: 15px;
}
.menu_container {
  display: flex;
  height: calc(100% - 50px);
  width: 100%;
  .menu_top {
    height: 40px;
    line-height: 40px;
    border-color: rgb(203, 208, 212);
    background: #f2f2f2;
    padding-left: 5px;
    font-size: 14px;
    i {
      float: right;
      margin-top: 13px;
      margin-right: 10px;
      color: rgba(79, 139, 255, 1);
      font-size: 16px;
      cursor: pointer;
    }
  }
  .menu_left {
    width: 300px;
    .menu_bottom {
      max-height: calc(100% - 112px);
      overflow-y: auto;
      .menu_item {
        display: flex;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        span {
          display: inline-block;
        }
        span:first-child {
          flex: 1;
          color: #60656c;
          padding-left: 5px;
        }
        span:nth-child(2) {
          width: 30px;
          text-align: right;
          padding-right: 5px;
        }
      }
      .menu_item_active {
        background-color: rgba(79, 139, 255, 1);
        span:first-child {
          color: white;
        }
        span:nth-child(2) {
          color: white;
        }
      }
    }
  }
  .menu_right {
    flex: 1;
    max-width: calc(100% - 315px);
    padding-left: 10px;
  }
}
.menu-box {
  margin-bottom: 15px;
}
.menu-name-col {
  display: inline-block;
  line-height: 20px;
  .gd-yunwei-icon {
    margin-right: 5px;
    font-size: 14px;
  }
}
.menu-status-box {
  display: inline-block;
  background-color: #67c23a;
  padding: 0 5px;
  line-height: 30px;
  font-size: 14px;
  color: #fff;
  box-sizing: border-box;
  white-space: nowrap;
  &.danger {
    background-color: #f56c6c;
  }
}
/deep/ .el-card__body {
  height: 100% !important;
}
</style>
