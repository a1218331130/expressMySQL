<template>
  <div>
    <div class="searchPage">
      <div class="demo-form-inline">
        <el-form :inline="true">
          <el-form-item label="导航名称：">
            <el-input v-model="queryParams.name" placeholder="导航名称" size="small" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="getHeaderDataList">查询</el-button>
            <el-button type="primary" size="small" @click.stop="onEdit({}, '新增导航')">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-bottom: 10px" />
      <div class="demo_tables">
        <gd-table ref="gdtable" :columns="tableColumn" :bottom-offset="80" :data="headerList" :border="true">
          <template slot="caozuo" slot-scope="scope">
            <el-button type="text" size="small" @click.stop="onEdit(scope.row, '编辑导航')">编辑 </el-button>
            <el-divider direction="vertical" />
            <el-button type="text" size="small" @click.stop="onDel(scope.row)">删除 </el-button>
          </template>
        </gd-table>
      </div>
    </div>
    <gd-dialog :title="title" :z-index="1200" :closed.sync="showDialog" :append-to-body="true" :maximized.sync="maximized" maximizable width="800px" draggable>
      <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="120px" style="padding: 10px">
        <el-row :gutter="0">
          <el-col :span="12">
            <el-form-item label="导航名称:" prop="name">
              <el-input v-model="formData.name" clearable placeholder="请输入导航名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="导航英文名称:" prop="descp">
              <el-input v-model="formData.descp" clearable placeholder="请输入导航英文名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="导航背景:" prop="bg">
              <el-input v-model="formData.bg" clearable placeholder="请输入导航背景" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="导航排序:" prop="sort">
              <el-input-number v-model="formData.sort" :min="1" controls-position="right" size="small" placeholder="请输入排序" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="导航链接:" prop="url">
              <el-input v-model="formData.url" clearable placeholder="请输入导航链接" />
            </el-form-item>
          </el-col>
        </el-row>

        <div style="padding-bottom: 15px; padding-right: 10px; text-align: end">
          <el-button type="primary" size="small" icon="el-icon-circle-check" @click="handleSubmit">保存</el-button>
          <el-button size="small" icon="el-icon-circle-close" @click="showDialog = false">取消</el-button>
        </div>
      </el-form>
    </gd-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getHeaderData, addHeaderData, updataHeaderData, deleteHeaderData } from '@index/api/header'
export default {
  data() {
    return {
      showDialog: false,
      maximized: false,
      title: '新增导航',
      treeData: [],
      tableColumn: [
        { prop: 'name', label: '导航名称' },
        { prop: 'descp', label: '导航英文名称' },
        { prop: 'bg', label: '导航背景' },
        { prop: 'url', label: '导航链接' },
        { prop: 'config', label: '导航配置' },
        { prop: 'caozuo', label: '操作', minWidth: '120px', align: 'center' }
      ],
      rules: {
        name: [{ required: true, message: '请输入导航名称', trigger: 'blur' }],
        descp: [{ required: true, message: '请输入导航英文名称', trigger: 'blur' }],
        bg: [{ required: true, message: '请输入导航背景', trigger: 'blur' }],
        url: [{ required: true, message: '请输入导航链接', trigger: 'blur' }],
        config: [{ required: true, message: '请输入导航配置', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      formData: {
        name: '',
        descp: '',
        bg: '',
        url: '',
        config: '',
        sort: 1
      },
      queryParams: { name: '' },
      headerList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'permission'])
  },
  async created() {
    this.getHeaderDataList()
  },
  methods: {
    handleSubmit() {
      if (this.title === '新增导航') {
        addHeaderData(this.formData).then((res) => {
          this.$message.success('新增成功')
          this.getHeaderDataList()
        })
      } else {
        updataHeaderData(this.formData).then((res) => {
          this.$message.success('修改成功')
          this.getHeaderDataList()
        })
      }
      this.showDialog = false
    },
    onEdit(row, title) {
      if (title === '新增导航') {
        this.formData = {
          name: '',
          descp: '',
          bg: '',
          url: '',
          config: '',
          sort: 1
        }
      } else {
        this.formData = row
      }
      this.showDialog = true
      this.title = title
    },
    onDel(row) {
      deleteHeaderData(row).then((res) => {
        this.$message.success('删除成功')
        this.getHeaderDataList()
      })
    },
    getHeaderDataList() {
      getHeaderData({ name: this.queryParams.name }).then((res) => {
        this.headerList = res || []
      })
    }
  }
}
</script>

<style></style>
