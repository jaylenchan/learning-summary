class SyncBailHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let result
    if (this.args.length > args.length) {
      args = args.slice(0, this.args.length)
    }
    for (let i = 0; i < this.tasks.length; i++) {
      result = this.tasks[i](...args)
      if (result) return result
    }
  }
}

const syncBailHook = new SyncBailHook(['url'])

syncBailHook.tap('第一次准备音频', function (url) {
  console.log('第一次准备音频 audio.src = ', url)
  return '音频准备成功了，无需再次赋值'
})

syncBailHook.tap('第二次准备音频', function (url) {
  console.log('第二次准备音频 audio.src = ', url)
})

syncBailHook.call('http://www.baidu.com')
