var path = require('path')
var webpack = require('webpack')

module.exports = {
  // dll 包含模块的名字
  entry: {
    other: ['vue-loader/lib/runtime/componentNormalizer.js', 'js-cookie', 'js-md5'],
    vendor: ['vue-router', 'vuex', 'vue/dist/vue.common.js', 'vue/dist/vue.js', 'vue', 'axios', 'element-ui']
  },
  output: {
    path: path.join(__dirname, '../static/common/vendor'),
    filename: '[name].dll.js',
    // 给DllPlugin中的name使用，需要和 webpack.DllPlugin 中的 name 字段保持一致
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../static/common/vendor', '[name]-manifest.json'),
      // 和上面的 library 保持一致
      name: '[name]_library',
      context: __dirname
    })
  ]
}
