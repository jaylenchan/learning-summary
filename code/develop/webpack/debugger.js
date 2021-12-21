const webpack = require('webpack')

const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)


compiler.run((err, stats) => {
  console.log('err=>', err)
  console.log(
    stats.toJson({
      entries: true,
      chunks: true,
      modules: true,
      _modules: true,
      assets: true
    })
  )
})
