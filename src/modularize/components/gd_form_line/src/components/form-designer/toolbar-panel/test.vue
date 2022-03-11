<script>
import newVue from 'vue'
// import { default as request, getDesignerUrl } from '@/projects/erp/utils/axios'
import Qs from 'qs'
const Vue = newVue
// import { propsCommon, Vue } from '@wfruntime/components/WfExecutor/expand/inlineCode/inlineCommon/form.js'
function setCss(templateCss) {
  // 动态插入css
  const css = templateCss
  const head = document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  head.appendChild(style)
}
export default {
  name: 'Preview',
  // eslint-disable-next-line vue/require-prop-types
  props: ['itemData'],
  render(h) {
    const propsCommon = {
      // 请求方式request
      requestMethod: {
        type: Function,
        default: this.requestToForm
      },
      // Qs
      qsMethod: {
        type: Object,
        default: () => {
          return Qs
        }
      },
      // Qs
      getDesignerUrl: {
        type: Function,
        default: this.getDesignerUrl
      }
    }
    // 设置样式
    const templeteData = this.itemData
    const dataHtml = templeteData.html
    // debugger
    const dataCss = ''
    const dataJs = eval(`(${templeteData.js})`)
    setCss(dataCss)
    // 引入插槽
    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        vnode.context = this._self
        return vnode
      })
    if (dataHtml !== '') {
      const result = Vue.extend({
        props: {
          ...propsCommon,
          itemData: {
            type: Object,
            default: () => {
              return this.itemData
            }
          },
          rowData: {
            type: Object,
            default: () => {
              return this.rowData
            }
          }
        },
        template: dataHtml,
        ...dataJs
      })
      return h(result, {}, slots)
    }
  }
}
</script>
<style>
#inLineTable .el-form-item {
  margin-bottom: 0px;
}
</style>
