import { getData, fetchData, fetchError, fetch404 } from './fetch'

describe('done处理异步', () => {
  test('fetch', (done) => {
    getData((res) => {
      expect(res).toEqual({ success: true })
      done()
    })
  })
})

// promise处理的方式记得return
describe('promise处理异步', () => {
  test('then成功情况', () => {
    return fetchData().then((res) => {
      expect(res).toEqual({ success: true })
    })
  })
  test('catch异常情况', () => {
    return fetchError().catch((err) => {
      expect(err).toEqual({ success: false })
    })
  })

  test('结果就是要404', () => {
    expect.assertions(1) // 至少要执行一个assert，then或者catch都行

    return fetch404().catch((err) => {
      expect(err.toString().includes('Error')).toBe(true)
    })
  })
})

describe('resolves和rejects方式处理异步函数', () => {
  test('resolves', () => {
    return expect(fetchData()).resolves.toMatchObject({
      success: true
    })
  })

  test('rejects', () => {
    return expect(fetch404()).rejects.toThrow(/getaddrinfo/)
  })
})

describe('await 处理异步', () => {
  test('await', async () => {
    const res = await fetchData()
    expect(res).toEqual({ success: true })
  })

  test('await catch', async () => {
    expect.assertions(1)
    try {
      await fetch404()
    } catch (err) {
      expect(err.toString()).toEqual('Error: getaddrinfo ENOTFOUND www.baidu.co1')
    }
  })
  test('await resolves', async () => {
    await expect(fetchData()).resolves.toMatchObject({
      success: true
    })
  })

  test('await rejects', async () => {
    await expect(fetch404()).rejects.toThrow(/getaddrinfo/)
  })
})
