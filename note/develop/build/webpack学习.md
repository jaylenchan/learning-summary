## 开发模式

### 面向过程开发

```markdown
# 缺点
开发代码很定义和调用参杂在了一起，不利于开发人员维护
# 需求
将代码的实现和调用分离开来
# 解决
面向对象开发
```

### 面向对象开发

```markdown
# 缺点
1. 页面发送请求变多了，页面加载速度就会变慢
2. 主文件中调用各API并不知道它们都是从哪个文件来的，降低了开发寻找文件的效率
3. 很难查找错误，改动引入js的顺序报错也不知道具体哪个文件出错
# 需求
1.依旧引入一个index.js文件，不增加多余的文件造成过多的请求
2.当index.js中需要用到什么API，自己在文件中引入相应API去调用
3.文件之间的依赖关系要变得明确，既能够直到调用与定义文件之间的对应关系，同时也要保证不会因为引入API顺序不同而导致调用API出错
# 解决
模块化开发
```

### 模块化开发

```markdown
# 缺点
浏览器默认没法执行import这样的代码，控制台报错
# 需求
想要方便人员开发按照想要书写的格式书写的同时又能使浏览器跑动我们书写的import这样子的代码
# 解决
Webpack
```

## Webpack

### 环境搭配

```markdown
# Webpack使用前提：安装Node（必须，最好是最新的，对webapck更友好）和NPM
# 建立一个webpack文件夹
# 进入文件夹并在控制台输入npm init创建Node包文件（npm是node包管理工具，它可以帮我们以node规范的形式创建一个项目，要想使用webpack管理项目就要符合node规范，使用npm init项目就可以符合node规范）
# 安装webpack
全局安装：npm install webpack webpack-cli -g（全部项目的webpack版本固定，不推荐）
局部安装：npm install webpack webpack-cli -D（各项目拥有自己的webpack版本，推荐）
局部指定版本：npm install webpack@版本号 -D
# 局部安装查看webpack版本:npx webpack -v   
```

### 项目结构

```markdown
# 使用webpack.config.js配置文件配置webpack
# 使用src文件夹装入项目源代码（因为这些代码实际在浏览器运行不起来，需要webpack打包转换成浏览器可执行的代码）
# 修改package.json的scipt选项，使得能通过npm run bundle代替npx webpack 去打包文件
# 打包出来的dist就是最后执行在浏览器中执行的代码所在的文件夹
# webpack-cli让我们能够在命令行使用npx webpack命令或者webpack命令
```

### 打包输出内容

```powershell
$ npx webpack # 启用webpack打包
Hash: 0e289339706495073943  # 本次打包生成的唯一哈希值
Version: webpack 4.43.0 # 打包所使用的webpack版本
Time: 749ms # 打包耗时
Built at: 2020-05-17 20:47:53 # 打包的时间
 Asset        Size         Chunks       Chunk Names
bundle.js   1.24 KiB     0 [emitted]        main 
# bundle.js就是打包出来的文件
# main就是entry中写的打包入口名字
Entrypoint main = bundle.js # 打包的入口点是main 出口是bundle.js
[0] ./src/index.js + 3 modules 1.37 KiB {0} [built] # 打包index.js，里头用到了3个module模块 
    | ./src/index.js 338 bytes [built] # 打包index.js
    | ./src/header.js 351 bytes [built] # index.js里头用到了模块header
    | ./src/content.js 358 bytes [built]# index.js里头用到了模块content
    | ./src/footer.js 351 bytes [built] # index.js里头用到了模块footer

WARNING in configuration # 警告是因为webpack配置中没有配置mode
# 使用mode="development"打包出来的文件代码不压缩
# 使用mode="production"打包出来的文件代码压缩
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

```

### Loader

```markdown
# 为什么需要Loader？
因为webpack默认只能执行JS文件的打包，对于其他类型的文件Webpack是没法执行的，所以需要Loader来帮忙执行其他类型文件的打包。
```

