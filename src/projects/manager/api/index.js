import request from 'axios'
//单位或机构数量
export const getListOrgByCategory = () =>
  request({
    url: '/sys-system/dept/listOrgByCategory',
    method: 'get'
  })
//用户正常用户或注销 status:0已注销 1正常
export const getListByStatus = data =>
  request({
    url: '/sys-system/listByStatus',
    method: 'get',
    params: {
      ...data
    }
  })
//角色数量接口
export const getListByRole = () =>
  request({
    url: '/sys-system/role/listByRole',
    method: 'get'
  })
//登录人员信息
export const getInfo = () =>
  request({
    url: '/sys-system/info',
    method: 'get'
  })
//系统登录访问量趋势  beginAt:beginAt:开始时间开始时间  endAt:endAt:结束时间结束时间	  timeCycleType:timeCycleType:时间周期类型时间周期类型	(0:(0:日日  	1:1:月月  2:2:年年
export const getCalcLoginNum = data =>
  request({
    url: '/sys-system/loginLog/calcLoginNum',
    method: 'get',
    params: { ...data }
  })
//活跃用户信息
export const getActiveUser = () =>
  request({
    url: '/sys-system/loginLog/activeUser',
    method: 'get'
  })
//7	系统访问总数
export const getTotalVisitNum = () =>
  request({
    url: '/sys-system/loginLog/totalVisitNum',
    method: 'get'
  })
//7	获取用户量新增趋势 beginAt:beginAt:开始时间开始时间  endAt:endAt:结束时间结束时间	  timeCycleType:timeCycleType:时间周期类型时间周期类型	(0:(0:日日  	1:1:月月  2:2:年年	))
export const getCalcNewUserNum = data =>
  request({
    url: '/sys-system/calcNewUserNum',
    method: 'get',
    params: { ...data }
  })
