import commonApi from './api/common-api'
async function getDynamicRouter(type = 'ns', Layout, code = 'upms') {
  var allList = []

  allList = [...(await commonApi(code))]
  localStorage.setItem('router', JSON.stringify(allList))
  // const hasCode = localList.some(res => res.code === code)
  if (localStorage.getItem('routerCode')) {
    let data = JSON.parse(localStorage.getItem('routerCode'))
    const res = new Map()
    data = [...data, ...allList]
    // 去重
    data = data.filter(a => !res.has(a['path']) && res.set(a['path'], 1))
    localStorage.setItem('routerCode', JSON.stringify(data))
  } else {
    localStorage.setItem('routerCode', JSON.stringify(allList))
  }
  const allListNav = allList.filter(item => {
    return item.url
  })
  const arrList = [
    {
      path: '/',
      component: Layout,
      redirect: '/',
      children: allListNav
    }
  ]
  arrList.push({
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      title: '404',
      resourceId: '404'
    }
  })
  return arrList
}
export default getDynamicRouter
