const assert = require('assert')
const HomePage = require('../pageobjects/home.page')
const CommonConditions = require('./common')
const User = require('../model/user')
const AccountPage = require('../pageobjects/account.page')

const comCon = new CommonConditions()

describe('UI tests for jolybell.com | lab11', () => {
	beforeEach(() => {
		comCon.setUp()
	})

	afterEach(() => {
		comCon.stopBrowser()
	})

	it('The cost of added products should be displayed correctly', async () => {
		const homePage = new HomePage(comCon.getDriver())
		await homePage.openPage()
		await homePage.changeCurrencyToUSD()
		await homePage.addProductToCart()
		let productsCost = await homePage.getProductsCostFromCart()
		assert.equal(productsCost, '77.52 USD')
	})

	it('Modal window should work correctly', async () => {
		const homePage = new HomePage(comCon.getDriver())
		await homePage.openPage()
		await homePage.selectCategory('bags')
		await homePage.selectProduct('JOLY.BAG')
		await homePage.selectRecommendedProduct('JOLY.FOLIO')
		await homePage.clickAddToCart(2)
		let productName = await homePage.getProductNameFromCart()
		assert.equal(productName, 'JOLY.FOLIO')
	})

	it('Pre order info should display correctly', async () => {
		const homePage = new HomePage(comCon.getDriver())
		await homePage.openPage()
		await homePage.selectCategory('sweatshirts')
		await homePage.selectProduct('Ультра Черный Свитшот')
		await homePage.increaseProductCount(10)
		await homePage.clickAddToCart(1)
		await comCon.driver.sleep(3000)
		await homePage.increaseProductCountFromCart(1)
		await comCon.driver.sleep(3000)
		let info = await homePage.getProductPreOrder()
		assert.equal(info, 'Предзаказ')
	})
 
	it('Bottom category buttons should work correctly', async () => {
		const homePage = new HomePage(comCon.getDriver())
		await homePage.openPage()
		await homePage.findXpath('//li[@class="footer-menu-item"]/a[@href="/category/hoodies"]').click()
		let category = await homePage.getProductsCategoryTitle()
		assert.equal(category, 'Худи')
	})

	it('Hidden categories should display correct products', async () => {
		const homePage = new HomePage(comCon.getDriver())
		await homePage.openPage()
		await homePage.findXpath('//div[@class="dropdown-input"]').click()
		await homePage.findXpath('//li[text() = "Мемы"]').click()
		let category = await homePage.getProductsCategoryTitle()
		assert.equal(category, 'Мемы')
	})

	it('The cost should change if size is changing', async () => {
		const homePage = new HomePage(comCon.getDriver())
		await homePage.openPage()
		await homePage.changeCurrencyToUSD()
		await homePage.selectCategory('sweatshirts')
		await homePage.selectSuit()
		let firstSizeCost = await homePage.getProductCost()
		await homePage.changeProdSize()
		let lastSizeCost = await homePage.getProductCost()

		assert.notEqual(firstSizeCost, lastSizeCost)
	})

	it('The city field have to be a string', async () => {
		const user = new User(comCon.username, comCon.userPassword)
		const accountPage = new AccountPage(comCon.getDriver())
		await accountPage.openLoginPage()
		await accountPage.loginUser(user)
		await accountPage.toggleChangeMode('delivery-address')
		await accountPage.inputValue('Город', '   ')
		await accountPage.saveChanges()
		let notification = await accountPage.getNotificationInfo()
		assert.equal(notification, 'Поле Город должно быть строкой.')
	})

	it('The index field have to be a string', async () => {
		const user = new User(comCon.username, comCon.userPassword)
		const accountPage = new AccountPage(comCon.getDriver())
		await accountPage.openLoginPage()
		await accountPage.loginUser(user)
		await accountPage.toggleChangeMode('delivery-address')
		await accountPage.inputValue('Почтовый индекс', '   ')
		await accountPage.saveChanges()
		let notification = await accountPage.getNotificationInfo()
		assert.equal(notification, 'Поле Индекс должно быть строкой.')
	})

	it('Undo changes should work correctly', async () => {
		const user = new User(comCon.username, comCon.userPassword)
		const accountPage = new AccountPage(comCon.getDriver())
		await accountPage.openLoginPage()
		await accountPage.loginUser(user)
		await accountPage.toggleChangeMode('personal-data')
		let beforeValue = await accountPage.getValueFromInput('Имя')
		await accountPage.inputValue('Имя', 'бла-бла-бла')
		await accountPage.toggleChangeMode('personal-data')
		await accountPage.toggleChangeMode('personal-data')
		let afterValue = await accountPage.getValueFromInput('Имя')
		assert.equal(beforeValue, afterValue)
	})

	it('Incorrect number should not work', async () => {
		const user = new User(comCon.username, comCon.userPassword)
		const accountPage = new AccountPage(comCon.getDriver())
		await accountPage.openLoginPage()
		await accountPage.loginUser(user)
		await accountPage.toggleChangeMode('personal-data')
		await accountPage.inputPhoneValue('111111111111111')
		await accountPage.saveChanges()
		let notification = await accountPage.getNotificationInfo()
		assert.equal(notification, 'Пожалуйста введите корректный номер телефона')
	})
})
