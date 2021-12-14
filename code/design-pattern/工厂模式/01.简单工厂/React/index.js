const VNode = require('./src/VNode')

//工厂方法
const createElement = (type, attr, children) => {
  return new VNode(type, attr, children)
}

//业务代码
const h1 = createElement('h1', { className: 'title' }, 'hello')
console.log(h1)