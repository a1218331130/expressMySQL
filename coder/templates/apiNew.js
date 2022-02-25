const _ = require('lodash')
module.exports = _.template(`
/**
 *  api
 *  @author coder
 */
const fileList = <%=cname%>
const viewArr = []
fileList.forEach(item => {
    viewArr.push(item.label)
})
export default {
    fileList,
    viewArr
}
`)
