const path = require('path')
const fs = require('fs')
const renderFile = (absPath, params, cb) =>{
    fs.readFile(absPath,'utf8', (err, res) =>{
      if(err) {
        return cb(err, html)
      }
      // arguments[0] : 源字符串
      // arguments[1]: 正则匹配的第一个分组，就是第一个圆括号
      const html = res.replace(/\{\{([^}]+)\}\}/g, function() {
        let key = arguments[1].trim()
        return params[key]
      })
      cb(err, html)
    })
}
renderFile(path.resolve(__dirname, 'myTemplate.html'), { name:"zhufeng"}, (err, data) =>{
   if(err) {
     console.log('err=>',err)
   }
   console.log(data)
})