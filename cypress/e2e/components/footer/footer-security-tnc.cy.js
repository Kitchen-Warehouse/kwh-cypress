import { footerHelpers } from './footer-config';

describe('Footer Security & Terms/Conditions Links', () => {
  beforeEach(() => {
    footerHelpers.visitPageWithFooter();
  });

  it('should find kwh-footer-wrapper', () => {
    footerHelpers.verifyFooterWrapper();
    cy.wait(3000);
  });

  it('should verify security and privacy link exists and is a link tag', () => {
    cy.get('.kwh-footer-wrapper').within(() => {
      cy.get('[data-link-text="security and privacy"]')
        .should('be.visible')
        .then(($el) => {
          expect($el[0].tagName.toLowerCase()).to.equal('a');
          $el.css('border', '3px solid green');
        });
    });
    cy.wait(3000);
  });

  it('should verify security and privacy link works and returns 200 status', () => {
    cy.get('[data-link-text="security and privacy"]')
      .should('have.attr', 'href')
      .then((href) => {
        cy.request({
          url: href,
          followRedirect: true,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
    cy.wait(3000);
  });

  it('should verify terms and conditions link exists and is a link tag', () => {
    cy.get('.kwh-footer-wrapper').within(() => {
      cy.get('[data-link-text="terms and conditions"]')
        .should('be.visible')
        .then(($el) => {
          expect($el[0].tagName.toLowerCase()).to.equal('a');
          $el.css('border', '3px solid purple');
        });
    });
    cy.wait(3000);
  });

  it('should verify terms and conditions link works and returns 200 status', () => {
    cy.get('[data-link-text="terms and conditions"]')
      .should('have.attr', 'href')
      .then((href) => {
        cy.request({
          url: href,
          followRedirect: true,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
    cy.wait(3000);
  });
});
