import store from '../store'
// 将tree格式行政区划数据格式化成键值对格式和数组格式返回
// map引用类型
export function makeMap(objectArray, property = 'id', propertyValue = 'name', map) {
  return objectArray.reduce(function(acc, obj) {
    let key = obj[property]
    let value = obj[propertyValue]
    map.set(key, value)
    return acc.concat([obj], Array.isArray(obj.children) ? makeMap(obj.children, property, propertyValue, map) : [])
  }, [])
}
// 将编码解析返回行政区名称
export function parse(codeString, regionMap = store.getters.regionMap) {
  let region = ''
  if (codeString) {
    const arr = codeString.split(',').filter(i => !!i)
    arr.forEach((id, index) => {
      const temp = regionMap.get(id)
      if (index === arr.length - 1) {
        region += temp ? `${temp}` : ''
      } else {
        region += temp ? `${temp},` : ''
      }
    })
  }
  return region || '--'
}
