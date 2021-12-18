const Koa = require('./koa')

const koa = new Koa()

/**
 * ctx中包含了原生的req和res
 * ctx中还包含了自己封装的request和response
 */
koa.use((ctx) => {
  
})

koa.on('error', (err) => {
  console.log('err==>', err)
})
koa.listen(3000)