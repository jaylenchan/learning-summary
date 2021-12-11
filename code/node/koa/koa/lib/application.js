const http = require('http')
const EventEmitter = require('events')
const request = require('./request')
const response = require('./response')
const context = require('./context')


class Application extends EventEmitter {
  constructor() {
    // 默认先将request、response、context拷贝一份，既可以享受原有的属性，同时也可以扩展自己的属性
    // 理由：我们不希望多个koa实例共享一个response,request，context
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.context = Object.create(context)
    this.middlewares = []
  }

  use(callback) { // use只是负责放置函数，listen了有了server后可能接收请求去执行
    this.middlewares.push(callback)
  }
  createContext(req, res) {
   // 对于每一个koa实例，每一个请求的request和response和context我们也不想一样，所以再接着对每一个koa实例的request，response，context进行拷贝
   // 最终每一个请求都有了单独的ctx
    const request = Object.create(this.request)
    const response = Object.create(this.response)
    const context = Object.create(this.context)
    context.request = request
    context.req = context.request.req =  req
    context.response = response
    context.res = context.response.res = res
    return context
  }
  compose(ctx) {
    // 默认将middlewares里头的第一个函数执行
    let index = -1 //默认一次都没调用
    const dispatch = (i) => {
      let middleware = this.middlewares[i]
      if(index === i) {
        return Promise.reject(new Error('next() called mutiple times'))
      }
      index = i
      if(i === this.middlewares.length) return Promise.resolve()
      // 如果执行完成，有可能发挥的不是promise
      // 实现了链式等待，默认执行第一个，如果用户调用了next就继续跑
      try{ //  try catch只能捕获同步的代码，异步的代码是无法捕获的
          // promise的catch方法只能捕获到异步错误，不能捕获到同步代码跑出来的错误
        return Promise.resolve(middleware(ctx, () => dispatch(i+1)))
      }catch(err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0) // 默认派发第一个
  }
  handleRequest(req, res) {
    // 请求到来的时候，就需要执行use方法
    // 在这个地方就需要进行ctx的封装了,ctx = req + res + request + response
    // 注意点：ctx应该是每次新的请求来的时候，都产生一个新的ctx，而不是公用的！！
    const ctx = this.createContext(req, res)
    // 组合多个函数
    this.compose(ctx).then(() => {
      const body = ctx.body
      // 对不同的body类型进行处理返回
      // 默认的body就是字符串类型或者buffer
      if(typeof body === 'string' || Buffer.isBuffer(body)) {
        res.end(body)
      }else if(body instanceof Stream) { // 如果是一个流
        // 如果是一个流的话，需要下载此文件
        // 下载文件靠的也是头来实现的
       res.setHeader('Content-Disposition', `attatchment;filename=${ctx.path.slice(1)}`)
        body.pipe(res)
      }else if(typeof body === 'object') {
        res.end(JSON.stringify(body))
      }else if(typeof body === 'number') {
        res.end(body+ '')
      }else {
        res.end('Not Found')
      }
      // 
      res.end(ctx.body) // 返回用户设置的结果
    }).catch(err => {
      this.emit('error', err)
    })
   
  }
  listen(...args) {  // listen中将http创建的server时的回调函数的定义放到了外边，这里就是根据格式传递一个回调函数的定义而已，只不过换绑了this
    const server = http.createServer(this.handleRequest.bind(this)) // bind this实例，要不然只是只是穿了一个引用，内部调用起来的时候，这个handleRequest的this就是创建出来的server
    server.listen(...args)
  }
}
// 可以的返回值传一个流，一个body，一个对象
module.exports = Application