import { fetchData, sum } from './ajax'

// jest.mock('./ajax.js') // TODO: 替换整个文件啦！！所有函数都要被替换成__mocks__文件当中的了

//TODO: mock axios包的方式解决mock整个文件出现的问题，达到只想要mock获取数据的要求
/**
 * TODO: 方法：直接在__mocks__文件下建立axios.js文件，模拟axios返回就好。不需要其他操作
 */
describe('测试能否正常', () => {
  test('fetch data', async () => {
    const data = await fetchData()

    expect(data).toEqual(['张三', '李四'])
  })

  test('sum', () => {
    /**
     * TODO: 当我们mock了一整个文件之后，那么所有的函数测试都会去__mocks__中的同名文件寻找了
     * TODO: 这个时候，我们在文件当中还可能存在一些不需要mock的函数，如果按照现有方式去测试，是会报错的
     */
    /**
     * 第一种解决方式就是：TODO:使用jest.requireActual这个方法去获取真正的sum函数，接着进行测试
     */
    // let { sum } = jest.requireActual('./ajax.js')
    expect(sum(1, 2)).toBe(3)
  })
})
