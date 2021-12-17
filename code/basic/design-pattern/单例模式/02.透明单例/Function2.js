const Singleton = function() {
  this.name = 'Singleton'
}

Singleton.prototype.getName = function() {
  console.log(this.name)
}

const CreateSingleton = function(constructor) {
  let instance
  return function() {
    if(!instance) {
      instance = new constructor(arguments)
    }
    return instance
  }
}

const CSingleton = CreateSingleton(Singleton)
const singleton1 = new CSingleton()
const singleton2 = new CSingleton()

console.log(singleton1 === singleton2);
