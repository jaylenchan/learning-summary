const Plant = require('./Plant')
const Factory = require('./Factory')

class Orange extends Plant {
  constructor(name,flavour) {
    super(name)
    this.flavour = flavour
  }
}

class OrangeFactory extends Factory {
  static create(name, flavour) {
    return new Orange(name, flavour)
  }
}

module.exports = OrangeFactory