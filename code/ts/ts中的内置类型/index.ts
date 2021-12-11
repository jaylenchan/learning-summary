/**
 * 把必填的变成可选
 */
namespace BuiltInType1 {
  interface ICompany {
    name: string
    address: string
  }
  interface IPerson {
    name: string
    age: number
    company: ICompany
  }
  type IMyPerson = Partial<IPerson>
  /**
   * 实现Partial
   * 不过这种可选的是单层的，意思是如果里头还有对象就没法实现里头也可选，除非定义的时候递归
   */
  type Partial1<T> = {
    [K in keyof T]?: T[K]
  }
  type IMyPerson1 = Partial1<IPerson>
}

/**
 * 把可选的变成必填
 */
namespace BuiltInType2 {
  interface ICompany {
    name: string
    address: string
  }
  interface IPerson {
    name?: string
    age?: number
    company?: ICompany
  }
  type IMyPerson = Required<IPerson>
  /**
   * 实现Required
   */
  type Required1<T> = {
    [K in keyof T]-?: T[K]
  }
  type IMyPerson1 = Required1<IPerson>
}

/**
 * 把整个对象的所有属性变成只读属性
 */
namespace BuiltInType3 {
  interface IPerson {
    name: string
    age: number
  }
  type IMyPerson = Readonly<IPerson>
  /**
   * 实现Readlony
   */
  type Readonly1<T> = {
    readonly [K in keyof T]: T[K]
  }
  type IMyPerson1 = Readonly1<IPerson>
}

/**
 * 从对象的所有属性类型中选一个出来用
 */
namespace BuiltInType4 {
  interface IPerson {
    name: string
    age: number
    state: number
  }
  type IName = Pick<IPerson, 'name'>
  /**
   * 实现Pick
   */
  type Pick1<T, K extends keyof T> = {
    [R in K]: T[R]
  }
  type IName1 = Pick1<IPerson, 'name'>
}

/**
 * 忽略掉某些属性取出剩余属性 - Omit跟Pick相反
 */
namespace BuiltInType5 {
  interface IPerson {
    name: string
    age: number
    state: number
  }
  type IOmitName = Omit<IPerson, 'name'>
  /**
   * 实现Omit
   */
  type Omit1<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  type IOmitName1 = Omit1<IPerson, 'name'>
}

/**
 * 标识一个对象类型的Record
 */
namespace BuiltInType6 {}



