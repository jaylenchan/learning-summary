import { parse, stringify } from '../index'

describe('utils', () => {
  test('parse', () => {
    expect(parse('https://www.baidu.com?name=jaylen')).toEqual({ name: 'jaylen' })
    expect(parse('https://www.baidu.com')).toEqual({})
    expect(parse('https://www.baidu.com#/parse')).toEqual({})
  })

  test('stringify', () => {
    expect(stringify({ name: 'jaylen', age: 10 })).toEqual('name=jaylen&age=10')
    expect(stringify({ name: 'jaylen' })).toEqual('name=jaylen')
    expect(stringify({})).toEqual({})
  })
})
