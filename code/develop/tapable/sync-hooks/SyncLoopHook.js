class SyncLoopHook {
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
    let result
    for (let i = 0; i < this.tasks.length; i++) {
      const doTask = () => {
        result = this.tasks[i](...args)
        if (result) doTask()
      }

      doTask()
    }
  }
}

const syncLoopHook = new SyncLoopHook([])

let count = 1

syncLoopHook.tap('学习Node', function () {
  console.log('学习Node', count, '次')
  return ++count > 3 ? undefined : '继续学Node'
})

syncLoopHook.tap('学习Webpack', function () {
  console.log('学习Webpack')
})

syncLoopHook.tap('学习CICD', function () {
  console.log('学习CICD')
})

syncLoopHook.call()
