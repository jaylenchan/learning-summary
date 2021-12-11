const webpack = require('./webpack')

/**这里这份配置是webpack.config.js */
const webpackOptions = require('./webpack.config')

const compliler = webpack(webpackOptions)

debugger

compliler.run((err, stats) => {
  console.log('err=>', err)
  console.log(stats.toJson({
    entries: true, // 显示所有入口
    chunks: true, // 显示所有代码块
    modules: true, // 显示所有模块-参与打包的模块的数组
    assets: true // 本次产出的文件
  }))
})