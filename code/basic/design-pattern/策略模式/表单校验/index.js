const validator  = require('./src/validator')
const registerForm = {
  username: '',
  password: '123f6',
}
//TODO: 设计配置规则的策略允许传一个字符串，一个对象 ，也允许传一个数组，其中数组每一项即可是字符串，也可以是对象
const rules = [
  {
    target: registerForm.username,
    strategy: ['isNonEmpty'],
    errorMsg: '用户名不能为空'
  },
  {
    target: registerForm.password,
    strategy: {
      name: 'minLength',
      length: 6
    },
    errorMsg: '密码长度不能小于6位'
  }
]

validator.start(rules)