```markdown
# Loader的执行过程
1.输入npm run bundle的时候，首先底层是跑到package.json中的script中找bundle对应的webpack命令
2.webpack开始进入主入口文件index.js中进行打包，碰到js文件直接打包
3.当在index.js中遇到非js模块时，webpack就没法执行了
4.webpack会去配置文件里找相应的模块module规则rules，在rules中寻找对应类型文件，最后找到该文件使用的loader，从而让loader去帮忙打包该类型的文件。
```

#### 打包图片的loader

##### file-loader

```markdown
# 工作原理
将引入的文件模块移动到dist文件夹下，并把dist文件夹下的该文件的名字返回给src没打包前引用该文件的地方，所以在使用这个文件的地方就可以获取到该文件在dist文件夹下的名字。
```

```markdown
# 适合场景
file-loader打包后会将图片单独打包出来-适合大图片的打包
```

```powershell
# 输出内容
$ npm run bundle
> webpack_demo01@1.0.0 bundle G:\个人练习\【07】工程化\Webpack\webpack_demo01
> webpack
Hash: c6fd6fd1d090e9591a84
Version: webpack 4.43.0
Time: 659ms
Built at: 2020-05-17 21:39:32
              Asset                        Size            Chunks             Chunk Names
# 👇图片被单独打包出来了，跟bundle.js分离                
24435edd6a4e5106495ec3cbe489d288.jpg      131 KiB          [emitted]
      
            bundle.js                     7.69 KiB    main  [emitted]        main
Entrypoint main = bundle.js
[./src/avatar.jpg] 80 bytes {main} [built]
[./src/content.js] 358 bytes {main} [built]
[./src/footer.js] 351 bytes {main} [built]
[./src/header.js] 351 bytes {main} [built]
[./src/index.js] 478 bytes {main} [built]

```

##### url-loader

```markdown
# 工作原理
打包后直接将图片转成base64字符串的格式放入bundle.js中
```

```markdown
# 适用场景
好处是减少了http请求，坏处是打包出来的bundle.js文件会特别大（可以进行limit大小配置），加载页面很可能很长时间都显示不出来东西-适合小图片打包
```

```powershell
# 基本配置
use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',  # 打包出来的图片名字是原名，后缀是原后缀
                    outputPath: 'images/', # 如果图片超出1024会打包出来放在dist/images下
                    limit:1024 # 小于1kb的图片就会打包成base64嵌入到bundle.js中
                               # 大于这个1kb的图片就会按照原先单独打包成文件的方式打包出来
                              
                }
            },
```

```markdown
# 打包图片问题
在打包图片的时候如果index.html没有放在dist目录下，而是放在了public目录下，webpack就算打包成了，浏览器也会显示找不到该图片报错，原因暂时不知道是啥？
```

#### 打包样式的loader

##### css-loader

```powershell
# 无css-loader，只有一个style-loader的输出结果
Hash: 4c0aa1da9209d8b47c35
Version: webpack 4.43.0
Time: 573ms
Built at: 2020-05-18 11:21:29
            Asset      Size  Chunks             Chunk Names
        bundle.js  16.8 KiB    main  [emitted]  main
images/avatar.jpg   131 KiB          [emitted]
Entrypoint main = bundle.js
[./src/avatar.jpg] 61 bytes {main} [built]
[./src/content.js] 358 bytes {main} [built]
[./src/footer.js] 351 bytes {main} [built]
[./src/header.js] 351 bytes {main} [built]
[./src/index.css?7a74] ./src/index.css 480 bytes {main} [built]
[./src/index.css?a766] ./src/index.css 279 bytes {main} [built] [failed] [1 error]
[./src/index.js] 500 bytes {main} [built]
    + 1 hidden module

ERROR in ./src/index.css 1:4
Module parse failed: Unexpected token (1:4) 
# 表示模块没法解析，写的index.css在index.js中import出来没法识别，所以css-loader还处理了css文件的模块识别
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> img {
|     width: 150px;
|     height: 150px;
 @ ./src/index.css 2:26-50
 @ ./src/index.js

```

