import axios from 'axios'
import { runCallBack, getData } from './mock'

/**
 * 1. 捕获函数的返回结果，this指向改变，调用顺序改变
 * 2. 设置函数的返回结果
 * 3. 改变函数的内部实现
 */

jest.mock('axios')

/**
 * 目前runCallBack是没有任何返回值的，但是如果我们要使用 expect(runCallBack(func)).toBe('hello')尝试去测试
 * 这样子我们就要修改源代码runCallback的定义把函数值返回了，这是违背我们的初衷的
 * 因此，我们必须要想办法去证明runCallBack这个函数的回调参数是会执行的
 */
describe('jest.fn', () => {
  test('证明runCallBack中的cb是调用起来的', () => {
    // const func = () => 'hello' 不自己写了，用jest提供的
    const func = jest.fn()
    runCallBack(func)
    expect(func).toBeCalled()
  })

  test('证明runCallBack中的cb调用3次', () => {
    const func = jest.fn()
    runCallBack(func)
    runCallBack(func)
    runCallBack(func)
    expect(func.mock.calls.length).toBe(3)
  })
})

describe('改变内部函数实现', () => {
  test('测试getData确实调用了', async () => {
    axios.get.mockResolvedValue({ data: 'mock' })
    await getData().then((res) => {
      expect(res).toEqual({
        data: 'mock'
      })
    })
  })
})
