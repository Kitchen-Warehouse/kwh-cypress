describe('Blog Highlights Component', () => {
  beforeEach(() => {
    // Log the current base URL for debugging
    cy.log(`🌐 Testing against: ${Cypress.config('baseUrl')}`);
    
    // Check if we're testing a preview URL and handle it appropriately
    const baseUrl = Cypress.config('baseUrl');
    if (baseUrl.includes('deploy-preview') || baseUrl.includes('preview')) {
      cy.log('🔍 Preview URL detected - using enhanced visit with retry');
      
      // For preview URLs, check accessibility first then visit with retry
      cy.checkUrlAccessible(baseUrl).then((accessible) => {
        if (accessible) {
          cy.visitWithRetry('/', { retries: 3, retryDelay: 15000 });
        } else {
          // If preview URL not accessible, wait longer and try again
          cy.log('⏳ Preview URL not ready, waiting 30s before retry...');
          cy.wait(30000);
          cy.visitWithRetry('/', { retries: 2, retryDelay: 20000 });
        }
      });
    } else {
      // For staging/production URLs, use normal visit
      cy.log('🏠 Using standard visit for staging/production URL');
      cy.visit('/', { timeout: 90000 });
    }
    
    // Wait for page to be fully loaded
    cy.get('body').should('be.visible');
    
    // Wait for any loading indicators to disappear (but don't fail if they don't exist)
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="loading"], .loading, .spinner').length > 0) {
        cy.get('[data-testid="loading"], .loading, .spinner', { timeout: 30000 }).should('not.exist');
      }
    });
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
