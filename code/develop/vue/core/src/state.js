import { observe } from './observer/index.js'
export function initState(vm) {
  const options = vm.$options;
  if (options.props) initProps(vm);
  if (options.methods) initMethods(vm);
  if (options.data) initData(vm);
  if (options.computed) initComputed(vm);
  if (options.watch) initWatch(vm);
}

const initProps = function (vm) {};

const initMethods = function (vm) {};

const initData = function (vm) {
  // 获取到vm中配置项中的data
  const getData = () => {
    let data = vm.$options.data;
    return typeof data === "function" ? data.call(vm) : data; //加上call是为了如果data是函数能在里头写this时候指向就是VM
  };
  const data = getData()
  // 挂载data到vue实例上
  const add_data_to_vm = () => {
    vm._data = data
  }
  add_data_to_vm()
  // 对象劫持：用户改变数据就可以得到通知，然后就可以刷新页面 -MVVM模式
  observe(data) // 利用Object.defineProperty给属性增加get和set访问器.这个就是响应式原理
};

const initComputed = function (vm) {};

const initWatch = function (vm) {};
