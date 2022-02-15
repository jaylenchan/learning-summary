import axios from 'axios'

export function fetchData() {
  return axios.get('/users') //获取用户数据
}

export function sum(a, b) {
  return a + b
}
