import store from '@modularize/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    if (value.length > 0) {
      const menuArr = store.getters && store.getters.menu
      const permissionRoles = value
      if (!menuArr.includes(permissionRoles)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      console.error(`need permission`)
      return false
    }
  }
}
