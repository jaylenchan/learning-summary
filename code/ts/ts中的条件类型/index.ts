/**
 * 满足某个条件给一个类型，不满足给另一个类型
 */
namespace ReturnType1 {
  interface IFish {
    name: string
    type: '鱼'
  }
  interface IBird {
    name: string
    type: '鸟'
  }
  interface ISwimming {
    swimming: string
  }
  interface ISky {
    sky: string
  }
  type IMethod<T> = T extends IBird ? ISky : ISwimming
  type IEnv = IMethod<IBird>
  /**
   * 如果传入的是一个联合类型，会进行条件分发
   * 分发的意思就是分别用联合类型的每一个类型去执行 T extends IBird ? ISky : ISwimming
   * 得到的两个类型结果，然后联合起来成为一个新的联合类型
   * 注意：如果使用交叉类型，是没有条件分发的，比如IMethod<IFish & IBird>
   */
  type IEnv1 = IMethod<IFish | IBird>
}

/**
 * 如果用户传递了name属性，就必须有age类型
 * 其他情况下用户可以只传递age
 */
namespace ReturnType2 {
  interface ISchool1 {
    name: string
    age: number
  }
  interface ISchool2 {
    age?: number
    size: string
  }
  type ISchool<T> = T extends { name: string } ? ISchool1 : ISchool2
  type IMySchool = ISchool<ISchool1>
  const school: IMySchool = {
    name: 'chenshiyan',
    age: 10
  }
  const createSchool = <T>(school: ISchool<T>) => {
    console.log(school)
  }
  const school1 = {
    name: 'chenshiyan'
  }
  const school2 = createSchool<typeof school1>({
    name: 'chenshiyan',
    age: 10
  })
}

/**
 * TS中内置类型包含条件的情况
 * 我想在一类类型里头排除掉某个类型
 */
namespace ReturnType3 {
  /**
   * 从string | number的联合类型中排除掉number类型，剩余string类型
   * MyExclude就是string类型
   */
  type MyExclude = Exclude<string | number, number>
  /**
   * 实现Exclude
   * 利用分发不断判断 T 是不是 U类型，如果是返回never就可以将类型置空
   */
  type Exclude1<T, U> = T extends U ? never : T
  type MyExclude1 = Exclude1<string | number, number>
}

/**
 * 我想在一类类型中拿几个想要的类型
 */
namespace ReturnType4 {
  type MyExtract = Extract<string | number, number>
  /**
   * 实现Extract
   */
  type Extract1<T, U> = T extends U ? T : never
  type MyExtract1 = Extract1<string | number, number>
}

/**
 * 我想在一类包含null的类型集合中把null或者undefined排除掉
 */
namespace ReturnType5 {
  type MyNonNullable = NonNullable<string | number | null | undefined>
  /**
   * 实现NonNullable
   */
  type NonNullable1<T> = T extends null | undefined ? never : T
  type MyNonNullable1 = NonNullable1<string | number | null | undefined>
}

/**
 * infer推断类型
 */
namespace ReturnType6 {
  /**
   * 直接获取函数的返回值类型
   */
  function getSchool(name: string, age: number) {
    return {
      name: 'csy',
      age: 12
    }
  }
  /**
   * 以下这样获取可以，但是很麻烦，不符合实际需求，我们想直接从函数声明推断出返回值类型
   */
  // const r = getSchool()
  // type t = typeof r
  type schoolType = ReturnType<typeof getSchool>
  /**
   * 实现ReturnType
   * infer 需要配合 extends一起使用，否则没法使用
   */
  type ReturnType1<T extends (...args: any[]) => any> = T extends (
    ...args: any[]
  ) => infer R
    ? R
    : any

  type schoolType1 = ReturnType1<typeof getSchool>

  /**
   * 获取函数的参数类型
   */
  type schoolParams = Parameters<typeof getSchool>
  /**
   * 实现Parameters
   */
  type Parameters1<T extends (...args: any[]) => any> = T extends (
    ...args: infer R
  ) => any
    ? R
    : any
  type schoolParams1 = Parameters1<typeof getSchool>
}

namespace ReturnType7 {
  class Person {
    constructor(name: string) {}
  }
  type personParams = ConstructorParameters<typeof Person>
  /**
   * 实现ConstructorParameters
   */
  type ConstructorParameters1<T extends new (...args: any[]) => any> = T extends new (
    ...args: infer R
  ) => any
    ? R
    : any
  type personParams1 = ConstructorParameters1<typeof Person>
}
