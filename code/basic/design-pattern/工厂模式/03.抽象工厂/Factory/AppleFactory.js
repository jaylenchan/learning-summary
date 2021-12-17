const Factory = require('./Factory')
const AppleButton  = require('../Button/AppleButton')
const AppleIcon = require('../Icon/AppleIcon')

class AppleFactory extends Factory {
  static createButton() {
    return new AppleButton()
  }
  static createIcon() {
    return new AppleIcon()
  }
}

module.exports = AppleFactory