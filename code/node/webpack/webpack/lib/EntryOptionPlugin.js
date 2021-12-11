const SingleEntryPlugin = require('./SingleEntryPlugin')
/**
 * 
 * @param {string} context 项目根路径的绝对路径
 * @param {string} entry 入口文件路径
 * @param {string} name  main
 * @returns 
 */
const itemToPlugin = (context, entry, name) => {
  /**
   * 单入口插件
   */
  return new SingleEntryPlugin(context, entry, name)
}

class EntryOptionPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap('EntryOptionPlugin',(context, entry) => {
      itemToPlugin(context,entry, 'main').apply(compiler)
    })
  }
}

module.exports = EntryOptionPlugin