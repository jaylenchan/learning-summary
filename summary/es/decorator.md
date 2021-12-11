1. 现在我们要建立一个工具，工具有一个功能是获取数据

   ```javascript
   class Util {
     getData() {
       console.log('getData')
     }
   }
   ```

   OK，于是我们创建了工具类，并给工具类添加上了一个功能方法，getData用于获取数据。

   接下来我们就创造出这个工具，并试试获取数据这个功能

   ```javascript
   const util = new Util()
   util.getData()
   ```

   正常使用功能getData后输出了'getData'。

2. 过了两天，我们突然想到，这个获取数据的功能使用起来对时间有一定的要求，于是我们想要计算一下，整个功能执行的时间到底是多少？很自然地，我们先会想到以下几种计算时间的方式：
   - 直接在原函数里头添加时间计算的逻辑
   - 在调用方调用原函数时，前后添加时间计算的逻辑

 于是有：

添加方式一： 

```javascript
getData() {
    const start = new Date().valueOf()
    console.log('getData')
    const end = new Date().valueOf()
    console.log('duration==>', end - start)
  }
```

添加方式二：

```javascript
调用方逻辑
 const start = new Date().valueOf()
 getData()
 const end = new Date().valueOf()
 console.log('duration==>', end - start)
```

 方式一的弊端：直接修改了原函数的逻辑。getData函数本来只做了获取数据一件事情，现在承担了两件事情的责任：（1）获取数据（2）计算执行的时间。这不是我想要的，原函数被污染了，getData只想实现获取数据的功能，而不想把其他无关逻辑放进来。

方式二的弊端：虽然getData确实只负责了获取数据的功能，但是添加的计算时间的逻辑如果说其他地方也需要这个时间计算的功能，那么只能够复制粘贴这些代码，很多地方要用，就要复制粘贴大量的代码。

于是，我们想，我们能不能将时间计算的功能做成单独的配件，当任何需要到的地方需要的时候，直接安装上去，不需要就不安装，这样子既不影响原有的工具功能，同时如果多个地方也需要使用也不会大量复制一堆代码。基于这种想法，我们开始动手。先将功能的安装，基于类安装。

这里，我们想类中所有的书写方法，实际上本质还是挂在原型上的，而我们的最终目的是啥？我们想要增强原有功能，给它额外添加上打印时间的功能，同时又不去改变原来的逻辑。于是我们最先应该去想到的是获取类的原型，别忘了类的本质就是曾经ES5里头写的构造函数，而为什么我们需要去获取类的原型，那是因为我们在类中所有定义的功能方法本质上都是定义在类的prototype身上，然后提供给所有的类实例进行共享的。因此，我们需要最先获取到的是这个原型。

```javascript
const prototype = Util.prototype
// 获取原型的目的只有一个，所有方法都是定义在它身上，待会我们需要去拿属性描述符，需要用到它，因为方法定义实际上是定义在属性描述符身上的
```

我们需要知道我们口中说的方法，属性实际上都可以统一叫为属性，这么说是因为他们是属性，只是因为各自的属性值不同而被区分叫成了属性/方法而已。之所以要说这个，是因为对于所有的属性（方法/属性）都有一个东西，叫做属性描述符，它用来描述一个对象的属性特征，这个属性值是啥？这个属性是否可以被修改？这个属性是否可以被设置新值？这个属性是否可以被枚举（遍历）？

那因此，我们应该接下来想要的就是想增强的属性的属性值，获取它，修改它，让外界以为你是在调用原来的属性，实际上你调用的那个已经是被修改后的属性了

值得注意的一点是，使用Object.getOwnPropertyDescriptor()获取到的东西仅仅是一个副本，也就是说在获取到了descriptor之后，如果我们对其中的value修改过后，需要想办法去把这个属性描述符设置替换掉对应属性原本的属性描述符。因此，Object.defineProperty做的就是这件事。

```javascript
function log(model, key) {
  const descriptor = Object.getOwnPropertyDescriptor(model.prototype, key)
  const fn = descriptor.value
  const newFn = function() {
    const start = new Date().valueOf()
    fn()
    const end = new Date().valueOf()
  }
  descriptor.value = newFn
  Object.defineProperty(model.prototype, key, descriptor)
}
```

​     

方法装饰器：

```javascript
// 定义方法装饰器：target,name,descriptor
步骤二：function readonly(target, name, descriptor){
  descriptor.writable = false;
  return descriptor;
}
步骤一：function wrap(constructor, fn, decorator) {
  const prototype = constructor.prototype
  const descriptor = Object.getOwnPropertyDescritor(prototype, fn)
  return decorator(prototype, fn, descriptor)
}
步骤三：const newDescriptor = wrap(Person, 'say', readonly);
步骤四：Object.defineProperty(Person.prototype, 'say', newDescriptor)


class Person {
  @readonly // 这么使用
  say() {}
}

```

类装饰器：

```javascript

const baseUrl = (target) => {
  target.baseUrl = 'xxxx'
  return target
}

@baseUrl
class Race {
  
}
```

