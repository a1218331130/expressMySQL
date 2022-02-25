import axios from 'axios'
import { iconfontVersion, iconfontConfig } from './env.js'

function loadLocalIconfont(key) {
  return new Promise((resolve, reject) => {
    axios.get(iconfontConfig.replace('$key', key)).then(data => {
      resolve({
        label: data.data.name || key,
        font: data.data.font_family,
        list: data.data.glyphs.map(el => {
          return (data.data.css_prefix_text || '') + el.font_class
        })
      })
    }).catch(err => {
      reject(err)
    })
  })
}

export default iconfontVersion.map(el => {
  return {
    id: el.key,
    name: el.name,
    getter: () => {
      return loadLocalIconfont(el.key)
    }
  }
})
