describe('Blog Highlights Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the blog highlights section', () => {
    cy.get('.blogHighlights', { timeout: 50000 }).should('be.visible');
  });

  it('should have P tag with Typography classes and content', () => {
    cy.get('.blogHighlights', { timeout: 50000 }).within(() => {
      cy.get('p[class*="Typography_body_MD"][class*="Typography_semibold_weight"]').then(($p) => {
        if ($p.length) {
          cy.wrap($p).should('not.be.empty');
        }
      });
    });
  });

  it('should have frontastic-markdown with Typography display content', () => {
    cy.get('.blogHighlights', { timeout: 50000 }).within(() => {
      cy.get('.frontastic-markdown [class*="Typography_display_MD"]').then(($elem) => {
        if ($elem.length) {
          cy.wrap($elem).should('not.be.empty');
        }
      });
    });
  });

  it('should have a valid image in the first swiper slide', () => {
    cy.get('.blogHighlights .swiper-slide', { timeout: 50000 }).first().within(() => {
      cy.get('img').should('be.visible').and('have.attr', 'src').then((src) => {
        cy.get('img').should(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
      });
    });
  });

  it('should have blog text wrapper with semibold span content', () => {
    cy.get('.blogHighlights .swiper-slide', { timeout: 50000 }).first().within(() => {
      cy.get('.blogTextWrapper').within(() => {
        cy.get('span[class*="Typography_body_MD"][class*="Typography_semibold_weight"][class*="pb-2"]').then(($span) => {
          if ($span.length) {
            cy.wrap($span).should('not.be.empty');
          }
        });
      });
    });
  });

  it('should have blog heading with content', () => {
    cy.get('.blogHighlights .swiper-slide', { timeout: 50000 }).first().within(() => {
      cy.get('.blogTextWrapper').within(() => {
        cy.get('.blogHeading').then(($heading) => {
          if ($heading.length) {
            cy.wrap($heading).should('not.be.empty');
          }
        });
      });
    });
  });

  it('should have body text span with content', () => {
    cy.get('.blogHighlights .swiper-slide', { timeout: 50000 }).first().within(() => {
      cy.get('.blogTextWrapper').within(() => {
        cy.get('span[class*="Typography_body_MD"]:not([class*="Typography_semibold_weight"])').then(($span) => {
          if ($span.length) {
            cy.wrap($span).should('not.be.empty');
          }
        });
      });
    });
  });

  it('should have a valid link with working URL', () => {
    cy.get('.blogHighlights .swiper-slide', { timeout: 50000 }).first().within(() => {
      cy.get('.blogTextWrapper').within(() => {
        cy.get('a[href]').then(($link) => {
          if ($link.length) {
            cy.wrap($link).should('not.be.empty').and('have.attr', 'href').then((href) => {
              cy.request({ url: href, failOnStatusCode: false }).then((response) => {
                expect(response.status).to.eq(200);
              });
            });
          }
        });
      });
    });
  });
});
