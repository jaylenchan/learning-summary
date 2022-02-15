export default {
  get(url) {
    if (url === '/users') {
      return new Promise((res) => {
        res(['张三', '李四'])
      })
    }
  }
}
