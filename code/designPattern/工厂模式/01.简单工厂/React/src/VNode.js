class VNode {
  constructor(type, attr, children) {
    this.type = type,
    this.attr = attr,
    this.children = children
  }
}

module.exports = VNode