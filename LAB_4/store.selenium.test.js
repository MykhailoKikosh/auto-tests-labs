const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();

    // Дані користувача
    const storeUrl = 'http://demo-store.seleniumacademy.com';
    const productUrl = 'http://demo-store.seleniumacademy.com/chelsea-tee-703.html';
    const firstname = 'John';
    const lastname = 'Doe';
    const email = 'john.doe2@yahoo.com';
    const address = '88 Test st.';
    const city = 'Zaporizhzhia';
    const country = 'Ukraine';
    const postalCode = '69000';
    const phone = '+380612345678';
    const password = 'Password123';

    try {
        // Навігація по головному меню
        await driver.get(storeUrl);
        let mainMenuLinks = await driver.findElements(By.css('.nav-primary li a'));
        console.log(mainMenuLinks);
        for (let link of mainMenuLinks) {
            let href = link.getAttribute('href');
            await driver.get(href);
            await driver.navigate().back();
        }

        Реєстрація нового користувача
        await driver.get(storeUrl);
        await driver.findElement(By.css('a.skip-link.skip-account')).click();
        await driver.wait(until.elementLocated(By.linkText('Register')), 10000).click();
        await driver.findElement(By.id('firstname')).sendKeys(firstname);
        await driver.findElement(By.id('lastname')).sendKeys(lastname);
        await driver.findElement(By.id('email_address')).sendKeys(email);
        await driver.findElement(By.id('password')).sendKeys(password);
        await driver.findElement(By.id('confirmation')).sendKeys(password);
        await driver.findElement(By.id('is_subscribed')).click();
        await driver.findElement(By.css('button[title="Register"]')).click();

        // Налаштування та купівля футболки для чоловіків
        await driver.get(productUrl);
        await driver.wait(until.elementLocated(By.id('swatch27')), 10000).click();
        await driver.findElement(By.id('swatch79')).click();
        await driver.findElement(By.id('options_3_text')).sendKeys('My Monogram Here');
        await driver.findElement(By.id('select_2 option[value="2"]')).click();
        await driver.findElement(By.id('qty')).clear();
        await driver.findElement(By.id('qty')).sendKeys('2');
        await driver.findElement(By.css('.add-to-cart-buttons .btn-cart')).click();
        await driver.wait(until.elementLocated(By.css('.product-cart-actions .qty')), 10000).clear();
        await driver.findElement(By.css('.product-cart-actions .qty')).sendKeys('3');
        await driver.findElement(By.css('.product-cart-actions button[type=submit]')).click();
        await driver.findElement(By.css('.btn-proceed-checkout')).click();

        // Логін або гостьове замовлення
        try {
            let loginForm = await driver.wait(until.elementLocated(By.id('checkout-step-login')), 10000);
            if (await loginForm.isDisplayed()) {
                await loginForm.findElement(By.id('login-email')).sendKeys(email);
                await loginForm.findElement(By.id('login-password')).sendKeys(password);
                await loginForm.findElement(By.css('button[type="submit"]')).click();
            }
        } catch (error) {
            console.log(error.message);
        }

        // Гостьове замовлення якщо логін не вдався
        try {
            let loginForm = await driver.wait(until.elementLocated(By.id('checkout-step-login')), 10000);
            if (await loginForm.isDisplayed()) {
                await loginForm.findElement(By.css('input[name="checkout_method"]')).click();
                await loginForm.findElement(By.id('onepage-guest-register-button')).click();
            }
        } catch (error) {
            console.log(error.message);
        }

        // Заповнення форми замовлення
        await driver.findElement(By.id('billing:firstname')).sendKeys(firstname);
        await driver.findElement(By.id('billing:lastname')).sendKeys(lastname);
        await driver.findElement(By.id('billing:email')).sendKeys(email);
        await driver.findElement(By.id('billing:street1')).sendKeys(address);
        await driver.findElement(By.id('billing:city')).sendKeys(city);
        await driver.findElement(By.id('billing:postcode')).sendKeys(postalCode);
        await driver.findElement(By.id('billing:phone')).sendKeys(phone);
        await driver.findElement(By.css('#billing:country_id option[value="UA"]')).click();
        await driver.findElement(By.css('#billing-buttons-container button[title="Continue"]')).click();
    } finally {
        await driver.quit();
    }
})();
