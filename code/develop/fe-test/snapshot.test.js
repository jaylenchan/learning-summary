import { genConfig, genConfig1, genConfigWithTime } from './snapshot'

/**
 * 快照测试的一个应用场景是：配置文件的更改测试。比如一个函数会生成一个配置文件
 */
describe('', () => {
  test('', () => {
    expect(genConfig()).toMatchSnapshot()
  })

  test('', () => {
    expect(genConfig1()).toMatchSnapshot()
  })

  test('', () => {
    expect(genConfigWithTime()).toMatchSnapshot({
      time: expect.any(Date)
    })
  })

  test('行内的snapshot', () => {
    expect(genConfigWithTime()).toMatchInlineSnapshot(
      {
        time: expect.any(Date)
      },
      `
      Object {
        "time": Any<Date>,
      }
    `
    )
  })
})
