# TS学习

## ts环境搭建

- 安装`node`环境：`https://nodejs.org/zh-cn/`
- 使用合适的书写风格：
  - `vscode`中`设置`里头搜索`Quote`然后设置成`single`
  - `vscode`中`设置`里头搜索tab然后设置`tab-size`成2
  - 下载`prettier`插件并配置`Single Quote`为`true`
- 安装`typescript`：`npm install typescript -g`
- 验证`typescript`：在项目当中我们去建立一个文件夹`test.ts`，然后书写如下代码`console.log('ts test')`。接着我们在命令行输入`tsc test.ts`，如果在目录下多出一个`test.js`，说明我们安装成功了。接着你就可以使用`node test.js`将文件运行起来了。
- 全局安装`ts-node`简化编译过程：`cnpm install ts-node -g` ，然后安装`cnpm install -D tslib @types/node`。这样子我们就不需要先`tsc test.ts`然后`node test.js`去得到在`test.ts`中代码的结果了，我们只需要`ts-node test.ts`就可以直接获取到我们想要的结果了。

## 静态类型

静态类型能够让我们更直观地判断一个变量的作用是什么。`const count:number = 1`，通过类型，我们可以知道`count`是一个`number`类型的变量，可以进行数字相关的操作。

## 类型注解和类型推断

- `let count:number` `count = 1` 这种`const count:number`显示的声明`count`是一个数字的方式，就叫做类型注解；即我们去告诉`ts`，我们的`count`是一个什么类型。

- `const count = 1` 这种写法，`typescript`会自动推断出`count`是一个数字，这种方式就叫做类型推断。一般情况下如果`typescript`能够自动去推断类型的话，我们不需要去进行类型注解了，因为类型已经推断出来了。

- ```tsx
  function getTotal(num1, num2){
    return num1 + num2
  }
  const total = getTotal(1, 2)
  ```

  以上写一个函数`getTotal`，虽然我们可以获取到正确的结果。但是对于函数来说，入参是不知道啥类型的，我们把鼠标放上去的时候就会发现`num1`	，`num2`获得的类型是`any`类型。对于这种没法类型推断出来的，我们就需要显示的去进行类型注解。

- 使用`const  obj = JSON.parse(d)`的形式，需要显示的进行`obj`的类型注解，因为没法推断出具体类型是啥

## 函数类型

- 返回值类型

  ```tsx
  function getTotal(num1, num2){
    return num1 + num2
  }
  const total = getTotal(1, 2)
  ```

  以上我们发现我们并没有去对返回值进行约束，也能够正常推断出返回的类型。但是在实际的开发当中，我们一般都需要对函数的返回值进行约束，因为你始终没法知道自己的项目代码何时可能出错。如果我们写的是`return num1 + num2 + ''` 结果就是函数的返回值变成了一个字符串类型了。在这种情况编译器不会提示你是否出错了，因为我们发现我们同时也没对`total`进行类型注解，它是通过类型推断出来的。一个良好的开发习惯是，对函数的返回值进行类型的注解。

  ```tsx
  function getTotal(num1, num2): number{
    return num1 + num2
  }
  const total = getTotal(1, 2)
  ```

  这样子，即使不小心在代码中写错了，返回值返回成了字符串，编译器就会立马报错，及时避免一些不必要的低级错误。

- 返回值是`void`。如果一个函数执行没有任何的返回值，那么请使用`void`。

- 为函数参数解构定义类型

  ```tsx
  const getTotal({ num1, num2 } : { num1: number, num2: number }):number {
    return num1 + num2
  }
  const total = getTotal({ num1: 1, num2: 2 })
  ```

## 数组和元组

- 数组可以是无限长度的
- 元组的长度是固定的

## interface接口

- 使用接口约束一个对象

  ```tsx
  interface Person {
    name: string
    [prop: string] : any /** 可能有额外新的属性要加入，属性的key是string类型，值无所谓any*/
    say(): string /** Person有一个say方法，返回值是string类型*/
  }
  const person:Person = {
    name: 'chen',
    age: 10,
    say() {
      return this.name
    }
  }
  ```

- 使用接口约束一个类

  ```tsx
  interface Person {
    name: string
    [prop: string] : any /** 可能有新的属性要加入，属性的key是string类型，值无所谓any*/
    say(): string /** Person有一个say方法，返回值是string类型*/
  }
  
  class Teacher implements Person {
    name: string
    say() {
      return this.name
    }
  }
  ```

- 使用接口约束一个接口

  ```tsx
  interface Person {
    name: string
    [prop: string] : any /** 可能有新的属性要加入，属性的key是string类型，值无所谓any*/
    say(): string /** Person有一个say方法，返回值是string类型*/
  }
  
  interface Teacher extends Person {}
  ```

- 使用接口约束一个函数

  ```tsx
  interface Person {
    (name: string) : void
  }
  
  const sayPerson:Person = (name: string) => console.log('chen')
  
  ```

## class类

## 装饰器

- 类装饰器：类装饰器接收的参数是，类本身
- 方法装饰器：方法装饰器接收的参数是，原型
