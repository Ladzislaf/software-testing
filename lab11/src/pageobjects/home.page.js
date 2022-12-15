const BasePage = require('./base.page')

class HomePage extends BasePage {
	constructor(driver) { super(driver) }

	openPage = async () => {
		await this.visit('https://jolybell.com')
	}

	changeCurrencyToUSD = async () => {
		await this.findCss('.header-second-mobile-filter .select.currency-switcher.hoverable').click()
		await this.findXpath('//li[@class="select-list-value" and text()="USD"]').click()
	}
	
	selectCategory = async (category) => {
		switch(category) {
			case 't-shirts': await this.findXpath('//a[@href="/category/t-shirts"]').click()
				break
			case 'sweatshirts': await this.findXpath('//a[@href="/category/sweatshirts"]').click()
				break
			case 'bags': await this.findXpath('//a[@href="/category/bags"]').click()
				break
			default: 
		}
	}

	selectProduct = async (productName) => {
		await this.findXpath(`//button[@class="category-product-name"]/span[text()="${productName}"]/ancestor::button`).click()
	}

	selectRecommendedProduct = async (productName) => {
		await this.findXpath(`//div[@class="product-recs-recommendation-name" and text()="${productName}"]`).click()
	}

	clickAddToCart = async (number) => {
		await this.findXpath(`(//button[@class="product-info-add-to-cart"])[${number}]`).click()
	}

	increaseProductCount = async (count) => {
		while (count > 0) {
			await this.findXpath('//div[@class="icon product-info-count-plus icon__animated"]').click()
			count--
		}
	}

	increaseProductCountFromCart = async (count) => {
		while (count > 0) {
			await this.findXpath('//button[@class="modal__cart-product-count-plus"]/div[@class="icon icon__animated"]').click()
			count--
		}
	}

	// add "родничок"
	addProductToCart = async () => {
		await this.selectCategory('t-shirts')
		await this.selectProduct('Родничок')
		await this.findXpath('//button[@class="product-info-sizes-size" and text()="2XL"]').click()
		await this.increaseProductCount(2)
		await this.findXpath('//button[@class="product-info-add-to-cart"]').click()
		await this.findXpath('//button[@class="modal__cart-continue-shopping"]').click()
	}

	getProductsCostFromCart = async () => {
		let costString = await this.findCss('.header-cart-total-cost').getAttribute('innerHTML')
		return costString.replace(/&nbsp;/g, ' ')
	}
	
	getProductNameFromCart = async () => {
		return await this.findXpath('//span[@class="modal__cart-product-name hoverable"]').getAttribute('innerHTML')
	}

	getProductPreOrder = async () => {
		return await this.findXpath('//p[@class="modal__cart-product-preorder"]').getAttribute('innerHTML')
	}

	getProductCost = async () => {
		return await this.findCss('.product-content .price-current span').getAttribute('innerHTML')
	}

	getProductsCategoryTitle = async () => {
		return await this.findXpath('//h2[@class="category-title"]').getAttribute('innerHTML')
	}

	changeProdSize = async () => {
		await this.findXpath('//button[@class="product-info-sizes-size" and text()="3XL"]').click()
	}

	selectSuit = async () => {
		await this.findXpath('//button[@class="category-product-name"]/span[text()="Ультра Черный Свитшот"]/ancestor::button').click()
	}
}

module.exports = HomePage
