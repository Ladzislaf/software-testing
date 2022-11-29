const assert = require('assert')
const HomePage = require('../pageobjects/home.page')

let homePage

describe('UI tests for jolybell.com | lab10', () => {	
	beforeEach(() => {
		homePage = new HomePage()
		homePage.visit('https://jolybell.com')
	})

	afterEach(() => {
		if (homePage) homePage.quit()
	})

	it('The cost of added products should be displayed correctly', async () => {
		await homePage.changeCurrencyToUSD()
		await homePage.getCategory('t-shirts')
		await homePage.findXpath('//button[@class="category-product-name"]/span[text()="Родничок"]/ancestor::button').click()
		await homePage.findXpath('//button[@class="product-info-sizes-size" and text()="2XL"]').click()
		await homePage.increaseProductCount(2)
		await homePage.findXpath('//button[@class="product-info-add-to-cart"]').click()
		await homePage.findXpath('//button[@class="modal__cart-continue-shopping"]').click()
		let productsCost = await homePage.getProductsCostFromCart()
		
		// cost can change
		await assert.equal(productsCost, '38.76 USD')
	})

	it('The cost should change if size is changing', async () => {
		await homePage.changeCurrencyToUSD()
		await homePage.getCategory('sweatshirts')
		await homePage.findXpath('//button[@class="category-product-name"]/span[text()="Ультра Черный Свитшот"]/ancestor::button').click()
		let firstSizeCost = await homePage.getProductCost()
		await homePage.findXpath('//button[@class="product-info-sizes-size" and text()="3XL"]').click()
		let lastSizeCost = await homePage.getProductCost()

		assert.notEqual(firstSizeCost, lastSizeCost)
	})
})
