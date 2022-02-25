// 遍历所有iconfont并动态添加
/**
 *
 * @param {fontArr} 需要加载的项目iconfont，是个数组，默认加载全部，如需要加载某几个，如['hianan']
 */
const requireAll = requireContext => requireContext.keys().map(requireContext)
const requireComponent = require.context('.', true, /.json$/)
const jsonList = requireAll(requireComponent)
export const setIconFontFunc = function(fontArr = []) {
  jsonList.forEach(res => {
    if (fontArr.length === 0) {
      require(`./${res.font_family}/iconfont.css`)
      require(`./${res.font_family}/iconfont`)
    } else {
      const name = res.font_family.replace('iconfont-', '')
      if (fontArr.includes(name)) {
        require(`./${res.font_family}/iconfont.css`)
        require(`./${res.font_family}/iconfont`)
      }
    }
  })
}
