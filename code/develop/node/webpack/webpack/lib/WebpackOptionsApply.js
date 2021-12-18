const EntryOptionPlugin = require("./EntryOptionPlugin");
/**
 * 挂载各种各样的内置插件
 */
class WebpackOptionsApply {
  process(options, compiler){
    /** 注册EntryOptionPlugin插件 */
    new EntryOptionPlugin().apply(compiler) 
    /** 
     *  触发entryOption钩子 
     *  参数一个是context,就是根目录的磁盘路径
     *  另一个参数是entry，就是文件打包的入口
     */
    compiler.hooks.entryOption.call(options.context, options.entry) 
  }
}

module.exports = WebpackOptionsApply