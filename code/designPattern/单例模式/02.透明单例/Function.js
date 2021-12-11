const Singleton = (function() {
  let instance
  return function() {
    if(instance) return instance
    this.name = 'Singleton'
    instance = this
    return instance
  }
})()

const singleton1 = new Singleton()
const singleton2 = new Singleton()

console.log(singleton1 === singleton2)