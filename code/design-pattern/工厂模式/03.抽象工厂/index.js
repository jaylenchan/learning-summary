const WindowsFactory = require('./Factory/WindowsFactory')
const AppleFactory = require('./Factory/AppleFactory')

WindowsFactory.createButton().render()
WindowsFactory.createIcon().render()
AppleFactory.createButton().render()
AppleFactory.createIcon().render()