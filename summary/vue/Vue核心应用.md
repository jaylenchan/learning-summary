## 实例属性

```vue
<script>
   vm = new Vue({
     template: `<div>{{msg}}</div>`,
     data() {
       return {
         msg: 'hello'
       }
     }
   })
  vm.$mount() //会挂载dom，并赋值给vm.$el
  document.body.appendChild(vm.$el) // vm.$el的值就是真实的dom
</script>
1. vm.$mount:手动挂载
vm.$mount()不指定任何选择器，会将真实dom赋值给vm.$el
vm.$mount('#app')指定选择器，会将真实dom赋值给vm.$el,并且挂载到指定选择器身上

2. vm.$options: 用户传递给Vue构造函数的参数和Vue内置的属性

3. vm.$watch: 监控属性，如果监控的属性多次赋值，只会监控到最后一次赋值的
vm.$wacth('msg', (nv,od) => {
  console.log('nv=>', nv)
})
vm.msg = 'world' //相同属性连续赋值不会监控到这个world，也就是vm.$watch的nv只会出现100不会出现world
vm.msg = 100 //只会监控到这个100

4. vm.$nextTick:

5. vm.$set

6. vm.$delete
```

## 内置指令

```vue
作用：指令一般是用来操作dom的
1. v-html 
具有危险，如果插入的html有脚本，会出现xss攻击的危险

2. v-if / v-else-if / v-else
作用：v-if控制的是dom是否存在，可以用在template无意义标签（无意义标签作用是为了不渲染出来）身上

3. v-show
作用：v-show控制的是dom上的样式，不可以用在template无意义标签身上。频繁切换显示用v-show（不会中断后续逻辑，只是显示无），为了中断后边逻辑的话使用v-if（直接没这个dom了）

4. v-for
作用：循环字符串、对象、数组、数字
<div v-for="fruit in ['a', 'b', 'o']" :key="唯一标识，千万不要用数组的索引作为key，如果只是单纯渲染则可以">
</div>
注意：v-for的优先级会比v-if的高，因为这个原因会导致一些性能问题
<div v-for="fruit in ['a', 'b', 'c']" v-if="false"></div>
原本的设想是如果v-if是false，直接不需要循环，走其他逻辑了。结果是先进行遍历['a', 'b', 'c'],再判断v-if了。
['a', 'b', 'c'].forEach(fruit => {
 return  false ? '' : fruit //先遍历，再判断，跟设想不符合。设想是先判断是否遍历，再遍历
})
解决的方式1：不要让v-if和v-for在同一个标签上出现
<tempalte v-if="false"> # 使用template的话，v-for的时候，不能再template身上使用:key
  <div v-for="fruit in ['a', 'b', 'c']" ></div>
</tempalte>
解决的方式2：使用计算属性，计算哪些不需要显示，把需要显示的计算出来，再去遍历

5. v-bind
v-bind:class
<div :class="{ red: false, green: true }"></div> # 多个class（对象写法）
<div :class="['red', 'green']"></div> # 多个class （数组写法	）
<style>
  .red {
    color: red
  }
  .green {
    color: green
  }
</style>
 
v-bind:style
<div :style="{ color: red }"></div> # 1个style 
<div :style="[{ color: red }, { color: green }]"></div> # 多个style

6. v-on
<div @click="fn"></div>
<div @click="fn1($nvent)"></div># 如果是括号方式调用的，需要手动传入事件源
# vue的事件是直接绑定给元素的，这里跟react不同，不是事件委托的方式。vue拿到的都是内部的原生事件
<script>
const vm = new Vue ({
  data(){
    return {
      fn() {
        // 不要放在data里头，因为this指向在data中不是vm，是window
        // 要放到methods中
      }
    }
  },
  methods: {
    fn() {
      // 这里的this都是指向当前实例
      
    }
  }
})
</script>
事件修饰符
.stop:阻止冒泡
.prevent:阻止默认
.passive: 提高滚动事件的效率

7. v-model
作用：双向绑定
可使用的控件：input/textarea/select/redio/checkbox
7.1 input
<template> # 将msg显示到页面上，输入框输入的值可以同步到msg的地方
  {{msg}}
// <input type="text" :value="msg" @input="handleInput"/>
 <input type="text" :value="msg" @input="(e) => msg = e.target.value"/>
v-model就是:value="msg"和 @input="(e) => msg = e.target.value"合起来的语法糖
</template>
<script>
export default {
  data() {
   return {
     msg: 'hello'
   }
  },
  methods: {
    handleInput(e) {
      this.msg = e.target.value
    }
  }
}
</script>
v-model修饰符
v-model.lazy懒更新，失去焦点才更新	
v-model.number 只能输入熟悉数字
v-model.trim 去除空格
```

## computed和watch

```vue
<script>
 const vm = new Vue({
   el:'#app',
   data() {
     return { msg: { a: 1} } // 注意，这里不是普通值，是一个对象
   },
   watch: { 
     // 为了监控msg值是整个对象的情况，需要将msg监听写成对象的形式
     msg: {
       handler(nv,od) {
         console.log(nv, od)
       },
       deep: true 
     }
   }
 })
 setTimeout(() => {
   vm.msg.a = 100
 })
</script>

computed和watch的区别
计算属性内部不会立马获取值，只有取值的时候才执行（有缓存，如果依赖的数据不发生变化，则不更新结果）
watch默认会在内部先执行，他要算出一个老值来，如果数据变化会重新执行回调函数
```

## 过滤器

```vue
作用：将源数据进行格式化，不改变源数据
```

## 自定义指令

## 生命周期钩子

## 动画

使用场景：当DOM显示或者隐藏时可以使用上动画

## 自动化测试

模块化开发，你更改了某些代码，却导致了其他模块受到了影响

大家一起写代码，每个人写代码的风格不一样，不方便阅读代码中的功能

编写了测试用例，就可以快速地知道别人写的代码是干什么的

测试用例会强迫你写出易于被测试的代码，有效提升代码指令

##### 根据测试的人员分类

###### 黑盒测试

测试人员进行功能测试，验证你的代码是否符合他的预期，并不需要知道代码咋写的

###### 白盒测试

开发人员写的，必须要知道代码是如何实现的

##### 根据测试本身功能分类

###### 单元测试

以最小单元来测试（一个函数，一个模块，一个组件）

###### 集成测试

多个单元测试组合起来的测试，模拟用户的行为进行测试

###### 端到端测试

##### TDD测试驱动开发和BDD行为驱动开发

TDD就是先测试再开发（一般是白盒测试）

写函数，写库一般采用TDD

```vue
求和： 1+1 = 2 0+1 =1
然后自己根据测试去实现，需要知道实现代码
```

BDD就是先开发再测试（一般是黑盒测试）

写组件一般采用BDD

##### 常见的测试框架

- Karma 可以把代码放到浏览器中测试，帮我们测试ui
- mocha 只提供一个测试环境，但是测试的功能需要自己安装（断言库：chai，sinon）
- jest 不用启动浏览器，利用jsdom模拟浏览器环境。不能测试渲染出来的结果。0配置

