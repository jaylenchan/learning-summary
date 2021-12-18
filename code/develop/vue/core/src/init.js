import { initState } from './state.js'
const initMixin = (Vue) => {
  Vue.prototype._init = (options) => {
     // 数据劫持
     const vm = this
     vm.$options = options //vue中使用this.$options指代的就是用户传递的属性
    // 初始化状态
     initState(vm) 
  }
}

export { initMixin }