const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

class DriverSingleton {
	static driver = null

	static getDriver(browser) {
		if (this.driver === null) {
			switch(browser) {
				case 'edge':
				default:
					this.driver = new webdriver.Builder().forBrowser('chrome')
						.setChromeOptions(new chrome.Options().addArguments('--window-size=1920,1080').excludeSwitches('enable-logging'))
						.build()
					break
			}
			this.driver.manage().setTimeouts({ implicit: 60000 })
		}
		return this.driver
	}

	static closeDriver() {
		this.driver.quit()
		this.driver = null
	}
}

module.exports = DriverSingleton
