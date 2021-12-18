// 检查data是不是一个对象
const if_data_is_not_object = function(data) {
  if(typeof data !== 'object') return true
  if(data === null) return true
  return false
}
class Observer {
  constructor(data) {
    if(Array.isArray(data)){
      this.observeArray(data)
    }
    // 如果数据层次过多，需要递归去解析对象的属性，依次的增加set和get方法
    this.walk(data)
  }
  observeArray(data) {
    data.forEach(el => observe(el))
  }
  walk(data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      const value = data[key]
      defineReactive(data, key, value) // 给data定义一个响应式key，值是value
    })
  }
}
const defineReactive = function(data, key, value) { // 要给data定义一个key值是value
  observe(value) //假如value也是对象就需要递归观测
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: false,
    get() {
      return value
    },
    set(newValue) { //vm._data.xx = newValue触发
      if(value === newValue){
        return 
      }else {
        observe(newValue) // 有可能用户设置的值也是一个对象，所以需要继续劫持
        value = newValue
      }
      
    }
  })
}
// 函数作用：把data中的所有属性，用Object.defineProperty重新定义
export function observe(data) {
  if(if_data_is_not_object()) return
  new Observer(data) // 用来观测数据的
}