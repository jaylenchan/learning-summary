const Plant = require('./Plant')
const Factory = require('./Factory')

class Apple extends Plant {
  constructor(name,flavour) {
    super(name)
    this.flavour = flavour
  }
}

class AppleFactory extends Factory {
  static create(name, flavour) {
    return new Apple(name, flavour)
  }
}

module.exports = AppleFactory