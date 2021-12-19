class AsyncSeriesWaterfallHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    let index = 0
    const finalCb = args.pop()
    const next = (err, data) => {
      const task = this.tasks[index]
      if (!task) return finalCb()
      task(data, next)
      index++
    }
    next(null, ...args)
  }

  promise(...args) {}
}

const asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['filename'])

asyncSeriesWaterfallHook.tapAsync(
  '读取A文件，获取B文件的名字',
  function (originParam, next) {
    setTimeout(() => {
      console.log('originParam=>', originParam)
      next(null, 'B文件名字')
    }, 1000)
  }
)

asyncSeriesWaterfallHook.tapAsync(
  '读取B文件，获取C文件的名字',
  function (lastReturnVal, next) {
    setTimeout(() => {
      console.log('lastReturnVal=>', lastReturnVal)
      next(null, 'C文件名字')
    }, 1000)
  }
)

asyncSeriesWaterfallHook.callAsync('A文件名', function () {
  console.log('C文件读取成功！')
})
