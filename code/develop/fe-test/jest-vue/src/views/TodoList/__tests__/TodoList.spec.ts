import { mount } from '@vue/test-utils'
import TodoList from '../index.vue'

describe('TodoList.vue', () => {
  test('todolist 初始化时，undolist是一个空数组', () => {
    const wrapper = mount(TodoList)
    const undolist = wrapper.vm.$data.undolist

    expect(undolist.length).toBe(0)
  })

  test('todolist 按下回车后会触发add事件执行addItem， 会增加一个内容', () => {
    const wrapper = mount(TodoList)

    const emitValue = '测试jaylen'
    const header = wrapper.find('.header').getComponent('.header')
    header.vm.$emit('add', emitValue)

    const undolist = wrapper.vm.$data.undolist

    expect(undolist.includes(emitValue)).toBeTruthy()
  })
})
