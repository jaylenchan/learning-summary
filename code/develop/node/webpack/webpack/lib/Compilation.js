const { Tapable, SyncHook } = require("tapable");
const path = require("path");
const NormalModuleFactory = require("./NormalModuleFactory");
const neoAsync = require('neo-async')
const normalModuleFactory = new NormalModuleFactory();
const Parser = require('./Parser')
const parser = new Parser

class Compilation extends Tapable {
  constructor(compiler) {
    super()
    this.compiler = compiler;
    this.options = compiler.options;
    this.context = compiler.context;
    this.inputFileSystem = compiler.inputFileSystem;
    this.outputFileSystem = compiler.outputFileSystem;
    this.entries = []; /** 入口数组 - 所有入口放这里 */
    this.modules = []; /** 模块数组 - 所有模块放这里*/
    this._modules = {}; /** key:模块ID， val: 模块对象 */
    this.hooks = {
      /** 当成功构建完成一个模块后，就会触发这个钩子 */
      succeedModule: new SyncHook(["module"]),
    };
  }

  /**
   * 开始编译一个新的入口
   * @param {string} context  根目录
   * @param {string} entry  入口路径
   * @param {string} name  入口名字
   * @param {function} finalCallback 编译完成的回调
   */
  addEntry(context, entry, name, finalCallback) {
    this._addModuleChain(context, entry, name, (err, module) => {
      finalCallback(err, module);
    });
  }

  /**
   *
   * @param {string} context  根目录
   * @param {string} entry  入口路径
   * @param {string} name  入口名字
   * @param {function} callback 编译完成的回调
   */
  _addModuleChain(context, rawRequest, name, callback) {
    this.createModule({
      name, 
      context, 
      rawRequest, 
      resource: path.posix.join(context, rawRequest), /** 这是一个模块的绝对路径 */
      parser
    }, entryModule => this.entries.push(entryModule), callback)
  }
  
  /**
   * 创建并编译一个模块
   * @param {*} data  要编译的模块信息
   * @param {*} addEntry 可选的增加入口的方法，如果这个模块是入口模块的话，如果不是的话啥都不做。
   * @param {*} callback  编译完成后，可以调用callback
   */
  createModule(data, addEntry, callback) {
      /** 通过模块工厂，创建一个模块 */
      const module = normalModuleFactory.create(data);
      addEntry && addEntry(module) /** 如果是入口模块，往入口模块数组中填入一个入口模块 */
      /** 往普通模块数组中也填入一个入口模块 - 因为入口模块也是一个普通模块 */
      this.modules.push(module)
      /** 将模块id和模块对象绑定起来 */
      this._modules[module.moduleId] = module 
      const afterBuild = (err,module) => {
        /** 如果大于0 ，说明有依赖在里头 */
        if(module.dependencies.length > 0) {
          this.processModuleDependencies(module, err => {
            callback(err, module)
          })
        }else {
            callback(err, module)
        }
      }
      this.buildModule(module, afterBuild)
  }


  /**
   * 编译模块
   * @param {object} Module  /** 需要编译的模块 
   * @param {function} afterBuild /** 编译完成之后的回调 
   */
   buildModule(module, afterBuild) {
    /** 模块的编译逻辑其实是放在module自己内部去执行的 */
    module.build(this, (err) => {
      /** 走到这里，说明一个module已经编译完成了 */
      this.hooks.succeedModule.call(module)
      afterBuild(err, module)
    })
  }

  /**
   * 处理编译出来的模块依赖
   * @param {*} module 
   * @param {*} callback 
   */
  processModuleDependencies(module, callback){
    /** 获取当前模块的依赖模块依赖 */
    const dependencies = module.dependencies 
    /** 遍历依赖模块，全部开始编译， 等到所有依赖模块全部编译完成之后（每个模块编译的时间可能不一样），才统一调一次callback */
    neoAsync.forEach(dependencies, (dependency, done) => {
      const {name, context, rawRequest, resource, moduleId} = dependency
      this.createModule({
        name, 
        context, 
        rawRequest, 
        resource, /** 这是一个模块的绝对路径 */
        parser,
        moduleId
      }, null, done)
    },callback)
  }
}

module.exports = Compilation;
