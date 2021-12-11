//业务代码
const AppleFactory = require('./src/Apple')
const OrangeFactory = require('./src/Orange')

const apple = AppleFactory.create('苹果', '甜的')
const orange = OrangeFactory.create('橘子', '酸的')

console.log(apple)
console.log(orange)