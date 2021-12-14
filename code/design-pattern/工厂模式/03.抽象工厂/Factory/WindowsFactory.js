const Factory = require('./Factory')
const WindowsButton  = require('../Button/WindowsButton')
const WindowsIcon = require('../Icon/WindowsIcon')

class WindowsFactory extends Factory {
  static createButton() {
    return new WindowsButton()
  }
  static createIcon() {
    return new WindowsIcon()
  }
}

module.exports = WindowsFactory