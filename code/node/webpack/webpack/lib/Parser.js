const babylon = require('babylon')
const { Tapable } = require('tapable')

class Parser extends Tapable {
  parse(source) {
    return babylon.parse(source, {
      sourceType:'module', /** 声明source是一个模块 */
      plugins: ['dynamicImport'] /** 使用di插件，支持import()形式的导入 */
    })
  }
}
module.exports = Parser