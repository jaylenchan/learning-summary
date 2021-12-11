describe('Truthiness', () => {
  let n: any
  beforeAll(() => {
    n = null
    console.log('n==>', n)
  })
  test('toBeNull', () => {
    expect(n).toBeNull()
  })
  test('toBeDefined', () => {
    expect(n).toBeDefined()
  })

  test('Not toBeUndefined', () => {
    expect(n).not.toBeUndefined()
  })

  test('Not toBeTruthy', () => {
    expect(n).not.toBeTruthy()
  })

  test('toBeFalsy', () => {
    expect(n).toBeFalsy()
  })
})
