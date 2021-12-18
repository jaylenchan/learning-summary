describe('Async', () => {
  let fetchData: (...args: any[]) => void
  let getData: (status: string) => Promise<any>
  beforeAll(() => {
    fetchData = (cb) => setTimeout(() => cb('data'), 2000)
    getData = (status) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          const status_data = {
            resolve: 'data',
            reject: 'error'
          } as any
          eval(status)(status_data[status])
        }, 2000)
      )
  })
  test('Callbacks - the data is peanut butter', (done) => {
    const cb = (data: string) => {
      try {
        expect(data).toBe('data')
        done()
      } catch (e) {
        done(e)
      }
    }
    fetchData(cb)
  })
  test('Promise Resolve - the data is peanut butter', () => {
    getData('resolve').then((res) => expect(res).toBe('data'))
  })

  // test('Promise Reject- the data is peanut butter', () => {
  //   expect.assertions(1)
  //   getData().catch((err) => expect(err).toMatch(/error/))
  // })

  test('resolves - the data is peanut butter', () => {
    return expect(getData('resolve')).resolves.toBe('data')
  })

  test('rejects - the data is peanut butter', () => {
    return expect(getData('reject')).rejects.toMatch('error')
  })

  test('async success - the data is peanut butter', async () => {
    const data = await getData('resolve')
    expect(data).toBe('data')
  })

  test('async error - the data is peanut butter', async () => {
    try {
      const data = await getData('reject')
      expect(data).toBe('data')
    } catch (e) {
      expect(e).toMatch(/error/)
    }
  })

  test('async success resolves - the data is peanut butter', async () => {
    await expect(getData('resolve')).resolves.toBe('data')
  })

  test('async error rejects - the data is peanut butter', async () => {
    await expect(getData('reject')).rejects.toMatch('error')
  })
})
