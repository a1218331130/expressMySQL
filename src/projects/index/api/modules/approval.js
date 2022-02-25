// approval模块
// API按模块统一规范
/**
 * @module name // 模块的名称,相当于方法名，命名方式建议当前模块名称+接口名称，避免命名重复的问题 必填
 * @method post/get // 请求方式 必填
 * @method desc // 接口简介 必填
 * @method path // 接口地址 必填
 * @method otherReauestParams // 其余参数 如header可以写为 otherReauestParams:{header: ''} f非必填
 */
// import Vue from 'vue'
// console.log(Vue.prototype.gdbpm, 'Vue.prototype.gdbpm')
export default [
  {
    name: 'ApprovalDoExport',
    method: 'post',
    desc: '查询导出',
    path: '/gdbpm/search/doExport',
    otherReauestParams: {
      responseType: 'blob'
    }
  },
  {
    name: 'statisticsWarning',
    method: 'get',
    desc: '综合受理',
    path: '/gdbpm/BpmInstLimitDate/statisticsWarning'
  },

  {
    name: 'saveDate',
    method: 'post',
    desc: '建房审批启动流程回调',
    path: '/gdbpm/SfXmsqxxb/saveDate'
  },
  {
    name: 'yssaveDate',
    method: 'post',
    desc: '填验收表的时候，要关联一下办理记录表，',
    path: '/gdbpm/SfJfsqysb/saveDate'
  },
  {
    name: 'executeBiQuery',
    method: 'post',
    desc: '告知单查询详情',
    path: '/gdbpm/BiSearchdef/executeBiQuery'
  },
  {
    name: 'findByInstId',
    method: 'post',
    desc: '已受理建房审批查询详情',
    path: '/gdbpm/SfXmsqxxb/findByInstId'
  },
  {
    name: 'findYsByInstId',
    method: 'post',
    desc: '已受理验收查询详情',
    path: '/gdbpm/SfJfsqysb/findByInstId'
  },
  {
    name: 'updateBpmInstLimitDateEntity',
    method: 'post',
    desc: '审批登记办理流程回调',
    path: '/gdbpm/SfXmsqxxb/updateBpmInstLimitDateEntity'
  },
  {
    name: 'ysupdateBpmInstLimitDateEntity',
    method: 'post',
    desc: ' 验收调这个审批登记办理流程回调',
    path: '/gdbpm/SfJfsqysb/updateBpmInstLimitDateEntity'
  },

  {
    name: 'addBusiness',
    method: 'post',
    desc: '审批登记办理流程回调',
    path: '/gdbpm/SfXmsqxxb/addBusiness'
  },
  {
    name: 'saveBsConstruction',
    method: 'post',
    desc: '办结回调',
    path: '/gdbpm/BsConstruction/save'
  },
  {
    name: 'ApprovalDoneTaskGroups',
    method: 'post',
    desc: '我的工作我的已办 办结',
    path: '/gdbpm/Searches/findDoneList'
  },
  // {
  //   name: 'ApprovalAttendsList',
  //   method: 'post',
  //   desc: '我的工作我的办结',
  //   path: '/gdbpm/myWork/attendsList'
  // },
  {
    name: 'ApprovalDoingTasks',
    method: 'post',
    desc: '我的工作我的待办',
    path: '/gdbpm/Searches/findUpcomingList'
  },
  {
    name: 'BsXzJfxqfindHandled',
    method: 'post',
    desc: '申请受理--已受理',
    path: '/gdbpm/BsXzJfxq/findHandled'
  },
  {
    name: 'BsXzJfxqfindUpcomingList',
    method: 'post',
    desc: '申请受理--窗口申请 网上受理',
    path: '/gdbpm/SfXmsqxxb/findList'
  },
  {
    name: 'BsXzJfxqfindUpcomingList2',
    method: 'post',
    desc: '申请受理--窗口申请 网上受理',
    path: '/gdbpm/SfXmsqxxb/findByStatus'
  },
  {
    name: 'findPending',
    method: 'post',
    desc: '网上受理 验收审批列表',
    path: '/gdbpm/SfJfsqysb/findPending'
  },
  {
    name: 'SfJfsqysbfindUpcomingList',
    method: 'post',
    desc: '申请受理--验收 -待办',
    path: '/gdbpm/SfJfsqysb/findUpcomingList'
  },
  {
    name: 'SfJfsqysbfindDoneList',
    method: 'post',
    desc: '申请受理--验收 -已办 办结',
    path: '/gdbpm/SfJfsqysb/findDoneList'
  },
  // 预选址 已办
  {
    name: 'yxzfindDoneList',
    method: 'post',
    desc: '',
    path: '/gdbpm/SfXzyssqb/findDoneList'
  },
  // 预选址 待办
  {
    name: 'yxzfindUpcomingList',
    method: 'post',
    desc: '',
    path: '/gdbpm/SfXzyssqb/findUpcomingList'
  },

  {
    name: 'ApprovalListByEntity',
    method: 'post',
    desc: '我的收藏案件',
    path: '/gdbpm/myCollect/listByEntity'
  },
  {
    name: 'ApprovalSynthesisAccept2',
    method: 'post',
    desc: '综合受理列表查询',
    path: '/gdbpm/synthesisAccept/listByEntity'
  },
  {
    name: 'ApprovalSaveAccept',
    method: 'post',
    desc: '综合受理新增',
    path: '/gdbpm/synthesisAcceptForm/save'
  },
  {
    name: 'ApprovalListByViewId',
    method: 'post',
    desc: '综合受理详情表单列表',
    path: '/gdbpm/synthesisAcceptForm/listByViewId'
  },
  {
    name: 'ApprovalUpdate',
    method: 'post',
    desc: '综合受理详情表单修改',
    path: '/gdbpm/synthesisAcceptForm/update'
  },
  {
    name: 'ApprovalGetData',
    method: 'post',
    desc: '综合受理详情查看',
    path: '/gdbpm/WfProBusPreview/getData'
  },
  {
    name: 'AcceptBusinessSearch',
    method: 'post',
    desc: '获取业务详情',
    path: '/gdbpm/SfCsxmsj/getOneByXmdm'
  },
  {
    name: 'ReportList',
    method: 'post',
    desc: '报件列表',
    path: '/gdbpm/ApplyTask/doingTasks'
  },
  {
    name: 'AcceptBusinessSave',
    method: 'post',
    desc: '业务登记',
    path: '/gdbpm/SfCsxmsj/save'
  },
  {
    name: 'toAccept',
    method: 'post',
    desc: '查询所有待受理',
    path: '/gdbpm/Workbench/findPending'
  },
  {
    name: 'findYsByStatus',
    method: 'post',
    desc: '查询验收待受理',
    path: '/gdbpm/SfJfsqysb/findByStatus'
  },
  {
    name: 'toDo',
    method: 'post',
    desc: '查询所有待办',
    path: '/gdbpm/Workbench/listByEntity'
  },
  {
    name: 'businessStatistics',
    method: 'post',
    desc: '业务统计',
    path: '/gdbpm/Workbench/businessStatistics'
  },
  {
    name: 'taskStatistic',
    method: 'post',
    desc: '任务统计',
    path: '/gdbpm/Workbench/taskStatistic'
  },
  // 日程
  {
    name: 'listMyScheduleByDay',
    method: 'post',
    desc: '查询我的日程',
    path: '/gdbpm/BsXzSchedule/listByEntity'
  },
  {
    name: 'saveApSchedule',
    method: 'post',
    desc: '新增日程',
    path: '/gdbpm/BsXzSchedule/save'
  },
  {
    name: 'updateApSchedule',
    method: 'post',
    desc: '修改日程',
    path: '/gdbpm/BsXzSchedule/update'
  },
  {
    name: 'deleteApSchedule',
    method: 'post',
    desc: '删除日程',
    path: '/gdbpm/BsXzSchedule/delete'
  },
  {
    name: 'findByMonth',
    method: 'post',
    desc: '查询月日程',
    path: '/gdbpm/BsXzSchedule/findByMonth'
  },
  // 建房审批关联选址预审（1）
  {
    name: 'relevanceAddress',
    method: 'get',
    desc: '',
    path: '/gdbpm/SfXzyssqb/updateSummary11'
  },
  // 验收关联审批（2）
  {
    name: 'relevanceSp',
    method: 'get',
    desc: '',
    path: '/gdbpm/SfJfsqysb/updateSummary11'
  },
  // 项目树
  {
    name: 'getAttProTreeTab',
    method: 'get',
    desc: '',
    path: '/gdbpm/zjdDir/getFileLessById'
  },
  // 生成文件
  {
    name: 'printToPDF',
    method: 'get',
    desc: '',
    path: '/gdbpm/print/printToPDF'
  },
  //
  {
    name: 'taskFormData',
    method: 'get',
    desc: '',
    path: '/gdbpm/smform/bpmFormView/taskFormData'
  }
]
