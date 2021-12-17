Function.prototype.before = function(beforeFn) {
  const _this = this;
  return function() {
    beforeFn.apply(this, arguments)
    return _this.apply(this, arguments)
  }
}

Function.prototype.after = function(afterFn) {
  const _this = this;
  return function() {
    _this.apply(this, arguments)
    return afterFn.apply(this, arguments)
  }
}


const buy = () => console.log('买东西')
const bus_buy = buy.before(function() { console.log('坐公交') })
const bus_buy_home = bus_buy.after(function() { console.log('回家') })
bus_buy_home()