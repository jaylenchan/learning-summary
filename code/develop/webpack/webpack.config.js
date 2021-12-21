const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  mode: 'development',
  devtool: false,
  entry: resolve('src/index.js'),
  output: {
    filename: 'main.js',
    path: resolve('dist')
  }
}
