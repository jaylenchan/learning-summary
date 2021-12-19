class AsyncSeriesHook {
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
    const finalCb = args.pop()
    let index = 0
    const next = () => {
      if (index === this.tasks.length) return finalCb()
      this.tasks[index++](...args, next)
    }
    next()
  }

  promise(...args) {
    const [firstTask, ...leftTasks] = this.tasks
    let result = firstTask(...args)
    return leftTasks.reduce((curPromise, nextTask) => {
      return curPromise.then(() => nextTask(...args))
    }, result)
  }
}

const asyncSeriesHook = new AsyncSeriesHook([])

// asyncSeriesHook.tapAsync('读取文件A', function (next) {
// setTimeout(() => {
//   console.log('读取文件A')
//   next()
// }, 1000)
// })

// asyncSeriesHook.tapAsync('读取文件B', function (next) {
// setTimeout(() => {
//   console.log('读取文件B')
//   next()
// }, 1000)
// })

// asyncSeriesHook.callAsync(function () {
//   console.log('所有文件读取完毕！')
// })

asyncSeriesHook.tapPromise('读取文件A', function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('读取文件A')
      resolve()
    }, 1000)
  })
})

asyncSeriesHook.tapPromise('读取文件B', function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('读取文件B')
      resolve()
    }, 1000)
  })
})

asyncSeriesHook.promise().then(() => {
  console.log('所有文件读取完毕！')
})
