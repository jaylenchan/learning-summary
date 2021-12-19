class AsyncParallelHook {
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
    const done = () => {
      if (++index === this.tasks.length) finalCb()
    }
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i](...args, done)
    }
  }

  promise(...args) {
    let result = []
    this.tasks.forEach((task) => {
      result.push(task(...args))
    })
    return Promise.all(result)
  }
}

const asyncParallelHook = new AsyncParallelHook([])

// asyncParallelHook.tapAsync('发送请求1', function (cb) {
//   setTimeout(() => {
//     console.log('发送请求1')
//     cb()
//   }, 1000)
// })

// asyncParallelHook.tapAsync('发送请求2', function (cb) {
//   setTimeout(() => {
//     console.log('发送请求2')
//     cb()
//   }, 1000)
// })

// asyncParallelHook.callAsync(() => {
//   console.log('请求完成')
// })

asyncParallelHook.tapPromise('发送请求1', function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('发送请求1')
      resolve()
    }, 1000)
  })
})

asyncParallelHook.tapPromise('发送请求2', function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('发送请求2')
      resolve()
    }, 1000)
  })
})

asyncParallelHook.promise().then(function () {
  console.log('请求完成')
})
