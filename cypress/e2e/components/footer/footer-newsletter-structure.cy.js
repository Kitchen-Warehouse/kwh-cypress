import { footerHelpers } from './footer-config';

describe('Footer Newsletter Structure Tests', () => {
  beforeEach(() => {
    footerHelpers.visitPageWithFooter();
  });

  it('should find kwh-footer-wrapper', () => {
    footerHelpers.verifyFooterWrapper();
    cy.wait(2000);
  });

  it('should check if footer-newsletter is available', () => {
    cy.get('[data-testid="footer-newsletter"]')
      .should('be.visible')
      .then(($el) => {
        $el.css('border', '3px solid blue');
      });
    cy.wait(2000);
  });

  it('should check if newsletter-form exists inside footer-newsletter', () => {
    cy.get('[data-testid="footer-newsletter"]').within(() => {
      cy.get('form[data-testid="newsletter-form"]')
        .should('be.visible')
        .then(($el) => {
          $el.css('border', '3px solid green');
        });
    });
    cy.wait(2000);
  });

  it('should check if newsletter-email-input exists inside newsletter-form', () => {
    cy.get('[data-testid="newsletter-form"]').within(() => {
      cy.get('input[data-testid="newsletter-email-input"]')
        .should('be.visible')
        .then(($el) => {
          $el.css('border', '3px solid red');
        });
    });
    cy.wait(2000);
  });

  it('should check if newsletter-submit-button exists', () => {
    cy.get('[data-testid="newsletter-submit-button"]')
      .should('be.visible')
      .then(($el) => {
        $el.css('border', '3px solid orange');
      });
    cy.wait(2000);
  });
});