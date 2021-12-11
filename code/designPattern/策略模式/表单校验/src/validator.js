const strategies = require('./strategies')
//定义Validator类，用来负责接收用户需要校验的规则
class Validator {
  //用来启动校验，启动开始就会遍历校验组，对每一个存在的规则进行校验
  start(rules) {
    rules.forEach(rule => {
      switch({}.toString.call(rule.strategy)){
        case '[object Array]': 
        break
        case '[object Object]': strategies[rule.strategy.name]({ value: rule.target, length: rule.strategy.length, errorMsg: rule.errorMsg })
        break
        default:  strategies[rule.strategy]({ value: rule.target, errorMsg: rule.errorMsg })
      }
    });
  }
}

module.exports = new Validator()

