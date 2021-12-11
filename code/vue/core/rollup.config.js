import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/index.js', // 入口
  output: {
    file: 'dist/umd/vue.js', // 出口
    name: 'Vue', // 打包后全局变量的名字
    format: 'umd', //统一模块规范
    sourcemap: true // 开启源代码调试
  },
  plugins: [
    babel({
      exclude:"node_modules/**"
    }),
    process.env.ENV ==='development'? serve({
      open: true,
      openPage:'/public/index.html', //默认打开html的路径 
      port: 3000,
      contentBase: '' // 配置静态文件服务
    }): null
  ]
}