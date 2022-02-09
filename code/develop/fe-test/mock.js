import axios from 'axios'

export function runCallBack(cb) {
  console.log('start run cb')
  cb()
}

export function getData() {
  return axios.get('https://www.baidu.com')
}
