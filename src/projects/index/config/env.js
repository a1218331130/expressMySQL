// 配置编译环境和线上环境之间的切换

let baseUrl = 'zjd'
const iconfontVersion = [
  {
    key: 'font_icon',
    name: '基础运维'
  },
  {
    key: 'bzi_icon',
    name: '业务系统'
  },
  {
    key: 'portal_icon',
    name: '门户网站'
  }
]
let iconfontUrl = ``
let iconfontConfig = ``
const codeUrl = `${baseUrl}/code`
const env = process.env
if (env.NODE_ENV === 'development') {
  baseUrl = `` // 开发环境地址
} else if (env.NODE_ENV === 'production') {
  baseUrl = `` // 生产环境地址
  iconfontUrl = '/zjd' + iconfontUrl
  iconfontConfig = '/zjd' + iconfontConfig
} else if (env.NODE_ENV === 'test') {
  baseUrl = `` // 测试环境地址
}
export { baseUrl, iconfontUrl, iconfontConfig, iconfontVersion, codeUrl, env }
