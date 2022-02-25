/**
 * 全局配置文件
 */
export default {
  appCode: '0008',
  key: 'guodi', // 配置主键,目前用于存储
  clientId: 'saber', // 客户端id
  clientSecret: 'saber_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tenantId: '000000', // 管理组租户编号
  captchaMode: false, // 是否开启验证码模式
  affiliatedUnit: false, // 所属单位选项模式
  lockPage: '/lock',
  tokenTime: 3000,
  tokenHeader: 'Token-Auth',
  // http的status默认放行列表
  statusWhiteList: [1010], //  1010---密码强制修改后端返回code标志
  // 配置首页不可关闭
  isFirstPage: true,
  fistPage: {
    // label: "首页",
    label: '用户管理',
    // value: "/wel/index",
    value: '/system/user',
    params: {},
    query: {},
    meta: {
      // i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  // 配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'menuName',
      path: 'path',
      icon: 'source',
      children: 'children'
    }
  },
  // 第三方系统授权地址
  authUrl: '',
  // 流程设计器地址
  flowDesignUrl: 'http://localhost:9999',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport'
}
