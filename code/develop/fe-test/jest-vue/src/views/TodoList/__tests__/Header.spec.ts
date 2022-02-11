import { mount } from '@vue/test-utils'
import Header from '../components/Header/index.vue'

describe('Header.vue', () => {
  test('render test', () => {
    const wrapper = mount(Header)
    const input = wrapper.find(`[data-test="input"]`)
    expect(input.exists()).toBe(true)
  })

  test('input 初始值应该为空', () => {
    const wrapper = mount(Header)
    const initialVal = wrapper.vm.$data.inputValue
    expect(initialVal).toBe('')
  })

  test('input data发生变化，数据也需要发生变化', () => {
    const wrapper = mount(Header)
    const input = wrapper.find(`[data-test="input"]`)
    input.setValue('jaylen')
    const inputVal = wrapper.vm.$data.inputValue
    expect(inputVal).toBe('jaylen')
  })

  test('input 直接回车，无内容无反应', () => {
    const wrapper = mount(Header)
    const input = wrapper.find(`[data-test="input"]`)
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })

  test('input 如果有内容，回车向外emit事件', () => {
    const wrapper = mount(Header)
    const input = wrapper.find(`[data-test="input"]`)
    input.setValue('jaylen')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
  })

  test('input 回车之后，数据增加，input清空', () => {
    const wrapper = mount(Header)
    const input = wrapper.find(`[data-test="input"]`)
    input.setValue('jaylen')
    input.trigger('keyup.enter')
    const inputVal = wrapper.vm.$data.inputValue
    expect(inputVal).toBe('')
  })
})
