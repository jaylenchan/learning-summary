class SyncHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    if (args.length > this.args.length) {
      args = args.slice(0, this.args.length)
    }
    console.log('args=>', args)
    this.tasks.forEach((task) => task(...args))
  }
}

const syncHook = new SyncHook(['url'])

syncHook.tap('第一次准备音频url', function (url) {
  console.log('第一次audio.src = ', url)
})

syncHook.tap('第二次准备音频url', function (url) {
  console.log('第二次audio.src =', url)
})

syncHook.call('http://www.baidu.com')
