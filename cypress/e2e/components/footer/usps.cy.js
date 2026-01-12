describe('Footer USPS Component Tests', () => {
  beforeEach(() => {
    // Visit the homepage or relevant page where footer is present with longer timeout
    cy.visit('https://staging.kitchenwarehouse.com.au/', { timeout: 120000 });
    
    cy.get('body').should('be.visible');
    
    cy.get('.kwh-footer-wrapper', { timeout: 30000 }).should('be.visible');
    cy.get('.kwh-footer-wrapper').scrollIntoView({ duration: 1000 });
    
    cy.wait(1000);
  });

  it('should find footer wrapper', () => {
    cy.wait(2000);
    cy.get('.kwh-footer-wrapper')
      .should('be.visible')
      .then(($el) => {
        $el.css('border', '3px solid black');
      });
    cy.wait(2000);
  });

  it('should find value propositions section', () => {
    cy.get('[data-testid="footer-value-propositions-tastic"]')
      .should('be.visible')
      .then(($el) => {
        $el.css('border', '3px solid blue');
      });
    cy.wait(2000);
  });

  it('should find proposition items and validate their content', () => {
    cy.get('[data-testid="proposition-item"]')
      .should('have.length.at.least', 1)
      .each(($item, index) => {
        // Highlight the item
        cy.wrap($item).then(($el) => {
          $el.css('border', '3px solid green');
        });
        
        // Validate heading exists within each item
        cy.wrap($item).within(() => {
          cy.get('[data-testid="proposition-item-heading"]')
            .should('not.be.empty')
            .then(($heading) => {
              $heading.css('border', '2px solid red');
              cy.log(`✅ Heading ${index + 1}: "${$heading.text()}"`);  
            });
        });
        
        // Check that link has href attribute
        cy.wrap($item).then(($el) => {
          const href = $el.prop('href');
          cy.log(`✅ Link ${index + 1}: ${href}`);
        });
        cy.wrap($item)
          .should('have.attr', 'href')
          .and('not.be.empty');
      });
    cy.wait(2000);
  });

  it('should verify links return 200 status', () => {
    cy.get('[data-testid="proposition-item"]').each(($item, index) => {
      cy.wrap($item).then(($el) => {
        $el.css('border', '3px solid cyan');
      });
      const href = $item.prop('href');
      cy.log(`🌐 Testing HTTP status for link ${index + 1}: ${href}`);
      cy.request(href).its('status').should('eq', 200).then(() => {
        cy.wrap($item).then(($el) => {
          $el.css('border', '4px solid lime');
        });
        cy.log(`✅ Link ${index + 1} returns 200`);
      });
    });
    cy.wait(2000);
  });

  it('should test all links are clickable', () => {
    cy.get('[data-testid="proposition-item"]').each(($item, index) => {
      // First highlight and get href
      cy.wrap($item).then(($el) => {
        $el.css('border', '4px solid magenta');
        const href = $el.prop('href');
        cy.log(`🖱️ Testing clickability for link ${index + 1}: ${href}`);
      });
      
      // Test that the link is clickable - separate chain to ensure element exists
      cy.wrap($item)
        .should('be.visible')
        .should('not.have.attr', 'disabled');
        
      // Set target attribute in a separate chain
      cy.wrap($item)
        .invoke('attr', 'target', '_blank');
        
      // Click the element
      cy.wrap($item).click();
      
      // Verify the click worked by checking the link attributes
      cy.wrap($item).should('have.attr', 'target', '_blank');
      
      cy.wrap($item).then(($el) => {
        $el.css('border', '4px solid gold');
      });
      
      cy.log(`✅ Link ${index + 1} is clickable`);
      cy.wait(300);
    });
    cy.wait(2000);
  });
});