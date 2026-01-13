import { footerHelpers } from './footer-config';

describe('Footer Newsletter Functionality Tests', () => {
  beforeEach(() => {
    footerHelpers.visitPageWithFooter();
  });

  it('should call newsletter API successfully with valid email', () => {
    cy.intercept('POST', '**/action/account/newsLetterSignup', {
      statusCode: 200,
      body: { success: true, message: 'Successfully subscribed to newsletter' }
    }).as('newsletterSignup');

    cy.get('[data-testid="newsletter-email-input"]')
      .clear()
      .type('test@example.com')
      .then(($el) => {
        $el.css('border', '3px solid green');
      });

    cy.get('[data-testid="newsletter-submit-button"]')
      .click()
      .then(($el) => {
        $el.css('border', '3px solid orange');
      });

    cy.wait('@newsletterSignup', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.request.method).to.equal('POST');
      expect(interception.request.url).to.include('newsLetterSignup');
    });
    cy.wait(2000);
  });

  it('should handle API failure properly', () => {
    cy.intercept('POST', '**/action/account/newsLetterSignup', {
      statusCode: 500,
      body: { success: false, message: 'Newsletter signup failed' }
    }).as('newsletterSignupError');

    cy.get('[data-testid="newsletter-email-input"]')
      .clear()
      .type('test@example.com')
      .then(($el) => {
        $el.css('border', '3px solid yellow');
      });

    cy.get('[data-testid="newsletter-submit-button"]')
      .click()
      .then(($el) => {
        $el.css('border', '3px solid purple');
      });

    cy.wait('@newsletterSignupError', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(500);
      expect(interception.request.method).to.equal('POST');
      expect(interception.request.url).to.include('newsLetterSignup');
    });
    cy.wait(2000);
  });

  it('should show validation error for invalid email format and prevent API call', () => {
    cy.intercept('POST', '**/action/account/newsLetterSignup', {
      statusCode: 200,
      body: { success: true }
    }).as('newsletterAPI');

    cy.get('[data-testid="newsletter-email-input"]')
      .clear()
      .type('invalid-email')
      .then(($el) => {
        $el.css('border', '3px solid red');
      });

    cy.get('[data-testid="newsletter-submit-button"]')
      .click()
      .then(($el) => {
        $el.css('border', '3px solid purple');
      });

    cy.get('[data-testid="newsletter-email-input"]')
      .should('have.attr', 'type', 'email')
      .then(($input) => {
        const input = $input[0];
        expect(input.validity.valid).to.be.false;
        expect(input.validationMessage).to.not.be.empty;
        $input.css('border', '3px solid crimson');
      });

    cy.get('@newsletterAPI.all').then((interceptions) => {
      expect(interceptions).to.have.length(0);
    });
    cy.wait(2000);
  });
});