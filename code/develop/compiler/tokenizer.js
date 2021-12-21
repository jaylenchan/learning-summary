const tokenTypes = require('./tokenTypes')
const LETTERS = /[a-z0-9]/
let currentToken = {
  type: '',
  value: ''
}
let tokens = []

function emit(token) {
  /** 一旦发射一个token之后就可以清空currentToken，然后将当前token放入tokens数组当中 */
  currentToken = {
    type: '',
    value: ''
  }
  tokens.push(token)
}

function jsxText(char) {
  if (char === '<') {
    emit(currentToken) //{ type: 'JSXText', value: 'hello' },
    emit({ type: tokenTypes.LeftParentheses, value: '<' })
    return foundLeftParatheses
  } else {
    currentToken.value += char
    return jsxText
  }
}

function foundRightParatheses(char) {
  if (char === '<') {
    emit({ type: tokenTypes.LeftParatheses, value: '<' })
    return foundLeftParatheses
  } else {
    currentToken.type = tokenTypes.JSXText
    currentToken.value += char
    return jsxText
  }
}

/** 因为后头可能是一个新的属性，也可能是开始标签的结束 */
function tryLeaveAttribute(char) {
  if (char === ' ') {
    /** 说明后边是一个新的属性 */
    return attribute
  } else if (char === '>') {
    /** 说明开始标签结束了 */
    emit({
      type: tokenTypes.RightParatheses,
      value: '>'
    })
    return foundRightParatheses
  }
  throw new TypeError('Error')
}

function attributeStringValue(char) {
  if (LETTERS.test(char)) {
    currentToken.value += char
    return attributeStringValue
  } else if (char === '"') {
    emit(currentToken)
    return tryLeaveAttribute
  }
}

function attributeValue(char) {
  if (char === '"') {
    /**说明该取属性的值了 */
    currentToken.type = tokenTypes.AttributeStringValue
    currentToken.value = ''
    return attributeStringValue
  }
  throw new TypeError('Error')
}

function attributeKey(char) {
  if (LETTERS.test(char)) {
    currentToken.value += char
    return attributeKey
  } else if (char === '=') {
    /** 说明属性key的名字已经结束了 */
    emit(currentToken)
    return attributeValue
  }
}

function attribute(char) {
  if (LETTERS.test(char)) {
    currentToken.type = tokenTypes.AttributeKey /** 属性的key */
    currentToken.value += char /** 属性key的名字 */
    return attributeKey
  }
  throw new TypeError('Error')
}

function jsxIdentifier(char) {
  if (LETTERS.test(char)) {
    currentToken.value += char
    return jsxIdentifier
  } else if (char === ' ') {
    emit(currentToken)
    return attribute
  } else if (char === '>') {
    /** 说明此标签无属性直接结束 */
    emit(currentToken)
    emit({
      type: tokenTypes.RightParatheses,
      value: '>'
    })
    return foundRightParatheses
  }
  throw new TypeError('Error')
}

function foundLeftParatheses(char) {
  if (LETTERS.test(char)) {
    currentToken.type = tokenTypes.JSXIdentifier
    currentToken.value += char
    return jsxIdentifier
  } else if (char === '/') {
    emit({
      type: tokenTypes.BaskSlash,
      value: '/'
    })
    return foundLeftParatheses
  }
  throw new TypeError('Error')
}

function start(char) {
  if (char === '<') {
    emit({ type: tokenTypes.LeftParatheses, value: '<' })
    return foundLeftParatheses
  }
  throw new Error('第一个字符必须是<')
}

function tokenizer(source) {
  let state = start
  for (let char of source) {
    if (state) {
      state = state(char)
    }
  }
  return tokens
}

let sourcecode = `<h1 id="title" name="jaylen"><span>hello</span>world</h1>`
console.log(tokenizer(sourcecode))

module.exports = {
  tokenizer
}
