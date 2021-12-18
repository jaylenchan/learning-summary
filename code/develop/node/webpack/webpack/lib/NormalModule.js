const path = require('path')
const types = require('babel-types')
const generate = require('babel-generator').default
const traverse = require('babel-traverse').default

class NormalModule {
  constructor({name, context, rawRequest, resource, parser, moduleId }) {
    this.name = name /** 模块名字 main */
    this.context = context /** 根目录 */
    this.rawRequest = rawRequest /** 入口的相对路径 */
    this.resource = resource /** 模块的绝对路径 - /Users/chen/Documents/study/project/webpack/src/index.js */
    this.parser = parser /** ast解析器 - 把源代码转化成ast树 */
    this._source; /** 此模块对应的源代码 */
    this._ast; /** 此模块对应的ast树🌲 */
    this.dependencies = [], /** 当前模块依赖的模块信息 */
    this.moduleId = moduleId /** 当前模块的id */
  }
  /**
   * 编译模块
   * @param {object} compilation 
   * @param {function} callback 
   */
   /**
     * 模块编译思路
     * 1.先从硬盘将模块读取出来，就是一个文本
     * 2.可能读取出来的不是一个js模块，那就需要loader的转换（css，font等），然后获得js模块，如果不是就报错
     * 3.把这个js模块的代码（一堆字符串）， 经过parser处理后，生成ast
     * 4.分析ast里头的依赖：require，import节点，分析依赖模块
     * 5.递归的编译依赖的模块
     * 6.不停地依次递归执行上5步，直到所有模块都编译完成为止
     */

  build(compilation, callback) {
    this.doBuild(compilation, (err) => {
      /** 得到语法树 */
     this._ast =  this.parser.parse(this._source)
     /** 遍历语法树，找到里面的依赖进行收集 */
     traverse(this._ast, {
       /** 当遍历到CallExpression节点的时候，就会进入回调 */
       CallExpression:(nodePath) => {
         const node = nodePath.node /** 获取节点 */
         if(node.callee.name === 'require') { /** 如果方法名是require方法的话 */
          node.callee.name = '__webpack_require__' /** 修改方法名： require -> __webpack_require__ */
            const moduleName = node.arguments[0].value
            // console.log('moduleName=>', moduleName) // ./title.js
            /** 如果不写.js后缀，就添加后缀 */
            const extName = moduleName.split(path.posix.sep).pop().indexOf('.') === -1 ? '.js' : '';
            /** 获取依赖模块(./src/title.js)的绝对路径: /Users/chen/Documents/study/project/webpack/src/title.js*/
            const depResource = path.join(path.posix.dirname(this.resource), moduleName+extName)
            // console.log('depResource=>', depResource)
            /** 获取依赖的模块ID：./加上（从根目录出发到依赖模块的绝对路径）的相对路径 -> ./+src/title.js = ./src/title.js*/
            const depModuleId = './' + path.posix.relative(this.context, depResource)
            // console.log('depModuleId=>', depModuleId) // ./src/title.js
            /** 把require模块路径- 即上边获取的moduleName:./title.js 变成了./src/title.js  */
            node.arguments = [types.stringLiteral(depModuleId)]
            this.dependencies.push({
              name: this.name, /** main */
              context: this.context, /** 根目录 */
              rawRequest: this.rawRequest,/** 模块的相对路径 - 原始路径 */
              moduleId: depModuleId, /** 模块ID：./加上（从根目录出发到依赖模块的绝对路径）的相对路径- ./+src/title.js */
              resource: depResource /** 依赖模块的绝对路径 */
            })
         }
       }
     })
     /** 将转换后的语法树重新生成源代码 */
     const { code } = generate(this._ast)
     this._source = code
     callback()
    })
  }
  
  /**
   * 1. 读取模块源代码
   * @param {object} compilation 
   * @param {function} callback 
   */
  doBuild(compilation, callback) {
    /** 将最原始的代码读取出来，存放到当前模块的_source中 */
    this.getSource(compilation, (err, source) => {
      /** 得到源代码 */
      /** 如果写loader，loader的处理应该是放在这个地方 */
      this._source = source
      callback()
    })
  }

  /**
   * 读取真正的源代码
   */
  getSource(compilation, callback) {
    compilation.inputFileSystem.readFile(this.resource, 'utf8', callback)
  }
}

module.exports = NormalModule

/**
 * 模块ID问题
 * 无论是相对本地的模块，还是第三方模块
 * 最后它的moduleId全都是一个相对于项目根目录的相对路径 - 一定是从.开始的
 * 例子： ./src/index.js ./node_modules/util/util.js
 * 而且必须是/，不能是\这种写法
 */