const {
  Tapable,
  AsyncSeriesHook,
  AsyncParallelHook,
  SyncBailHook,
  SyncHook,
} = require("tapable");
const NormalModuleFactory = require("./NormalModuleFactory");
const Compilation = require("./Compilation");
const Stats  = require('./Stats')
class Compiler extends Tapable {
  constructor(context) {
    super();
    this.context = context;
    this.hooks = {
      /**
       * context: 项目的根目录的绝对路径
       * entry: webpack打包的入口
       */
      entryOption: new SyncBailHook(["context", "entry"]),
      /** 运行前 */
      beforeRun: new AsyncSeriesHook(["compiler"]),
      /** 运行 */
      run: new AsyncSeriesHook(["compiler"]),
      /** 编译前 */
      beforeCompile: new AsyncSeriesHook(["params"]),
      /** 编译 */
      compile: new SyncHook(["params"]),
      /** make构建 */
      make: new AsyncParallelHook(["compilation"]),
      /** 开始创建一次新的编译，创建一个新的compilation */
      thisCompilation: new SyncHook(["compilation", "params"]),
      /** 创建好了一个compilation */
      compilation: new SyncHook(["compilation", "params"]),
      /** 编译完成了 */
      afterCompile: new AsyncSeriesHook(["compilation"]),
    };
  }
  run(callback) {
    /** 编译完成后，最终的回调函数 */
    const finalCallback = (err, stats) => {
      callback(err, stats);
    };
    /** 编译完成 */
    const onCompiled = (err, compilation) => {
      finalCallback(err, new Stats(compilation));
    };
    console.log('before run')
    this.hooks.beforeRun.callAsync(this, err => {
      console.log('start run')
      this.hooks.run.callAsync(this, err => {
        this.compile(onCompiled)
      })
    })
  }

  compile(onCompiled) {
    const params = this.newCompilationParams();
    console.log('beforeCompile')
    this.hooks.beforeCompile.callAsync(params, err => {
      console.log('Compile')
      this.hooks.compile.call(params)
      console.log('start generate compilation')
      const compilation  = this.newCompilation(params)
      console.log('finish generate compilation')
      console.log('start make')
      this.hooks.make.callAsync(compilation, err => {
        console.log('make finished')
        onCompiled(null, compilation)
      })
    })
  }
  
  newCompilationParams() {
    const params = {
      /** 在创建compilation之前创建一个普通的模块化工厂 */
      normalModuleFactory: new NormalModuleFactory(),
    }
    return params
  }
  
  newCompilation(params) {
		const compilation = this.createCompilation()
    this.hooks.thisCompilation.call(compilation, params)
    this.hooks.compilation.call(compilation, params)
    return compilation
	}

  createCompilation() {
    const compilation = new Compilation(this)
    return compilation
  }
}

module.exports = Compiler;
