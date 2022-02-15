import { map } from 'jquery'
import { mapFn } from './mockFn'

describe('mock fn', () => {
  // 错误写法❌
  // mapFn([1, 2, 3], (item, index) => {
  //   /**
  //    * 现在有个问题：？里头应该填啥，因为我们压根不知道循环到哪个地方了
  //    * 如果不知道，那么我们就很难填写这个地方，测试就没法进行下去了
  //    */
  //   expect(item).toBe('?')
  // })

  test('mock fn解决错误写法', () => {
    // TODO: 为了解决以上的问题，我们需要模拟函数jest.fn
    // 模拟函数可以记录被执行的过程【对比自己传入的原函数是没法记录过程的，因此没法知道写啥内容进去测试】
    let fn = jest.fn()
    mapFn([1, 2, 3], fn)
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(3)
    expect(fn.mock.calls.length).toBe(3)
    expect(fn.mock.calls[0][0]).toBe(1)
    expect(fn.mock.calls[1][0]).toBe(2)
    expect(fn.mock.calls[2][0]).toBe(3)
  })
})
