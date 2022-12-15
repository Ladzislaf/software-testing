const webdriver = require('selenium-webdriver')
const Keys = webdriver.Key
const BasePage = require('./base.page')

class AccountPage extends BasePage {
	constructor(driver) { super(driver) }

	openLoginPage = async () => {
		await this.visit('https://jolybell.com')
		await this.findXpath('//div[@class="icon header-account-icon icon__animated"]').click()
	}
	
	loginUser = async (user) => {
		await this.write('//input[@id="signin-email"]', user.email)
		await this.write('//input[@id="signin-password"]', user.password)
		await this.findXpath('//button[@class="modal__signin-classic-signIn hoverable"]').click()
	}

	toggleChangeMode = async (section) => {
		switch (section) {
			case 'personal-data':
				await this.findXpath('//span[text()="Персональные данные"]/../span[2]').click()
				break
			case 'delivery-address':
					await this.findXpath('//span[text()="Адрес доставки"]/../span[2]').click()
				break
			case 'password':
				await this.findXpath('//span[text()="Пароль"]/../span[2]').click()
				break
			default:
		}
	} 

	getNotificationInfo = async () => {
		return await this.findXpath('//div[@class="notification-inside"]/div/p').getAttribute('innerHTML')
	}
	
	getValueFromInput = async (inputElement) => {
		return await this.findXpath(`//p[text() = "${inputElement}"]/../input`).getAttribute('value')
	}
		
	inputValue = async (inputElement, value) => {
		await this.findXpath(`//p[text() = "${inputElement}"]/../input`).clear()
		await this.write(`//p[text() = "${inputElement}"]/../input`, value)
	}
		
	inputPhoneValue = async (value) => {
		for(let i = 0; i < 20; i++)
			await this.findXpath('//input[@class="form-control booking-page__details-form-item-input"]').sendKeys(Keys.BACK_SPACE)
		await this.write('//input[@class="form-control booking-page__details-form-item-input"]', value)
	}
	
	saveChanges = async () => {
		await this.findXpath('//span[text()="Сохранить изменения"]/..').click()
	}
}

module.exports = AccountPage
