import Counter from './hook'

let counter = null
beforeAll(() => {
  console.log('beforeAll')
  // counter = new Counter()
})

afterAll(() => {
  console.log('afterAll')
})
/** 使用beforeEach去满足我们想要实现所有测试用例的测试都是基于初识值去测试的，而不是会互相影响到 */
beforeEach(() => {
  counter = new Counter()
  console.log('beforeEach')
})

afterEach(() => {
  console.log('afterEach')
})
describe('分组1', () => {
  test('addOne', () => {
    counter.addOne()
    expect(counter.number).toBe(1)
  })

  test('minusOne', () => {
    counter.minusOne()
    expect(counter.number).toBe(-1)
  })
})

describe('分组2', () => {
  test('addTwo', () => {
    counter.addTwo()
    expect(counter.number).toBe(2)
  })

  test('minusTwo', () => {
    counter.minusTwo()
    expect(counter.number).toBe(-2)
  })
})

describe('only只测试一个', () => {
  test.only('only test', () => {
    expect('a').toMatch('a')
  })
})
