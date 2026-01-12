describe('Footer Links Component Tests', () => {
  beforeEach(() => {
    // Visit the homepage or relevant page where footer is present with longer timeout
    cy.visit('https://staging.kitchenwarehouse.com.au/', { timeout: 120000 });
    
    cy.get('body').should('be.visible');
    
    cy.get('.kwh-footer-wrapper', { timeout: 30000 }).should('be.visible');
    cy.get('.kwh-footer-wrapper').scrollIntoView({ duration: 1000 });
    
    cy.wait(1000);
  });

  it('should find kwh-footer-wrapper', () => {
    cy.get('.kwh-footer-wrapper')
      .should('be.visible')
      .then(($el) => {
        $el.css('border', '3px solid black');
        cy.log('✅ kwh-footer-wrapper found and highlighted');
      });
    cy.wait(2000);
  });

  it('should find footer-links-wrapper inside kwh-footer-wrapper', () => {
    cy.get('.kwh-footer-wrapper').within(() => {
      cy.get('[data-testid="footer-links-wrapper"]')
        .should('be.visible')
        .then(($el) => {
          $el.css('border', '3px solid blue');
          cy.log('✅ footer-links-wrapper found inside kwh-footer-wrapper');
        });
    });
    cy.wait(2000);
  });

  it('should find menu-main-text elements', () => {
    cy.get('[data-testid="footer-links-wrapper"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="menu-main-text"]')
          .should('have.length.at.least', 1)
          .each(($mainText, index) => {
            // Highlight the main text element
            cy.wrap($mainText).then(($el) => {
              $el.css('border', '3px solid green');
              cy.log(`✅ Main text ${index + 1}: "${$el.text()}"`);
            });
          });
      });
    cy.wait(2000);
  });

  it('should validate footer submenu links have text', () => {
    cy.get('[data-testid="footer-links-wrapper"]').within(() => {
      cy.get('[data-testid="footer-submenu-link-text"]')
        .should('have.length.at.least', 1)
        .each(($linkText, index) => {
          // Highlight the link text
          cy.wrap($linkText).then(($el) => {
            $el.css('border', '2px solid red');
          });
          
          // Validate text is not empty
          cy.wrap($linkText)
            .should('not.be.empty')
            .then(($el) => {
              cy.log(`✅ Link text ${index + 1}: "${$el.text()}"`);
            });
        });
    });
    cy.wait(2000);
  });

  it('should validate footer submenu links have links', () => {
    cy.get('[data-testid="footer-links-wrapper"]').within(() => {
      cy.get('[data-testid="footer-submenu-link"]')
        .should('have.length.at.least', 1)
        .each(($link, index) => {
          // Highlight the link
          cy.wrap($link).then(($el) => {
            $el.css('border', '3px solid orange');
          });
          
          // Check that link has href attribute
          cy.wrap($link)
            .should('have.attr', 'href')
            .then((href) => {
              cy.log(`✅ Link ${index + 1} has href: "${href}"`);
            });
        });
    });
    cy.wait(2000);
  });

  it('should verify all footer links return 200 status and are working', () => {
    cy.get('[data-testid="footer-links-wrapper"]').within(() => {
      cy.get('[data-testid="footer-submenu-link"]').each(($link, index) => {
        cy.wrap($link).then(($el) => {
          $el.css('border', '3px solid cyan');
        });
        
        const href = $link.prop('href');
        cy.log(`🌐 Testing HTTP status for link ${index + 1}: ${href}`);
        
        cy.request(href).its('status').should('eq', 200).then(() => {
          cy.wrap($link).then(($el) => {
            $el.css('border', '4px solid lime');
          });
          cy.log(`✅ Link ${index + 1} returns 200 - Working correctly`);
        });
      });
    });
    cy.wait(2000);
  });
});
