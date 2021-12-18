describe('Numbers', () => {
  let value: number
  beforeAll(() => {
    value = 2 + 2
    console.log('value=>', value)
  })
  test('toBeGreaterThan', () => {
    expect(value).toBeGreaterThan(3)
  })
  test('toBeGreaterThanOrEqual', () => {
    expect(value).toBeGreaterThanOrEqual(4)
  })

  test('toBeLessThan', () => {
    expect(value).toBeLessThan(5)
  })

  test('toBeLessThanOrEqual', () => {
    expect(value).toBeLessThanOrEqual(4)
  })

  test('toBe', () => {
    expect(value).toBe(4)
  })
  test('toEqual', () => {
    expect(value).toEqual(4)
  })
})