```markdown
# css-loader的作用
1.帮助webpack识别css模块
2.分析几个css文件之间的关系最后合并成一个css文件
```

##### style-loader

```markdown
# style-loader的作用
将css-loader合并出来的css文件中的内容挂载到html中的head里头
```

##### sass-loader

```markdown
# 使用场景
打包scss文件，需要同时安装node-sass
npm install node-sass sass-loader -D
```

```markdown
# 工作原理
1.碰到.scss文件，会使用sass-loader去识别翻译成css
2.使用css-loader再去处理识别css语法，同时合并多个css文件成为一个css片段
3.使用style-loader最后将css片段挂载到html的style中
```

postcss-loader

```markdown
# 功能
能够将CSS3的新特性在浏览器中添加上厂商前缀
```

```markdown
# 使用
1.配置规则中添加postcss-loader（需要提前安装postcss-loader）
2.单独添加一个postcss.config.js，并配置plugins:[require('autoprefixer')]（需要安装autoprefixer插件）
```

```markdown
# 工作原理
1.当打包遇到CSS3语法的时候，会使用postcss-loader进行厂商前缀添加
2.postcss-loader就来到postcss.config.js配置文件中，找到plugin，并最终找到一个叫做autoprefixer的插件
3.postcss-loader便会自动使用这个插件进行厂商前缀添加
```

```markdown
# 模块化打包CSS
1.概念：指CSS样式内容只在当前的文件有效，不会造成全局污染
2.配置：将css-loader增加一个options选项，里头写上modules:true支持模块化css
```

```markdown
# 不做配置直接使用@import语法时会报错

```

#### 打包字体的loader

```markdown
# 字体图标打包流程
1.下载相应的字体图标，并进入对应的css文件中修改字体图标存放路径
2.下载file-loader，并在配置文件新增一条处理字体的rule，使用的loader就是file-loader
3.如果之前配置过css-loader的modules：true模块化css，需要去掉，这样在index.js中引入才会生效
```

### 插件

#### HTMLWebpackPlugin

```markdown
# 使用方式
1.配置文件中引入：const HTMLWebpackPlugin = require('html-webpack-plugin')
2.Plugins中添加：Plugins:[new HTMLWebpackPlugin()]
3.再给插件HTMLWebpackPlugin添加选项，如添加生成的index.html模板，new HTMLWebpackPlugin({template:'scr/index.html'})
```

```markdown
# 工作原理
1.webpack首先打包各模块
2.在webpack打包过后，插件HTMLWebpackPlugin根据传入的参数模板生成一个index.html
3.接着HTMLWebpackPlugin自动把打包完成的js文件通过之前script标签的形式引入index.html中
```

CleanWebpackPlugin

```markdown
# 使用方式
1.配置文件中引入：const {CleanWebpackPlugin} = require('clean-webpack-plugin')
2.Plugins中添加：Plugins:[new CleanWebpackPlugin()]
```

```markdown
# 工作原理
1.在webpack打包模块之前去清理掉原来的dist文件夹
2.然后webpack才打包
3.最后打包完成后再由HTMLWebpackPlugin登场去生成index.html并引入js文件
```

### Entry与Output

```powershell
 # 第一种情况
 entry: "./src/index.js", # 默认这么写的话，如果output中不去配置输出文件名字filename，那么默认是main
 # 默认的entry写法等价于entry:{main:"./src/index.js"}，意思是假如output不配置filename，就用entry中的main这个key作为打包输出的文件名
 output: { # output中确实没有配置输出的文件名filename，所以最终dist中生成的是main.js
        path: path.resolve(__dirname, 'dist')
 },
```

