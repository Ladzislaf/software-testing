const assert = require('assert')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

it('Displaying the cost of products added to the cart', async () => {
	const driver = await new webdriver.Builder().forBrowser('chrome').build()
	await driver.manage().setTimeouts({ implicit: 5000 })

	try {
		await driver.get('https://jolybell.com')
		// change currency
		await driver.findElement(By.xpath('//*[@id="root"]/div/div/header/div[2]/div[2]/div[1]/div[2]/div[1]/div')).click()
		await driver.findElement(By.xpath('//*[@id="root"]/div/div/header/div[2]/div[2]/div[1]/div[2]/div[2]/ul/li[1]')).click()
		// select menu item with t-shirts
		await driver.findElement(By.xpath('//*[@class="header-menu-item"]/a[text()="Футболки"]')).click()
		// select t-shirt "Rodnichyok"
		await driver.findElement(By.xpath('//*[@id="root"]/div/div/section/div/div/a[1]/button/span[2]')).click()
		// select size
		await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div[1]/div[2]/div[3]/div[2]/div/button[5]')).click()
		// select count
		await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div[1]/div[2]/div[4]/div[2]/button[2]/div')).click()
		await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div[1]/div[2]/div[4]/div[2]/button[2]/div')).click()
	
		// add to cart
		await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div[1]/div[2]/button[3]/span')).click()
		// quit cart
		await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[2]/div/div/div[3]/button/span')).click()
		// cost of products in cart
		let productsCost = await driver.findElement(By.xpath('//*[@id="root"]/div/div/header/div[2]/div[2]/div[3]/div[2]')).getText()

		await assert.equal(productsCost, '91.65 USD')
	} finally {
		await driver.quit()
	}
})
