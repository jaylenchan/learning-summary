/*
 * promise解决的问题
 * 回调嵌套的问题
 * 同步多个异步请求的结果
*/

const fs = require('fs')
const { resolve } = require('path')
// 定义的这个promisify只支持node 的api。因为里头的fn调用是按照node api执行的方式调用的
const promisify = fn => (...args) => new Promise((resolve,reject) => {
  fn(...args, function(err, data){
     if(err) reject(err)
     resolve(data)
  })
})
const read = promisify(fs.readFile)

read(resolve(__dirname, 'name.txt'), 'utf-8')
.then(res => console.log(res))

