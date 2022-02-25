import store from '@index/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value.length > 0) {
    const menuArr = store.getters && store.getters.menu
    const permissionRoles = value
    return menuArr.includes(permissionRoles)
  } else {
    console.error(`need permission`)
    return false
  }
}
