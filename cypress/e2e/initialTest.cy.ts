const pagePath = 'http://localhost:3000/';
const layoutTitle = '[data-testid="layout-title"]';
const registerButton = '[data-testid="register-button"]';

describe('validate renderings', () => {

  it('should render table vision at first moment', () => {
    cy.visit(pagePath);
    cy.get(layoutTitle).should('exist').should('have.text', 'Simple Registration');
    
    cy.get(registerButton).should('exist');
  })

  it('should render register form after click New Client button', () => {
    cy.visit(pagePath);

    cy.get(registerButton).click();

    cy.get(layoutTitle).should('exist').should('have.text', 'Register Customers');

    cy.get('[data-testid="name"]').should('exist')
    cy.get('[data-testid="age"]').should('exist')

  })

  it('should disabled save button when name field is empty', () => {
    cy.visit(pagePath);
    cy.get(registerButton).click();

    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="name"]').type('{selectall}{backspace}', { force: true });

    cy.get('[data-testid="save-button"]').should('be.disabled');
  });

  it('should enabled save button when name field is not empty - save new user', () => {
    cy.visit(pagePath);
    cy.get(registerButton).click();

    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="name"]').type('Gustavo Bittencourt');

    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="age"]').focus().clear().type('30', { force: true });

    cy.get('[data-testid="save-button"]').click();
  });

})

describe('Validate Actions on Table', () => {

  it('call delete function - when users exists', () => {
    cy.visit(pagePath);
    cy.get('[data-testid="delete-button"]').should('exist');
    cy.get('[data-testid="delete-button"]').first().click();
  })

  it('call update function - when users exists', () => {
    cy.visit(pagePath);
    cy.get('[data-testid="edit-button"]').should('exist');
    cy.get('[data-testid="edit-button"]').clear().first().click();

    cy.get('[data-testid="name"]').type('Nome alterado', { force: true });

    cy.get('[data-testid="update-button"]').click();
  })

})