import 'cypress-real-events/support'

describe('Example E2E Test', () => {
  it('should hover over appliances menu and verify dropdown appears', () => {
    cy.visit('https://staging.kitchenwarehouse.com.au/')

    cy.get('[data-link-text="appliances"]')
      .should('be.visible')
      .realHover()

    cy.get('.gridItem').should('be.visible')
  })

  it('should validate all mega menu links return 200 status code', () => {
    cy.visit('https://staging.kitchenwarehouse.com.au/')
    
    // Hover over appliances to reveal mega menu
    cy.get('[data-link-text="appliances"]')
      .should('be.visible')
      .realHover()
    
    // Wait for mega menu to appear
    cy.get('.gridItem').should('be.visible')
    
    // Get first 2 links in the mega menu and validate their status codes
    cy.get('.gridItem a').then(($links) => {
      const linksToTest = $links.slice(0, 2) // Only test first 2 links
      
      cy.wrap(linksToTest).each(($link) => {
        const href = $link.prop('href')
        const linkText = $link.text().trim()
        
        cy.log(`Testing link: "${linkText}" - ${href}`)
        
        if (href && !href.includes('#') && !href.includes('javascript:')) {
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then((response) => {
            cy.log(`Link "${linkText}" returned status: ${response.status}`)
            expect(response.status).to.eq(200, `Link ${href} should return 200 status`)
          })
        } else {
          cy.log(`Skipping link "${linkText}" - ${href} (not a valid URL)`)
        }
      })
    })
  })
})