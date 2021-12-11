import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.end('/')
})

app.get('/hello', (req, res) => {
  res.end('/hello')
})

app.get('*', (req, res) => {
  res.end('*')
})

app.listen(3000, () => {
  console.log('listening 3000')
})
