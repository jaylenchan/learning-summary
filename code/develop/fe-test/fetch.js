import axios from 'axios'

export function getData(fn) {
  axios.get('https://www.baidu.com').then(() => {
    fn({ success: true })
  })
}

export function fetchData() {
  return axios.get('https://www.baidu.com').then(() => {
    return { success: true }
  })
}

export function fetchError() {
  return axios.get('https://www.baidu.com').then(() => {
    return Promise.reject({ success: false })
  })
}

export function fetch404() {
  return axios.get('https://www.baidu.co1')
}
