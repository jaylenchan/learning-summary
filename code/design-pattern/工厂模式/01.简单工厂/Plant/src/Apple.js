const Plant = require('./Plant.js')

class Apple extends Plant {
  constructor(name, flavour) {
    super(name)
    this.flavour = flavour
  }
}
module.exports = Apple