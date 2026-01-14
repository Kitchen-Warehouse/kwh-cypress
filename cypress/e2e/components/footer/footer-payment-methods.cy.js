import { footerHelpers } from './footer-config';

describe('Footer Payment Methods Tests', () => {
  beforeEach(() => {
    footerHelpers.visitPageWithFooter();
  });

  it('should find kwh-footer-wrapper', () => {
    footerHelpers.verifyFooterWrapper();
    cy.wait(3000);
  });

  it('should check if payments section exists within footer wrapper', () => {
    // First verify footer wrapper exists
    footerHelpers.verifyFooterWrapper();
    
    // Check for our-payments-tastic within footer wrapper
    cy.get('.kwh-footer-wrapper').within(() => {
      cy.get('[data-testid="our-payments-tastic"]')
        .should('be.visible');
    });
    cy.wait(3000);
  });

  it('should check if payment icon images exist and are visible', () => {
    // Check for payment icons within our-payments-tastic
    cy.get('[data-testid="our-payments-tastic"]').within(() => {
      cy.get('img[data-testid*="payment-icon"]')
        .should('have.length.at.least', 1)
        .each(($el, index) => {
          cy.wrap($el)
            .should('be.visible')
            .should('have.attr', 'src')
            .and('not.be.empty')
            .then(() => {
              cy.log(`✅ Payment icon ${index + 1} is visible and has src attribute`);
            });
        });
    });
    cy.wait(3000);
  });
});
