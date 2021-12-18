// 发布订阅模式
//on 将函数依次放入数组
//emit 将函数依次从数组取出来执行

// 发布订阅模式的发布和订阅之间没有依赖关系。主要靠一个event1中介来事
const fs = require('fs')
const path = require('path')
const event1 = {
  arr: [],
  on(fn) {
    this.arr.push(fn)
  },
  emit() {
    this.arr.forEach(fn => fn())
  }
}
const obj  = {}
event1.on(()=> {
   if(Object.keys(obj).length === 2) console.log('读取完成==》', obj)
})

fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf-8', function(err, data){
  obj.age = data
  event1.emit()
})
fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf-8', function(err, data){
  obj.name = data
  event1.emit()
})
