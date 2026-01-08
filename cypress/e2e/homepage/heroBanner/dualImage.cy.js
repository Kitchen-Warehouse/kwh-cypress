describe('Dual Image Tests', () => {
  beforeEach(() => {
    cy.visit('https://staging.kitchenwarehouse.com.au/')
  })

  it('should find dualImage element', () => {
    cy.get('.dualImage').should('exist')
  })

  it('should show dualImage when it exists', () => {
    cy.get('.dualImage').should('be.visible')
  })

  it('should have a working link that returns 200 status when dualImage has one', () => {
    cy.get('.dualImage').first().then($el => {
      // Check if there's a link inside dualImage
      if ($el.find('a').length > 0) {
        cy.get('.dualImage a').first()
          .should('have.attr', 'href')
          .and('not.be.empty')
        
        cy.get('.dualImage a').first().invoke('attr', 'href').then(href => {
          // Test status code
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(200)
          })
          
          // Test navigation
          cy.get('.dualImage a').first().click()
          cy.url().should('include', href)
        })
      }
      // Check if dualImage is wrapped in a link
      else if ($el.parent('a').length > 0) {
        cy.get('.dualImage').first().parent('a')
          .should('have.attr', 'href')
          .and('not.be.empty')
        
        cy.get('.dualImage').first().parent('a').invoke('attr', 'href').then(href => {
          // Test status code
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(200)
          })
          
          // Test navigation
          cy.get('.dualImage').first().parent('a').click()
          cy.url().should('include', href)
        })
      }
    })
  })
})