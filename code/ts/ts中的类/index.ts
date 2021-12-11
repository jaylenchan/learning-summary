/**
 * 装饰器
 * 作用：扩展类中的属性和方法和类本身
 * 无法扩展函数，是因为函数有变量提升的问题
 * 多个装饰器执行，越近的先执行
 */
namespace Decorator1 {
  function addSay1(val: string) {
    console.log('say1')
    return function (target) {
      console.log(`${val}`)
    }
  }
  function addSay2(val: string) {
    console.log('say2')
    return function (target) {
      console.log(`${val}`)
    }
  }
  function addSay3(val: string) {
    console.log('say3')
    return function (target) {
      console.log(`${val}`)
    }
  }
  @addSay1('return1') /** 洋葱模型 */
  @addSay2('return2')
  @addSay3('return3')
  class Person {}
}

namespace Decorator2 {
  function eat(target) {
    target.prototype.eat = function () {
      console.log('eat')
    }
  }

  @eat
  class Person {
    [x: string]: any
  }
  const person = new Person()
  person.eat()
}

namespace Decorator3 {
  function toUpperCase(target, key) {
    let val = target[key]
    Object.defineProperty(target, key, {
      get() {
        return val.toUpperCase()
      },
      set(newV) {
        val = newV
      }
    })
  }
  function double(num) {
    return function (target, key) {
      let val = target[key]
      Object.defineProperty(target, key, {
        get() {
          return num * val
        }
      })
    }
  }
  function console1(str) {
    return function (target, key, descriptor) {
      const val = target[key]
      descriptor.value = function () {
        console.log('value')
        val()
      }
    }
  }
  function param(target, key, index) {
    console.log('key=>', target[key])
    console.log('index=>', index)
  }
  class Person {
    @toUpperCase
    public name: string = 'csy'
    @double(2)
    static age: number = 18
    @console1('drink method')
    drink() {
      console.log('drink')
    }
    say(@param a) {}
  }
  const person = new Person()
  console.log('person=>', person.name)
  console.log('Person==>', Person.age)
  person.drink()
}

const start = '10:02'
const end = '11:02'