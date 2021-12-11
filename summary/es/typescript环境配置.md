## 环境配置

全局安装TS`npm install typescript -g`

​       当我们全局安装了ts，我们还需要告诉ts按照什么样的规则配置去编译ts代码，所以我们需要生成TS配置`tsc --init`。

### 全局编译ts

​       安装完ts之后，我们就可以书写ts代码然后编译成js代码文件，进而去运行得到结果了。

### node环境编译ts

​       有的时候，我们可能希望在VSCode当中书写完ts代码之后，想要直接获取到ts代码的结果，而不是编译成js代码后，再去运行代码生成结果。这个时候我们可以配置VSCode插件`code runner`+npm包`tsnode`去实现我们想要的效果。

全局安装tsnode`npm install tsnode -g`，然后安装code runner插件后，写完ts代码后直接右键run code就可以得到ts运行后的结果。

### 通过构建工具编译ts（webpack、rollup）

​        往往在实际工程当中，以上两种方式并不是太常用，更多的我们都会使用构建工具去搭建ts环境。解析ts的方式有两种，一种是通过ts插件来解析，另外一种就是通过babel来解析。

​       在rollup当中一般会采用`rollup-plugin-typescript2` +`tsconfig.json`去实现ts的解析

​       在webpack当中则会采用`ts-loader`或者通过`babel-plugin-typescript`去实现ts的解析

​       这里我们就使用rollup去搭建一套ts的运行环境。

```shell
// 安装rollup
npm install rollup -D
//安装项目级别的ts
npm install typescript -D
// 让rollup能够识别ts代码的插件
npm install rollup-plugin-typescript2 -D
// 由于rollup无法识别node_modules第三方的文件，所以为了在写代码的时候能够import第三方包，还需要安装插件
npm install @rollup/plugin-node-resolve -D
// 我们还需要启动一个服务 -等价于webpack-dev-server
npm install rollup-plugin-serve -D
```



