export function genConfig() {
  return {
    server: 'http://localhost',
    port: 80
  }
}

export function genConfig1() {
  return {
    domain: 'www.baidu.com'
  }
}

export function genConfigWithTime() {
  return {
    time: new Date()
  }
}
