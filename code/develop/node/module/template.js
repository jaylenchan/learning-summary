const ejs = require('ejs')
const path = require('path')

ejs.renderFile(path.resolve(__dirname, 'template.html'), {hell:'chen'},(err,res) =>{
  console.log('res===>', res)
})