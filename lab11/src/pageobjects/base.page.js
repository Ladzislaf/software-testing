const webdriver = require('selenium-webdriver')
const By = webdriver.By

class BasePage {
	constructor(driver) {
		this.driver = driver
	}

	visit = async (url) => {
		await this.driver.get(url)
	}

	findXpath = (element) => {
		return this.driver.findElement(By.xpath(element))
	}

	findCss = (element) => {
		return this.driver.findElement(By.css(element))
	}

	findAll = (elements) => {
		return this.driver.findElements(By.xpath(elements))
	}

	write = (element, txt) => {
		return this.findXpath(element).sendKeys(txt)
	}
}

module.exports = BasePage
