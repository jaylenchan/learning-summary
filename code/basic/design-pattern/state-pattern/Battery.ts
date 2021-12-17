namespace normal {
  class Battery {
    public amount: string
    constructor() {
      this.amount = 'high'
    }
    show() {
      if (this.amount === 'high') {
        console.log('显示绿色')
        this.amount = 'middle'
      } else if (this.amount === 'middle') {
        console.log('显示黄色')
        this.amount = 'low'
      } else if (this.amount === 'low') {
        console.log('显示红色')
        this.amount = 'off'
      }
    }
  }
  const battery = new Battery()
  battery.show()
  battery.show()
  battery.show()
}

namespace statePattern {
  class HighState {
    show() {
      console.log('显示绿色')
    }
  }
  class MiddleState {
    show() {
      console.log('显示黄色')
    }
  }
  class LowState {
    show() {
      console.log('显示红色')
    }
  }

  class Battery {
    public amount: string
    public state: HighState | MiddleState | LowState
    constructor() {
      this.amount = 'high'
      this.state = new HighState()
    }
    show() {
      this.state.show()
      if (this.amount === 'high') {
        this.amount = 'middle'
        this.state = new MiddleState()
      } else if (this.amount === 'middle') {
        this.amount = 'low'
        this.state = new LowState()
      }
    }
  }

  const battery = new Battery()
  battery.show()
  battery.show()
  battery.show()
}
