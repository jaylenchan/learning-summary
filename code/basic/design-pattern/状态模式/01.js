class Light {
  constructor() {
    this.state = false;
    this.button = null;
  }
  init() {
    const button = document.createElement("button");
    button.innerHTML = this.state === false ? '开灯' : '关灯'
    this.button = button;
    button.setAttribute('id', 'light-button')
    document.body.append(this.button);
    this.button.onclick = () => {
      this.buttonWasPressed();
    };
  }
  buttonWasPressed() {
    if (this.state === true) {
      console.log("关灯啦")
      this.state = false;
      document.getElementById('light-button').innerHTML = this.state === false ? '开灯' : '关灯'
      document.body.style.background = '#000'
      
    }else{
      console.log("开灯啦");
      this.state = true;
      document.getElementById('light-button').innerHTML = this.state === false ? '开灯' : '关灯'
    }
  }
}

const light = new Light()
light.init()