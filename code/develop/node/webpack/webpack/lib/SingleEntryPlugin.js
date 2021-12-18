/**
 * 单入口插件
 */
class SingleEntryPlugin {
  constructor(context, entry, name){
    this.context = context  /** 入口上下文的绝对路径 */
    this.entry = entry /** 入口模块路径 .src/index.js */
    this.name = name /** 入口模块的名字 main */
  }
  apply(compiler) {
    compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
      const { context, entry, name } = this;
      /**
       * 从这个入口开始编译，编译入口文件及其依赖
       */
      console.log('make')
      compilation.addEntry(context,entry, name, callback)
    })
  }
}

module.exports = SingleEntryPlugin