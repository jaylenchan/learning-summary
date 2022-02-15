import { getDataByCallBack, getDataByPromise } from './async'

describe('callback异步测试', () => {
  // 错误写法
  // test('测试callback的方式获取数据', () => {
  //   getDataByCallBack((data) => {
  //       expect(data).toEqual({ name: 'jaylen'})
  //   })
  // })

  // 正确写法1 ： TODO:加done参数让回调的测试正确
  test('测试callback的方式获取数据', (done) => {
    /**
     * 直接使用jest.runAllTimers()会报错
     * A function to advance timers was called but the timers API is not mocked with fake timers.
     * Call `jest.useFakeTimers()` in this test or enable fake timers globally by setting `"timers": "fake"` in the configuration file.
     * This warning is likely a result of a default configuration change in Jest 15.
     * TODO:报错要想解决，有两种方式：第一种就是全局设置：timers:fake; 第二种就是在单元测试下首先使用jest.useFakeTiemrs()才继续使用jest.runAllTiemrs()
     */
    // jest.useFakeTimers()
    getDataByCallBack((data) => {
      expect(data).toEqual({ name: 'jaylen' })
      done()
    })
    // jest.runAllTimers() // 运行所有的定时器
    // jest.runOnlyPendingTimers() // 只运行当前等待在队列里头的定时器(很适合setInterval)
    // jest.advanceTimersByTime(30000) // 快进30000毫秒
  })
  // 但如果异步的花费时间非常长呢？如果setTimeout是1000秒，是否需要静静等待1000秒的时间呢？
  // 因此我们需要加快这个异步的花费时间，从1000秒立马可以等到结果返回，而不是真的去等待1000秒
  // 这种情况下，我们必须要用到另一个工具：TODO:对时间进行Mock
})

describe('promise异步测试', () => {
  test('测试promise的方式获取数据-方法1', (done) => {
    /**
     * TODO:promise的调用方式最简单的测试方式就是跟回调函数一样，加done
     */
    getDataByPromise().then((data) => {
      expect(data).toEqual({ name: 'jaylen' })
      done()
    })
  })

  test('测试promise的方式获取数据-方法2', async () => {
    /**
     * TODO: promise的调用方式另一种测试方式是利用async await
     */
    const data = await getDataByPromise()
    expect(data).toEqual({ name: 'jaylen' })
  })
})
