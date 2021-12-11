class Stats {
  constructor(compilation) {
    this.entries = compilation.entries
    this.modules = compilation.modules
  }
  toJson() {
    return JSON.parse(JSON.stringify(this))
  }
}

module.exports = Stats



