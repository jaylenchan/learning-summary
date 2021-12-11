const Compiler = require("./Compiler");
const NodeEnvironmentPlugin = require("./node/NodeEnvironmentPlugin");
const WebpackOptionsApply = require("./WebpackOptionsApply");

const webpack = (options) => {
  /** 生成Compiler实例 */
  const compiler = new Compiler(options.context);
  /** 往Compiler实例挂载options配置 - webpack.config.js */
  compiler.options = options;
  /** 配置compiler可以读写文件的功能 - 赋值fs读写文件系统 */
  new NodeEnvironmentPlugin().apply(compiler);
  /** 注册配置文件中自定义的插件 */
  if (options.plugins && Array.isArray(plugins)) {
    options.plugins.forEach((plugin) => plugin.apply(compiler));
  }
  /** 初始化配置，并注册系统内置的插件 */
  new WebpackOptionsApply().process(options, compiler);
  return compiler;
};

exports = module.exports = webpack;