```powershell
 # 第二种情况
 entry: "./src/index.js",
 output: {
       filename:'bundle.js' # 配置了filename，于是不会使用entry默认给的main作为输出文件名
        path: path.resolve(__dirname, 'dist')
 },
```

```powershell
 # 第三种情况
 entry: {# 意思是想要打包两次，期望打包结果是生成两个js文件
   main: './src/index.js',
   sub: './src/index.js'
 },
 问题：output: {
       filename:'bundle.js' # 结果是两个打包入口同时输出的文件名是同一个，这样子输出会报错，不能这么做
        path: path.resolve(__dirname, 'dist')
 },
 解决1：output:{
       filename: '[name].js',# 使用占位符语法，让打包的文件名是什么，输出的文件名就是什么，这样就不会报错
       path: path.resolve(__dirname, 'dist')
 }
 解决2：output:{ # 直接不写filename，那么默认就可以使用打包文件名来作为输出文件名了，效果同解决1一样
       path: path.resolve(__dirname, 'dist')
 }
```

```powershell
# 场景：想要打包后自动生成cdn前缀，希望部署后直接去访问cdn获取资源
# 原引入：<script src="main.js"></script>
# 现引入：<script src="http://cdn.com/main.js"></script>
 entry: "./src/index.js",
 output: {
       publicPath:'http://cdn.com' # 配置publicPath就可以
        path: path.resolve(__dirname, 'dist')
 },
```

### SourceMap

```markdown
# 作用
使用SourceMap可以让我们在代码出错的时候，在浏览器控制台中方便定位到源文件里头，而不是定位到打包输出的js文件中
```

### WebpackDevServer

```markdown
# 作用
提供给项目一个可以运行在服务器上的环境，同时可以线上更新打包内容
```

```markdown
# 开启
1. 配置：devServer: {
        contentBase: './dist',
        open: true,
       }
2. 添加："dev":"webpack-dev-server"
3. 启动： npm run dev

```

```markdown
# HMR
1. 作用：让跑在webpack-dev-server中的项目能够局部刷新，而不是每次更新代码就全体一起重新请求一次文件刷新。有时候，我们想要的效果就是类似Ajax技术一样的局部刷新效果，如果我们辛辛苦苦写的代码，大部分不需要改变，结果一更新打包文件就全体刷新，这样子就很坑了。
2. 引入：
const webpack = require('webpack');
Plugins:[new webpack.HotModuleReplacementPlugin()]
3. 开启：
   devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        hotOnly:true
   }
4. 使用：
CSS中使用：直接改动代码即可，css-loader帮我们内置了HMR的使用代码
JS中使用：
if(module.hot){
    module.hot.accept('./number',()=>{
       //这里做一些处理逻辑
    }) 
   }
```

代码发布思路：bundle.js只放自己写的代码，其他第三方代码抽离到另外的.js中

```javascript
const webpack = require('webpack')
entry:{
    app: path.join(__dirname,'./src/main.js'),
     vendors:['jquery,'vue']//要抽离的第三方包的名称全部放在这个数组当中
}
plugins:[
    new webpack.optimize.CommonsChunkPlugin({//要抽离的入口名字 
        name: 'vendor',
        filename: 'js/vendor.js'//发布的时候就会生成一个js目录，里头这个vendor.js的文件，存放的就是所有第三方代码
    })
]
```

 webpack代码压缩

```javascript
new webpack.optimize.UglifyJsPlugin({
    compress: {//配置压缩项
        warnings: false //移除警告
    }
})
new webpack.optimize.DedupePlugin({
  //设置产品线上环境进一步压缩代码
    'process.env.NODE_ENV': '"production"'
})
new htmlWebpackPlugin({
    minify: {
        collapseWhitespace: true //合并多余的空格
        removeComments: true //移除注释
        removeAttributeQuotes: true //移除属性上的双引号
    }
})
```
