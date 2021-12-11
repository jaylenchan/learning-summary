class Singleton {
  constructor(name) {
    this.name = name
  }
  static getInstance() {
    if(!this.instance) {
      this.instance = new Singleton('Singleton')
    }
    return this.instance
  }
}

const singleton1 = Singleton.getInstance()
const singleton2 = Singleton.getInstance()

console.log(singleton1 === singleton2)