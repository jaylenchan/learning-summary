//策略
const strategies = {
  isNonEmpty(target, errMsg) {
    if(!target) return errMsg
    return '用户名验证通过'
  }
}

//接收
class Validator {
  start(rules) {
    rules.forEach(rule => {
      const msg = strategies[rule.strategy](rule.target, rule.errMsg)
      console.log(msg)
    })
  }
}

//调用
const validator = new Validator()
const registerForm = {
  username: '',
  password: '123456'
}
const rules = [
  {
    target: registerForm.username,
    strategy: 'isNonEmpty',
    errMsg: '用户名不能为空'
  },
  {
    target: registerForm.password,
    strategy: {
      name: 'isMinLength',
      length: 6,
    },
    errorMsg:  '密码长度不能少于6位'
  }
]
validator.start(rules)