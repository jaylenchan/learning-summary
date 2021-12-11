let say = () => {
  console.log('say')
}

Function.prototype.before = function(fn){
  return (...args) => {
    fn(...args)
    this()
  }
}

say = say.before((name, age) => {
  console.log('在执行say之前添加了一件事来处理')
  console.log(name ,age)
})

say('chen', 25)