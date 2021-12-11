//准备一些策略，专门负责具体的规则校验
const strategies = {
  isNonEmpty({ value, errorMsg }) {
    if (value === '') {
      console.log(errorMsg)
      return
    }
    console.log('不为空校验通过')
  },
  minLength({ value, length, errorMsg }) {
    if(value.length < length) {
      console.log(errorMsg)
      return
    }
    console.log('最小长度校验通过')
  },
  isMobile({ value, errorMsg }) {
    if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
      console.log(errorMsg)
      return
    }
    console.log('手机格式正确')
  }
}

module.exports = strategies