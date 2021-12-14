const Apple = require('./src/Apple.js') 
const Orange = require('./src/Orange.js')

//工厂代码
const factory = (type) => {
  switch(type) {
    case 'apple' : return new Apple('苹果', '甜的')
    case 'orange' : return new Orange('橘子',  '酸的')
    default: throw new Error('请输入正确的水果种类！')
  }
}

//业务代码
const apple = factory('apple')
const orange = factory('orange')

console.log(apple, orange)