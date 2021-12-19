class SyncWaterfallHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    if (args.length > this.args.length) {
      args = args.slice(this.args.length)
    }
    const [firstTask, ...leftTasks] = this.tasks
    let result = firstTask(...args)
    leftTasks.reduce((curResult, task) => {
      curResult = task(curResult)
      return curResult
    }, result)
  }
}

const syncWaterfallHook = new SyncWaterfallHook(['lastParam'])

syncWaterfallHook.tap('传递参数1', function (lastParam) {
  console.log('传递参数1后当前所有参数是 = ', lastParam)
  lastParam = [lastParam, 2]
  return lastParam
})
syncWaterfallHook.tap('传递参数2', function (lastParam) {
  console.log('传递参数2后当前所有参数是 = ', lastParam)
  lastParam = [...lastParam, 3]
  return lastParam
})
syncWaterfallHook.tap('计算总和', function (lastParam) {
  console.log('目前以下参数加入总和计算：', lastParam)
  const sum = (args) => {
    let total = 0
    return args.reduce((curSum, num) => {
      curSum += num
      return curSum
    }, total)
  }
  console.log('总和 = ', sum(lastParam))
})

syncWaterfallHook.call(1)
