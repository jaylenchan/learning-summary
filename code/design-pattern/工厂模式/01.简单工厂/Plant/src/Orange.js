const Plant = require('./Plant.js')

class Orange extends Plant {
  constructor(name, flavour) {
    super(name)
    this.flavour = flavour
  }
}

module.exports = Orange