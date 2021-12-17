//将构造函数的构建与判断instance的过程分离开来

//定义构造函数
const Singleton = function() {
  this.name = 'Singleton'
}

Singleton.prototype.getName = function() {
  console.log(this.name)
}

const CreateSingleton = (function() {
  let instance
  return function() {
    if(!instance) instance = new Singleton()
    return instance //这样显示返回对象不是返回this，其实失去了new的意义了，因为new本身就是用来创造新对象赋值this的
  }
})()

const singleton1 = new CreateSingleton()
const singleton2 = new CreateSingleton()

console.log(singleton1 === singleton2)