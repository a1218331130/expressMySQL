export function setHeight(div, val = 0) {
  try {
    return document.documentElement.clientHeight - div?.getBoundingClientRect()?.top - val
  } catch {
    return 700
  }
}
