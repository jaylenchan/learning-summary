class OffLightState {
  constructor(light) {
    this.light = light;
    this.text = "开灯";
  }
  handleClick() {
    // 点击发生的行为应该是执行下一个状态相关的一切东西的改变，比如当前如果light是关闭状态，那么点击后交给关闭类处理，处理的
    // 过程关闭类要做的事就是将自己的状态切换成下一个状态，比如开启状态，然后状态同时设置成开启状态。
    // 总的来说就一句话，当前状态的click要做的就是将下一状态的所有相关设置出来
    console.log("当前是关灯状态～");
    document.body.style.background = "rgb(216,227,231)";
    document.getElementById(
      "light-button"
    ).innerHTML = this.light.onLightState.text;
    this.light.setState(this.light.onLightState);
  }
}
class OnLightState {
  constructor(light) {
    this.light = light;
    this.text = "关灯";
  }
  handleClick() {
    console.log("当前是开灯状态");
    document.body.style.background = "#000";
    document.getElementById(
      "light-button"
    ).innerHTML = this.light.offLightState.text;
    this.light.setState(this.light.offLightState);
  }
}
class Light {
  constructor() {
    this.offLightState = new OffLightState(this);
    this.onLightState = new OnLightState(this);
    this.currentState = this.offLightState;
    this.button = null;
  }
  init() {
    this.button = this.init_button();
    this.button.onclick = () => {
      this.currentState.handleClick();
    };
  }
  init_button() {
    const button = document.createElement("button");
    button.innerHTML = this.currentState.text;
    button.setAttribute("id", "light-button");
    document.body.append(button);
    return button;
  }

  setState(state) {
    this.currentState = state;
  }
}

const light = new Light();
light.init();
/**
 * 定义一盏灯，灯有灯的当前状态，还有一个开关
 * 将灯的所有灯状态单独封装成类，对于每一个灯状态我们进行单独的对应处理
 * 这盏灯会持有所有的灯状态，同时也会拥有这盏灯的当前状态
 * 每种灯状态本身也会持有这盏灯的引用，想挡雨相互关联，如果灯状态改变了，那么这盏灯当前的灯状态也会相应的改变
 */
