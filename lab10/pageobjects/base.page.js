const webdriver = require('selenium-webdriver')
const By = webdriver.By
const chrome = require('selenium-webdriver/chrome')

let driver

class BasePage {
	constructor() {
		//driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--disable-extensions')).build()
		driver = new webdriver.Builder().forBrowser('chrome')
			.setChromeOptions(new chrome.Options().addArguments('--window-size=1920,1080').excludeSwitches('enable-logging')/* .headless() */)
			.build()
		driver.manage().setTimeouts({ implicit: 60000 })
		this.driver = driver
	}

	visit = (url) => {
		return this.driver.get(url)
	}

	findXpath = (element) => {
		return this.driver.findElement(By.xpath(element))
	}

	findCss = (element) => {
		return this.driver.findElement(By.css(element))
	}
	
	quit = () => {
		return this.driver.quit()
	}

	findAll = (elements) => {
		return this.driver.findElements(By.xpath(elements))
	}

	write = (element, txt) => {
		return this.findCss(element).sendKeys(txt)
	}
}

module.exports = BasePage
