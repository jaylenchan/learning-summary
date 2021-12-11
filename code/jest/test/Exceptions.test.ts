describe('Exceptions', () => {
  let throwError: (...args: any[]) => void
  beforeAll(() => {
    throwError = () => {
      throw new Error('throw Error')
    }
  })
  test('call Function goes as expected', () => {
    expect(throwError).toThrow()
    expect(throwError).toThrow('throw Error')
  })
})
