// 练习未开始
class NotStarted {
  constructor(simulation, simulation_status_tile, simulation_status_notification) {
    this.SIMULATION = simulation
    this.SIMULATION_STATUS_TITLE = simulation_status_tile
    this.SIMULATION_STATUS_NOTIFICATION = simulation_status_notification
  }
}

// 练习进行中
class OnGoing {
  constructor(simulation) {
    this.SIMULATION = simulation
  }
} 

// 练习已结束 
class Complete {
  constructor(simulation) {
    this.SIMULATION = simulation
  }
}

// 模拟练习
class Simulation {
  constructor() {
     this.NOTSTARTED = new NotStarted(this)
     this.ONGOING = new OnGoing(this)
     this.COMPLETE = new Complete(this)
     this.curState = null
  }
  initPage() {
    const simulation_info = getSimulationInfo()
    this.curState.setCard(simulation_info)
  }
  setState(newState) {
    this.curState = newState
  }
}