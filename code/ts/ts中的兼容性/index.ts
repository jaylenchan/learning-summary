/**
 * 基础类型的兼容性
 * 默认情况下，都是定义好了类型之后，不能再赋值给其他的类型了
 */
namespace Compatible1 {
  type INumStr = string | number
  /** 可以将string类型赋值给string|number类型，即子类型->父类型 */
  const numStr = 'string'
}

/**
 * 检测方式 鸭子检测 只要叫声像鸭子，就是鸭子
 */
namespace Compatible2 {
  type IStr = { toString: () => void }
  /**
   * 字符串类型hello之所以可以赋值给IStr，是因为IStr只是要求可以拥有toString
   * 而hello是一个字符串，完全满足这种要求，于是可以赋值给str
   */
  /** 即多条件的可以赋值给少条件的，包含的关系 */
  const str: IStr = 'hello'
}

/**
 * 当值赋值给类型的时候，是没有兼容性这个说法的。要求就是满足这个接口
 * 而两个接口之间是存在兼容性的问题的
 */
namespace Compatible3 {
  interface IVegetables {
    color: string
    taste: string
  }
  /**
   * 当值赋值给类型的时候，还没有推断出类型的时候是没有兼容性这个说法的。要求就是满足这个接口
   */
  // const tomato: IVegetables = {
  //   color: 'red',
  //   taste: 'sweet'
  //   size: 'big' 不能多加不存在的属性，会报错。原因如上
  // }

  /**
   * 但是两个类型之间是可以有兼容性的
   * vegetable类型是IVegetables
   * tomato1类型是ITomato
   * 多条件是可以赋值给少条件的
   */
  let vegetable: IVegetables
  const tomato = {
    color: 'red',
    taste: 'sweet',
    size: 'big'
  }
  /**
   * 像这样子先声明了vegetable是类型IVegetables后
   * 然后同时对tomato直接赋值后推断出了对应类型
   * 再将tomato赋值给vegetable是可以的
   * 多条件可以赋值给少条件的
   */
  vegetable = tomato
}

/**
 * 函数的兼容性
 * 参数兼容
 * 返回值兼容
 */
namespace Compatible4 {
  /**
   * 参数兼容：声明了多个参数的函数类型，可以用传递少参数的函数赋值上去不会报错
   */
  function forEach<T>(
    arr: T[],
    cb: (item: T, index: number, arr: T[]) => void
  ) {
    for (let index = 0, len = arr.length; index < len; index++) {
      const item = arr[index]
      cb(item, index, arr)
    }
  }

  forEach([1, 2, 3], (item) => console.log(item))

  type ISum1 = (a: string, b: string) => number | string
  type ISum2 = (a: string) => number
  let sum1: ISum1
  let sum2: ISum2
  sum1 = sum2

  type ISum3 = (a: string, b: string) => { age: number }
  type ISum4 = (a: string) => { age: number; name: string }
  let sum3: ISum3
  let sum4: ISum4
  sum3 = sum4

  /**
   * 针对参数的类型做兼容处理
   * 逆变和协变
   * 函数的参数是逆变的，可以返回父类
   * 函数的返回值是协变的，可以返回子类
   * 口诀：传逆父，返协子
   */
  class Father {
    money: string
  }
  class Child extends Father {
    house: string
  }
  class GrandSon extends Child {
    eat: string
  }
  /** 对于参数而言，儿子可以处理钱和房子 */
  function getFunc(cb: (person: Child) => Child) {}
  /** 对于返回值而已，返回的至少要是能有钱和房子的对象，所以至少返回儿子或者孙子 */
  getFunc((person: Father) => new GrandSon())
  /** 传参的时候，可以少条件传给多条件的 */
  /** 返回的时候，可以返回至少包含少条件的东西 */

  /**
   * 当函数的参数是联合类型的时候
   */
  function getType(cb: (val: string | number) => string) {}
  getType((val: string) => '')
}
  