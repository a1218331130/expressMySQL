// 遍历所有工具函数并挂载到vue的原型上面
/**
 *
 * @param {vue} vue对象
 */
// import svgNameList from '../icons'
// console.log(svgNameList, 'svgNameListsvgNameList')
const requireAll = requireContext => requireContext.keys().map(requireContext)
const requireComponent = require.context('../util/common', true, /.js$/)
const jsList = requireAll(requireComponent)
export const utilListMethod = function(vue) {
  let arr = {}
  jsList.forEach(el => {
    arr = { ...arr, ...el }
  })
  for (const key in arr) {
    vue.prototype[key] = arr[key]
  }
}
