import { footerHelpers } from './footer-config';

describe('Footer Social Links Component Tests', () => {
  beforeEach(() => {
    footerHelpers.visitPageWithFooter();
  });

  it('should find kwh-footer-wrapper', () => {
    cy.get('.kwh-footer-wrapper', { timeout: 10000 }).should('be.visible');
    footerHelpers.verifyFooterWrapper();
    cy.wait(3000);
  });

  it('should find social-links-wrapper inside kwh-footer-wrapper', () => {
    cy.get('.kwh-footer-wrapper').within(() => {
      cy.get('[data-testid="social-links-wrapper"]', { timeout: 10000 })
        .should('be.visible')
        .then(($el) => {
          $el.css('border', '3px solid blue');
        });
    });
    cy.wait(3000);
  });

  it('should validate social links structure and attributes', () => {
    cy.get('[data-testid="social-links-wrapper"]').within(() => {
      cy.get('[data-testid^="social-link-"]')
        .should('have.length.at.least', 1)
        .each(($link, index) => {
          cy.wrap($link).then(($el) => {
            $el.css('border', '3px solid green');
          });
          
          cy.wrap($link)
            .should('have.attr', 'href')
            .and('not.be.empty');
          
          cy.wrap($link)
            .should('have.attr', 'target', '_blank');
        });
    });
    cy.wait(3000);
  });

  it('should verify all social links have visible SVG icons', () => {
    cy.get('[data-testid^="social-link-"]').each(($link, index) => {
      cy.wrap($link).then(($el) => {
        $el.css('border', '3px solid orange');
      });
      
      cy.wrap($link).within(() => {
        cy.get('svg')
          .should('exist')
          .should('be.visible')
          .then(($svg) => {
            $svg.css('border', '2px solid red');
          });
      });
    });
    cy.wait(3000);
  });

  it('should verify social links have valid URLs', () => {
    cy.get('[data-testid^="social-link-"]').each(($link, index) => {
      cy.wrap($link).then(($el) => {
        $el.css('border', '3px solid cyan');
      });
      
      const href = $link.prop('href');
      
      // Check if URL is valid and contains expected social media domains
      expect(href).to.be.a('string');
      expect(href).to.not.be.empty;
      expect(href).to.match(/https?:\/\/.+/); // Valid URL format
      
      // Check for common social media domains
      const socialDomains = ['facebook.com', 'instagram.com', 'twitter.com', 'tiktok.com', 'linkedin.com', 'youtube.com', 'pinterest.com'];
      const isValidSocialLink = socialDomains.some(domain => href.includes(domain));
      expect(isValidSocialLink, `URL should contain a valid social media domain: ${href}`).to.be.true;
      
      cy.wrap($link).then(($el) => {
        $el.css('border', '4px solid lime');
      });
    });
    cy.wait(3000);
  });

  it('should verify social links have proper target attributes for new tabs', () => {
    cy.get('[data-testid^="social-link-"]').each(($link, index) => {
      cy.wrap($link).then(($el) => {
        $el.css('border', '4px solid magenta');
      });
      
      cy.wrap($link)
        .should('be.visible')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'href')
        .and('not.be.empty');
      
      cy.wrap($link).then(($el) => {
        $el.css('border', '4px solid gold');
      });
    });
    cy.wait(3000);
  });
});
