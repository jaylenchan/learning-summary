// 一个test函数叫做一个测试用例
describe('相等相关匹配器', () => {
  test('toBe匹配器', () => {
    const num = 10
    expect(num).toBe(10)
  })

  test('toEqual匹配器', () => {
    const obj = {
      name: 'csy'
    }
    expect(obj).toEqual({
      name: 'csy'
    })
  })
})

describe('存在相关匹配器', () => {
  test('toBeNull', () => {
    const nil = null
    expect(nil).toBeNull()
  })

  test('toBeUndefined', () => {
    const undef = undefined
    expect(undef).toBeUndefined()
  })

  test('toBeDefined', () => {
    const def = 1
    expect(def).toBeDefined()
  })
})

describe('真假相关匹配器', () => {
  test('toBeTruthy', () => {
    const bool = true
    expect(bool).toBeTruthy()
  })

  test('toBeFalsy', () => {
    const bool = false
    expect(bool).toBeFalsy()
  })

  test('no toBeTruty', () => {
    const bool = false
    expect(bool).not.toBeTruthy()
  })

  test('no toBeFalsy', () => {
    const bool = true
    expect(bool).not.toBeFalsy()
  })
})

describe('数字相关匹配器', () => {
  test('toBeGreaterThan', () => {
    const count = 10
    expect(count).toBeGreaterThan(9)
  })

  test('toBeLessThan', () => {
    const count = 10
    expect(count).toBeLessThan(11)
  })

  test('toBeGreaterThanOrEqual', () => {
    const count = 10
    expect(count).toBeGreaterThanOrEqual(10)
  })

  test('toBeLessThanOrEqual', () => {
    const count = 10
    expect(count).toBeLessThanOrEqual(11)
  })

  test('toBeCloseTo', () => {
    const num1 = 0.1
    const num2 = 0.2
    expect(num1 + num2).toBeCloseTo(0.3)
  })
})

describe('字符串相关匹配器', () => {
  test('toMatch', () => {
    const str = 'https://wisdom.100efly.com'
    expect(str).toMatch('wisdom')
  })
})

// 主要是Array和Set
describe('集合相关匹配器', () => {
  test('toContain', () => {
    const arr = [1, 2, 3]
    expect(arr).toContain(1)
  })
})

describe('异常相关匹配器', () => {
  test('toThrow', () => {
    const throwError = () => {
      throw new Error('error')
    }
    expect(throwError).toThrow('error')
  })
})
