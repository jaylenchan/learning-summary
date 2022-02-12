import { mount } from '@vue/test-utils'
import UndoList from '../components/UndoList/index.vue'

describe('Header.vue', () => {
  test('test render', () => {
    const wrapper = mount(UndoList, {
      props: { list: [] }
    })

    const countElem = wrapper.find('.count')

    const listItems = wrapper.find('.item')

    expect(countElem.text()).toBe('0')
  })
})
