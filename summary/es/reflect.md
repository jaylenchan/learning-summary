# Reflect

## Reflect对象的产生目的

- 将Object中一些属于语言内部的东西放到Reflect对象身上
- 修改Object对象的方法返回结果，同一个方法在Reflect对象身上得到的效果可能和Object不一样了
- 将Object的操作行为都变成了函数行为，同一个操作使用Object的方式是命令式的，在Reflect对象中就是函数式的
- 跟Proxy中的方法一一对应，让Proxy对象可以方便地调用原有对象的方法行为

## Reflect.get(target, prop, receiver)

- 无receiver
  - 对象上有该prop，返回对象中这个prop的值
  - 对象上没有该prop，返回undefined
  - 对象上有计算属性，并且计算属性部署了getter函数。同时这个计算属性内部计算是通过this去获取值的。那么无receiver的情况下，this指向target。即

  ```?js
  get fullname () { this.name + 'jialiang' }
  ```

  this.name === target.name
- 有receiver
  - 对象上有计算属性，并且计算属性部署了getter函数。同时这个计算属性内部计算是通过this去获取值的。有receiver的情况下，this指向receiver。即

   ```?js
  const receiver = { name: 'wang' }
  get fullname () { this.name + 'jialiang' }
  ```

  this.name === receiver.name

- 如果说target不是一个对象的情况下，使用Reflect.get(target, prop, receiver)会报错！

## Reflect.set(target, prop, value, receiver)

- 无receiver
  - 数据属性
    对数据属性，使用Reflect.set(target, prop, value)的情况，设置成功返回true，设置失败返回false。同时读取target中被设置新值得属性，成功的话会发现属性值确实变化了。
  - 计算属性
    对于计算属性，使用Reflect.set(target, prop, value)的情况，设置成功返回true，设置失败返回false。如果说setter中有this，此时因为Reflect.set调用时没有传入receiver，这个this指向target
- 有receiver
  - 数据属性
  传入了receiver，则调用Reflect.set(target, prop, value, receiver)后value是设置在了receiver中的prop属性上，而不是target的prop上。
  - 计算属性
  如果传入参数有receiver，则target部署的计算属性中的this指向的就是receiver。假如setter中有代码this.name则相当于给receiver.name设置值而不是给target.name设置值。
  - 小结：对于Reflect.set(target, prop, value, receiver)传入了receiver的两种情况，最终只要看是否传入了receiver，如果传入了，则prop，value生效的地方都是receiver而不是target。

## Reflect.has(target, 'prop')

- 作用： 判断一个prop属性，是否在target的原型链当中
- 替代： 替代了旧的写法 prop in target
  
## Reflect.deleteProperty(target, 'prop')

- 作用： 删除一个对象中的属性
- 替代： 替代了旧的写法 delete target.prop
- 效果： 删除成功 | 删除的属性不存在 返回true
        删除失败 | 删除的属性依然在 返回false
        target不是对象 报错

## Reflect.getPrototypeOf(target)

- 作用： 获取一个对象的原型
- 替代： Object.getPrototypeOf(target)
- 效果： target是对象，返回原型
        target不是对象，转为对象，再返回原型

## Reflect.setPrototypeOf(target, newPrototype)

- 作用：给target对象设置新的原型，修改原型指向
- 替代：Object.setPrototypeOf(target, newPrototype)
- 效果： target不是对象 报错
        target是对象，设置原型成功返回true，设置原型失败返回false

## Reflect.apply(function, this, args)

## Reflect.defineProperty(target, prop, descriptor)

- 作用：
- 替代： 替代了旧的写法Object.defineProperty(target, prop, descriptor)

## Reflect.getOwnPropertyDescriptor(target, prop)

- 作用： 获取一个对象中的某个属性的属性描述符
- 替代： 替代了旧的写法Object.getOwnPropertyDescriptor(target, prop)
- 效果： target不是对象，报错
        target是对象，返回对应属性的描述符

## Reflect.ownKeys(target)

- 作用： Object.getOwnPropertyNames + Object.getOwnPropertySymbols
