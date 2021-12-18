const neoAsync = require('neo-async')

let arr = [1,2,3]
console.time('cost')
function forEach(arr, callback, finalCallback) {
  const total = arr.length
  function done () {
    if(--total   === 0) finalCallback()
  }
  arr.forEach(item => {
    callback(item, done)
  })
}
// 同时开始，全部结束之后再去打印console.timeEnd('cost')
neoAsync.forEach(arr, (item, done) => {
  setTimeout(() => {
    done()
  }, 1000 * item)
}, () => {
  console.timeEnd('cost')
})