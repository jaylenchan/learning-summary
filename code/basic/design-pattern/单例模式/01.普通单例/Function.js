const Singleton = function (name) {
  this.name = name
}

Singleton.prototype.getName = function () {
  return this.name
}

Singleton.getInstance = (function () {
  let instance
  return function () {
    if (!instance) instance = new Singleton('Singleton')
    return instance
  }
})()

const singleton1 = Singleton.getInstance()
const singleton2 = Singleton.getInstance()
console.log(singleton1 === singleton2)