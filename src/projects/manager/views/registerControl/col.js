// 表头数据
export const tableColumn = [
  // 序号 index  复选框 selection
  { type: 'selection' },
  { prop: 'name', label: '名称' },
  { prop: 'key', label: '标识键 / 路由名称', width: '200px' },
  { prop: 'type', label: '类型', width: '150px' },
  { prop: 'version', label: '版本', width: '120px', align: 'center' },
  { prop: 'status', label: '状态', width: '120px', align: 'center' },
  { prop: 'createTime', label: '创建时间', width: '180px', align: 'center' },
  { prop: 'updateTime', label: '修改时间', width: '180px', align: 'center' },
  {
    label: '操作',
    prop: 'caozuo',
    width: '120px',
    align: 'center'
  }
]
