class Water {}

class Person {
  public age: number
  public name: string
  /** 类的依赖关系，在代码中的体现就是属性的关系。即一个类实例是另外一个类实例的属性 */
  public water: Water

  public drink(): void {
    console.log('喝水')
  }
  public eat(): void {
    console.log('吃饭')
  }
}

/** 接口是行为的抽象 */
interface IStaff {
  goHome(): void
}

class Staff extends Person implements IStaff {
  public jobNumber: number

  public code(): void {
    console.log('打代码')
  }
  goHome(): void {
    console.log('下班回家')
  }
}
