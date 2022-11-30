const BasePage = require('./base.page')

class HomePage extends BasePage {
	changeCurrencyToUSD = async () => {
		await this.findCss('.header-second-mobile-filter .select.currency-switcher.hoverable').click()
		await this.findXpath('//li[@class="select-list-value" and text()="USD"]').click()
	}

	getCategory = async (category) => {
		switch(category) {
			case 't-shirts': await this.findXpath('//a[@href="/category/t-shirts"]').click()
				break;
			case 'sweatshirts': await this.findXpath('//a[@href="/category/sweatshirts"]').click()
				break;
			default: 
		}
	}

	increaseProductCount = async (count) => {
		while (count > 0) {
			await this.findXpath('//div[@class="icon product-info-count-plus icon__animated"]').click()
			count--
		}
	}

	getProductsCostFromCart = async () => {
		return await this.findCss('.header-cart-total-cost').getAttribute('innerHTML')
	}

	getProductCost = async () => {
		return await this.findCss('.product-content .price-current span').getAttribute('innerHTML')
	}

}

module.exports = HomePage
