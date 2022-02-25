export function menuList(top, left, center, right, that) {
  var navbarDocument = document.getElementById(top)
  var leftbarDocument = document.getElementById(left)
  var centerDocument = document.getElementById(center)
  var rightMenuDocument = document.getElementById(right)
  var centerMenuWidth = navbarDocument?.offsetWidth - leftbarDocument?.offsetWidth - rightMenuDocument?.offsetWidth
  if (centerDocument) {
    centerDocument.style.width = centerMenuWidth + 'px'
  }
  // var l = parseInt(rightMenuWidth / 100)
  // that.$refs?.switchApp?.setAppList(l)
}
