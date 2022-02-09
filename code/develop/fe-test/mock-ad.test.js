jest.mock('./mock-ad')

import { getData } from './mock-ad'

/**
 * 有时候我们想要的是，一个模块的异步函数我们就模拟
 * 是同步函数的话我们就直接使用真实的函数测试，这时候就需要用到requireActual这个函数
 */
const { getNumber } = jest.requireActual('./mock-ad')

/**
 * 自我感觉mock实现fetchData的意义在于，有一个函数里头是有一段代码需要异步获取的
 * 但是我们只关心其他代码，不关心这个异步获取的代码的执行情况，所以我们可以通过这个mock
 * 去绕过这个执行，然后快速测试这个函数里头的其他代码
 */
describe('', () => {
  test('getData', async () => {
    const res = await getData()
    expect(res).toEqual({
      data: 'mock'
    })
  })

  test('getNumber', () => {
    expect(getNumber()).toBe(123)
  })
})
