/*
 * @Author: tianlun
 * @Date: 2021-09-07 11:02:52
 * @LastEditTime: 2021-09-15 15:49:09
 */
const getters = {
  // tag: state => state.tags.tag,
  language: state => state.common.language,
  website: state => state.common.website,
  userInfo: state => state.user.userInfo,
  isShade: state => state.common.isShade,
  isCollapse: state => state.common.isCollapse,
  keyCollapse: (state, getters) => (getters.screen > 1 ? getters.isCollapse : false),
  screen: state => state.common.screen,
  isLock: state => state.common.isLock,
  isFullScren: state => state.common.isFullScren,
  isMenu: state => state.common.isMenu,
  lockPasswd: state => state.common.lockPasswd,
  // tagList: state => state.tags.tagList,
  // tagWel: state => state.tags.tagWel,
  token: state => state.user.token,
  roles: state => state.user.roles,
  permission: state => state.user.permission,
  menu: state => state.user.menu,
  menuId: state => state.user.menuId,
  logsList: state => state.logs.logsList,
  logsLen: state => state.logs.logsList.length || 0,
  logsFlag: (state, getters) => getters.logsLen === 0,
  flowRoutes: state => state.dict.flowRoutes,
  platformTitle: state => state.user.platformTitle,
  systemInfo: state => state.system.systemInfo,
  permission_routes: state => state.permission.routes,
  sidebar: state => state.app.sidebar,
  selectApp: state => state.app.selectApp,
  dictionary: state => state.user.dictionary,
  regionMap: state => state.region.regionMap,
  regoinTree: state => state.region.regoinTree,
  regionList: state => state.region.regionList,
  subSystemMemu: state => state.user.subSystemMemu,
  schemeConfig: state => state.workFlowConfig.schemeConfig,
  //平台信息缓存
  platformObj: state => state.user.platformObj,
  //切换系统页菜单权限
  platformMenu: state => state.user.platformMenu
}
export default getters
