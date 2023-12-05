describe('validate renderings', () => {

  it('should render table vision at first moment', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="layout-title"]').should('exist').should('have.text', 'Simple Registration');
    
    cy.get('[data-testid="register-button"]').should('exist');
  })

  it('should render register form after click New Client button', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="register-button"]').click();

    cy.get('[data-testid="layout-title"]').should('exist').should('have.text', 'Register Customers');

    cy.get('[data-testid="name"]').should('exist')
    cy.get('[data-testid="age"]').should('exist')

  })

  it('should disabled save button when name field is empty', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="register-button"]').click();

    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="name"]').type('{selectall}{backspace}', { force: true });

    cy.get('[data-testid="save-button"]').should('be.disabled');
  });

  it('should enabled save button when name field is not empty - save new user', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="register-button"]').click();

    cy.get('[data-testid="save-button"]').should('be.disabled');

    cy.get('[data-testid="name"]').type('Gustavo Bittencourt');

    cy.get('[data-testid="save-button"]').should('not.be.disabled');

    cy.get('[data-testid="age"]').focus().clear().type('30', { force: true });

    cy.get('[data-testid="save-button"]').click();
  });

})

describe('Validate Actions on Table', () => {

  it('call delete/update function - when users exists', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="delete-button"]').should('exist');
    cy.get('[data-testid="delete-button"]').first().click();
  })

  it('call update function - when users exists', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="edit-button"]').should('exist');
    cy.get('[data-testid="edit-button"]').first().click();

    cy.get('[data-testid="name"]').clear().type('Nome alterado', { force: true });

    cy.get('[data-testid="update-button"]').click();
  })

})

export {}