const { time } = require('console')
const fs = require('fs')
const path = require('path')
const obj = {}

const after = (times, cb) => {
   //利用闭包去固定变量
   //闭包的机制就是定义函数的作用域跟执行函数的作用域不一样
   return () => {
      times --
      if(times ===0 ) cb()
   }
}
const cb = after(2, () => console.log(obj))
fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf-8', function(err, data){
   obj.age = data
   cb()
})
fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf-8', function(err, data){
   obj.name = data
   cb()
})