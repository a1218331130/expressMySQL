import { default as request, getDesignerUrl } from '@index/utils/request'

const Qs = require('qs')

// 获取系统名称
export function getSysTitle(data) {
  return request({
    url: getDesignerUrl() + '/Login/getSysTitle ',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 受理查看
export function getData(data) {
  return request({
    url: getDesignerUrl() + '/WfProBusPreview/getData',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 不受理
export function notAccept(data) {
  return request({
    url: getDesignerUrl() + '/WfProBusPreview/notAccept',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 获取多审合一中间库json数据
export function getJsonForApproval(data) {
  return request({
    url: getDesignerUrl() + '/OtherExpand/getJsonForApproval',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 议题、会议管理待办列表, sumary11必填，1是会议议题 2是会议, 3是公文, 4是多审合一
export function doingTasks(data) {
  return request({
    url: getDesignerUrl() + '/ApplyTask/doingTasks',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// ===========分组=========== 议题、会议管理待办列表, sumary11必填，1是会议议题 2是会议, 3是公文, 4是多审合一
export function doingTasksGroup(data) {
  return request({
    url: getDesignerUrl() + '/ApplyTask/doneTaskGroups ',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 新增会议室
export function addMeetingRoom(data) {
  return request({
    url: getDesignerUrl() + '/MeetingRoom/saveMeetingRoom',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 修改会议室
export function updateMeetingRoom(data) {
  return request({
    url: getDesignerUrl() + '/MeetingRoom/update',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 获取会议室列表
export function listRoom(data) {
  return request({
    url: getDesignerUrl() + '/MeetingRoom/listRoom',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 获取会议室列表
export function listMeetingDate(data) {
  return request({
    url: getDesignerUrl() + '/MeetingRoom/listMeetingDate',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 删除会议室
export function deleteRoom(data) {
  return request({
    url: getDesignerUrl() + '/MeetingRoom/delete',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 会议日程列表
export function MeetingRoomListByEntity(data) {
  return request({
    url: getDesignerUrl() + '/MeetingRoom/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 会议报表
export function getMeetingCount(data) {
  return request({
    url: getDesignerUrl() + '/MeetingReport/getMeetingCount',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function getMeetingChartData(data) {
  return request({
    url: getDesignerUrl() + '/MeetingReport/getMeetingChartData',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function getMeetingNum(data) {
  return request({
    url: getDesignerUrl() + '/MeetingReport/getMeetingNum',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 会议室详情
export function roomDetail(data) {
  return request({
    url: getDesignerUrl() + '/MeetingRoom/findById',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 会议列表
export function listRoomMeeting(data) {
  return request({
    url: getDesignerUrl() + '/MeetingRoom/listRoomMeeting',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 议题、会议管理已办, sumary11必填，1是会议议题 2是会议, 3是公文, 4是多审合一
export function doneTasks(data) {
  return request({
    url: getDesignerUrl() + '/ApplyTask/doneTasks',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// ===========分组=========== 议题、会议管理待办列表, sumary11必填，1是会议议题 2是会议, 3是公文, 4是多审合一
export function doneTasksGroup(data) {
  return request({
    url: getDesignerUrl() + '/ApplyTask/doneTaskGroups ',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 议题、会议管理办结列表, sumary11必填，1是会议议题 2是会议, 3是公文, 4是多审合一
export function attendsList(data) {
  return request({
    url: getDesignerUrl() + '/ApplyInst/attendsList?status=SUCCESS_END',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 议题、会议管理查询列表, sumary11必填，1是会议议题 2是会议, 3是公文, 4是多审合一
export function TI_listByEntity(data) {
  return request({
    url: getDesignerUrl() + '/TaskInst/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取节点按钮
export function getNodeButtons(data) {
  return request({
    url: getDesignerUrl() + '/bpm/core/bpmNodeSet/getNodeButtons',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 我的会议
export function myMeetingList(data) {
  return request({
    url: getDesignerUrl() + '/ApplyTask/myMeetingList',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 历史会议
export function historyMeetingList(data) {
  return request({
    url: getDesignerUrl() + '/ApplyInst/historyMeetingList',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 会议添加议题选择列表
export function addMeetingSubjects(data) {
  return request({
    url: getDesignerUrl() + '/ApplyTask/addMeetingSubjects',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 会议添加会议议题
export function addHyyt(data) {
  return request({
    url: getDesignerUrl() + '/ApplyTask/addHyyt',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取会议详情
export function getDetailByActInstId(data) {
  return request({
    url: getDesignerUrl() + '/ApplyInst/getDetailByActInstId',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 会议关联的会议议题列表
export function getMeetingSubjects(data) {
  return request({
    url: getDesignerUrl() + '/ApplyInst/getMeetingSubjects',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 会议删除会议议题
export function deletHyyt(data) {
  return request({
    url: getDesignerUrl() + '/ApplyTask/deletHyyt',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 收藏列表, type=0（必传）, sumary11必填，3是公文, 4是多审合一
export function CF_listByEntity(data) {
  return request({
    url: getDesignerUrl() + '/Collect/follow/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 公文收藏/取消收藏
export function operate(data) {
  return request({
    url: getDesignerUrl() + '/Collect/follow/operate',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 获取通讯录数据
export function listtelephones(data) {
  return request({
    url: getDesignerUrl() + '/BsXzPhonebook/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 获取通讯录数据
export function listPhoneGroup() {
  return request({
    url: getDesignerUrl() + '/BsXzPhonebook/loadPriPhonebookTree',
    method: 'post'
  })
}
// 新增保存
export function phonebookSave(data) {
  return request({
    url: getDesignerUrl() + '/BsXzPhonebook/save',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 更新
export function phonebookUpdate(data) {
  return request({
    url: getDesignerUrl() + '/BsXzPhonebook/update',
    method: 'post',
    data: Qs.stringify(data)
  })
}
export function phonebookDelete(data) {
  return request({
    url: getDesignerUrl() + '/BsXzPhonebook/delete',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 获取短信数据
export function listShortMsg() {
  return request({
    url: getDesignerUrl() + '/BsShortMsg/listByEntity',
    method: 'post'
  })
}
// 根据实体属性分页查询
export function APListByEntity(data) {
  return request({
    url: getDesignerUrl() + '/ApArchives/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 新增
export function ApSave(data) {
  return request({
    url: getDesignerUrl() + '/ApArchives/save',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 借阅
export function ApUpdate(data) {
  return request({
    url: getDesignerUrl() + '/ApArchives/update',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 归档
export function logSave(data) {
  return request({
    url: getDesignerUrl() + '/ApArchivesLog/save',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 借阅历史
export function logListByEntity(data) {
  return request({
    url: getDesignerUrl() + '/ApArchivesLog/listByEntity',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 脚本测试
export function scriptTest(data) {
  return request({
    url: getDesignerUrl() + '/script/test',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 脚本测试
export function download(data) {
  return request({
    url: getDesignerUrl() + '/BsXzPhonebook/download',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 综合受理新增
export function saveAccept(data) {
  return request({
    url: '/synthesisAcceptForm/save',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 综合受理详情表单列表
export function deiilstwy(data) {
  return request({
    url: '/synthesisAcceptForm/listByViewId',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 综合受理详情表单修改
export function update(data) {
  return request({
    url: '/synthesisAcceptForm/update',
    method: 'post',
    data: Qs.stringify(data)
  })
}
// 综合受理详情表单修改
export function getFormData(data) {
  return request({
    url: '/synthesisAcceptForm/getData?id=' + data,
    method: 'get'
  })
}
// 消息列表
export function getMessageList(data) {
  return request({
    url: getDesignerUrl() + '/TipMsg/msgListData',
    method: 'post',
    data: Qs.stringify(data)
  })
}

// 修改消息状态
export function turnMsgStatus(data) {
  return request({
    url: getDesignerUrl() + '/TipMsg/msgReaded',
    method: 'post',
    data: Qs.stringify(data)
  })
}
