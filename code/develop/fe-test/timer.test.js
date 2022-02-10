import timer, { advanceTimersByTime } from './timer'

/**
 * 有的时候，异步函数中的对于timer类型，我们去按照异步函数测试的方式去写可以获得正确的结果
 * 但是呢，当我们进行测试的时候，这个timer很可能时间很长
 * 我们只关心的是异步测试的结果，对于这种很长时间的异步测试，我们就需要想办法缩减timer的定时长度
 * 让timer快速流走，赶紧获得我们的结果
 */
beforeEach(() => {
  // 每一个测试用例都去使用一次假timer，不会互相影响
  jest.useFakeTimers() // 告诉jest，当代码碰到settimeout这种定时timer的时候，用假的去模拟
})
describe('timer', () => {
  test('test timer toHaveBeenCalledTimes', () => {
    const fn = jest.fn()
    // timer(() => {
    //   expect(1).toBe(1)
    //   done()
    // })
    timer(fn)
    jest.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('advanceTimersByTime', () => {
    const fn = jest.fn()
    timer(fn)
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
