/**
 * 这里头是Vue的核心代码
 */
import initMixin from './init'
const Vue = function(options) {
  this._init(options)
}
// 通过引入文件的形式，给原型添加方法
initMixin(Vue)
export default Vue