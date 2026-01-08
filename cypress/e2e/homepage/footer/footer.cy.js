describe('Footer Tests', () => {
  beforeEach(() => {
    cy.visit('https://staging.kitchenwarehouse.com.au/');
  });

  it('should have footer element', () => {
    cy.get('.kwh-footer').should('exist').should('be.visible');
  });

  it('should test footer links', () => {
    cy.get('.kwh-footer a').each(($link, index) => {
      const href = $link.attr('href');
      const linkText = $link.text().trim();
      const linkInfo = `Link #${index + 1}: "${linkText}" (href: "${href}")`;
      
      // Check href exists and is not empty
      expect(href, `${linkInfo} - href is empty or missing`).to.not.be.empty;
      
      // Test link returns acceptable status codes
      if (href && (href.startsWith('/') || href.startsWith('http'))) {
        // Skip links that open in new tab (typically external links that may block automated requests)
        const opensInNewTab = $link.attr('target') === '_blank';
        
        if (opensInNewTab) {
          cy.log(`${linkInfo} - Skipping external link validation (opens in new tab, may block automated requests)`);
        } else {
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then((response) => {
            // Accept 200-399 status codes as successful (includes redirects)
            expect(response.status, `${linkInfo} - returned status ${response.status} (expected 200-399)`).to.be.within(200, 399);
          });
        }
      }
    });
  });

  it('should test footer form', () => {
    // Check form elements exist
    cy.get('.kwh-footer form').should('be.visible');
    cy.get('.kwh-footer form input').should('be.visible');
    cy.get('.kwh-footer form button').should('be.visible');
    
    // Test input functionality
    cy.get('.kwh-footer form input').type('test@example.com');
    cy.get('.kwh-footer form input').should('have.value', 'test@example.com');
    
    // Test button is clickable
    cy.get('.kwh-footer form button').should('not.be.disabled').click();
  });

  it('should test footer images', () => {
    // Check images container exists
    cy.get('.kwh-footer div.flex.flex-col.gap-10.pb-6.pt-10.md\\:pt-0').should('be.visible');
    
    // Test images are visible and have sources
    cy.get('.kwh-footer div.flex.flex-col.gap-10.pb-6.pt-10.md\\:pt-0 img').each(($img) => {
      cy.wrap($img).should('be.visible').should('have.attr', 'src').and('not.be.empty');
    });
  });
});