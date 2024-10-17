describe('Automate math task', () => {
  it('Solves the equation and submits the form', () => {
    // Відкрити сторінку
    cy.visit('http://suninjuly.github.io/math.html');

    // Прочитати значення змінної x
    cy.get('#input_value').then($x => {
      const x = $x.text();
      const result = Math.log(Math.abs(12 * Math.sin(x)));

      // Ввести відповідь в текстове поле
      cy.get('#answer').type(result.toString());

      // Вибрати checkbox "I'm the robot"
      cy.get('#robotCheckbox').check();

      // Вибрати radiobutton "Robots rule!"
      cy.get('#robotsRule').check();

      // Натиснути кнопку Submit
      cy.get('button[type="submit"]').click();
    });
  });
});
