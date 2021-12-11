//观察者模式 
//观察者模式里头， 被观察者要包含观察者，以便发生变化的时候去通知观察者

// 被观察者
class Subject {
  constructor(name) {
    this.name = name
    this.state = '开心'
    this.observers = []
  }
  attach(observer) {
   this.observers.push(observer)
  }
  setState(newState) {
   this.state= newState
   this.observers.forEach(observer => observer.update(this))
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(baby) {
    console.log(this.name,'知道了',baby.name,baby.state,'了')
  }
}

const baby = new Subject('小宝宝')
const father = new Observer('爸爸')
const mother = new Observer('妈妈')
baby.attach(father)
baby.attach(mother)
baby.setState('伤心')

