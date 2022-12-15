const DriverSingleton = require("../driver/driver-singleton")

class CommonConditions {
	constructor() {
		this.driver = null
		this.username = "ladzislaf@gmail.com"
		this.userPassword = "qwerty0409"
	}

	setUp = () => {
		this.driver = DriverSingleton.getDriver('chrome')
	}

	stopBrowser = () => {
		DriverSingleton.closeDriver()
	}

	getDriver = () => {
		return this.driver
	}
}

module.exports = CommonConditions
