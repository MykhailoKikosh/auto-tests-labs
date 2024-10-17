describe('Automate navigation and user registration', () => {
    // Додаємо змінні для статичних даних
    const storeUrl = 'http://demo-store.seleniumacademy.com';
    const productUrl = 'http://demo-store.seleniumacademy.com/chelsea-tee-703.html';
    const firstname = 'John';
    const lastname = 'Doe';
    const email = 'john.doe1@yahoo.com';
    const address = '88 Test st.';
    const city = 'Zaporizhzhia';
    const countryCode = 'UA';
    const postalCode = '69000';
    const phone = '+380612345678';
    const pass = 'Password123';

    it('Navigate through all main menu links', () => {
        // Переходимо на тестовий сайт
        cy.visit(storeUrl);

        // Знаходимо головне меню, переходимо по всім знайденим всередині посиланням
        // force: true використовується для обробки посилань з прихованого меню
        cy.get('.nav-primary li ').each(($el) => {
            cy.wrap($el).click({force: true});
            // Перевіряємо чи сторінка завантажилась
            cy.url().should('include', $el.find('a').attr('href'));
            cy.go('back');
        });
    });

    it('Register a new user', () => {
        cy.visit(storeUrl);
        cy.get('a.skip-link.skip-account').click();
        cy.get('a').contains('Register').click();

        // Заповнення форми реєстрації, підписка на оновлення
        cy.get('#firstname').type(firstname);
        cy.get('#lastname').type(lastname);
        cy.get('#email_address').type(email);
        cy.get('#password').type(pass);
        cy.get('#confirmation').type(pass);
        cy.get('#is_subscribed').check();

        // Підтвердження реєстрації
        cy.get('button[title="Register"]').click();
    });

    it('Configure and Buy mens t-shirt', () => {
        cy.visit(productUrl);
        // Обираємо синій колір
        cy.get('#swatch27').click();
        // Обираємо розмір
        cy.get('#swatch79').click();
        // Додаємо монограму
        cy.get('#options_3_text').type('My Monogram Here');
        // Обираємо кастомізацію
        cy.get('#select_2').select('2');
        // Збільшуємо кількусть
        cy.get('#qty').clear().type('2');
        // Додаємо у корзину
        cy.get('.add-to-cart-buttons .btn-cart').click();
        // На сторінці корзини змінюємо кількість
        cy.get('.product-cart-actions .input-text.qty').clear().type('3');
        cy.get('.product-cart-actions button[type=submit]').click();
        // Переходимо до чекауту
        cy.get('.btn-proceed-checkout').first().click();
        // Перевіряємо чи є на сторінці блок логіну, якщо реєстрація користувача пройшла успішно - його не буде
        // інакше - вводимо логін, пароль, пробуємо залогінитись
        cy.get('#checkout-step-login').then(($loginform) => {
            if ($loginform.is(':visible')) {
                cy.wrap($loginform.find('#login-email')).type(email);
                cy.wrap($loginform.find('#login-password')).type(pass);
                cy.wrap($loginform.find('button[type="submit"]')).click();
            }
        })
        // Знову перевіряємо наявність блоку, на випадок невдалого логіну, обираємо оформлення гостьового замовлення
        cy.get('#checkout-step-login').then(($loginform) => {
            if ($loginform.is(':visible')) {
                // cy.wrap($loginform.find('#login:guest')).click();
                cy.wrap($loginform.find('input[name="checkout_method"]').first()).click();
                cy.wrap($loginform.find('#onepage-guest-register-button')).click();
            }
        });
        // Перевіряємо чи пусте поле, у випадку якщо користувач ввійшов в систему - поле буде мати значення
        // Залишаємо попередньо встановлене значення або вводимо актуальне якщо поле порожнє
        cy.get('#billing\\:firstname').then(($input) => {
            if ($input.val() === '') {
                cy.wrap($input).type(firstname);
            }
        });

        cy.get('#billing\\:lastname').then(($input) => {
            if ($input.val() === '') {
                cy.wrap($input).type(lastname);
            }
        });

        cy.get('#billing\\:email').then(($input) => {
            if ($input.val() === '') {
                cy.wrap($input).type(email);
            }
        });

        // Заповнюємо обов'язкові поля
        cy.get('#billing\\:street1').type(address);
        cy.get('#billing\\:city').type(city);
        cy.get('#billing\\:postcode').type(postalCode);
        cy.get('#billing\\:country_id').select(countryCode);
        cy.get('#billing\\:telephone').type(phone);

        // Підтверджуємо введення даних користувача
        cy.get('#billing-buttons-container button[title="Continue"]').click();
    });
});