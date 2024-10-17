const { Builder, By, Key, until } = require('selenium-webdriver');
const math = require('mathjs');
const url = 'http://suninjuly.github.io/math.html';
function calc(x) {
    return math.log(Math.abs(12 * Math.sin(x)));
}

(async function automation() {
    // Створення екземпляру драйвера
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Відкрити сторінку
        await driver.get(url);

        // Прочитати значення змінної x
        let xElement = await driver.findElement(By.id('input_value'));
        let x = await xElement.getText();
        // Рахуємо рівняння за допомогою метода реалізованого вище
        let result = calc(x);

        // Ввести відповідь в текстове поле
        await driver.findElement(By.id('answer')).sendKeys(result.toString());
        // Вибрати checkbox "I'm the robot"
        await driver.findElement(By.id('robotCheckbox')).click();
        // Вибрати radiobutton "Robots rule!"
        await driver.findElement(By.id('robotsRule')).click();
        // Натиснути кнопку Submit
        await driver.findElement(By.css('button.btn')).click();
    } finally {
        await driver.quit();
    }
})();
