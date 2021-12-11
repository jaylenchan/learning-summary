const context = { // 其实本质单独文件里头的context，request，response都只是原型，定义的属性方法都是共用的
  get url() {
    // 注意这里头的this指的应该是实例，而不是现在这个context
    // 实例的request也是拷贝出来的request，于是顺着原型链找到了单独的reqeust这个文件里头拿到了共享的url属性
    // 紧接着在request这个原型中发现url，触发get访问器，取值就是this.req.url，这个this，又指的是实例
    // 于是就接着找到了实例的req，这个req就是原生的req，于是找到了url返回
    return this.request.url // 取自己身上的request上的url，相当于代理过去，是一种代理机制
  }
}

function defineGetter(target, prop) {
  context.__defineGetter__(prop, function() {
    return this[target][prop]
  })
}
function defineSetter(target, prop) {
  context.__defineSetter__(prop, function(val) {
    this[target][prop] = val
  })
}
defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('request', 'query')
defineGetter('response', 'body')
defineSetter('response', 'body')
module.exports = context