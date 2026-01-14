// Base configuration and helpers for Footer tests
export const FOOTER_CONFIG = {
  testUrl: 'https://staging.kitchenwarehouse.com.au/',
  defaultTimeout: 30000,
  scrollDuration: 1000,
  waitTime: 1000,
};

// Common Footer helpers
export const footerHelpers = {
  visitPageWithFooter(url = FOOTER_CONFIG.testUrl) {
    cy.visit(url, { timeout: 120000 });
    cy.get('body', { timeout: FOOTER_CONFIG.defaultTimeout }).should('be.visible');
    cy.get('.kwh-footer-wrapper', { timeout: FOOTER_CONFIG.defaultTimeout }).should('be.visible');
    cy.get('.kwh-footer-wrapper').scrollIntoView({ duration: FOOTER_CONFIG.scrollDuration });
    cy.wait(FOOTER_CONFIG.waitTime);
  },

  // Verify footer wrapper exists and highlight it
  verifyFooterWrapper(borderColor = 'black') {
    cy.get('.kwh-footer-wrapper')
      .should('be.visible')
      .then(($el) => {
        $el.css('border', `3px solid ${borderColor}`);
        cy.log('✅ kwh-footer-wrapper found and highlighted');
      });
  },
};