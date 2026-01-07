import 'cypress-real-events/support'

describe('Brands Link Tests', () => {
  beforeEach(() => {
    cy.visit('https://staging.kitchenwarehouse.com.au/')
  })

  it('should verify brands link exists on homepage and is working correctly', () => {
    // Check if brands link exists on homepage
    cy.get('body').then(($body) => {
      // Look for brands link using various possible selectors
      const brandsLinkSelectors = [
        '[data-link-text="brands"]',
        'a[href*="brands"]',
        'a:contains("Brands")',
        '[href*="/brands"]'
      ]
      
      let brandsLinkFound = false
      let brandsLinkElement = null
      
      // Check each selector to find the brands link
      for (const selector of brandsLinkSelectors) {
        if ($body.find(selector).length > 0) {
          brandsLinkFound = true
          brandsLinkElement = selector
          break
        }
      }
      
      if (brandsLinkFound) {
        cy.log('Brands link found on homepage')
        
        // Verify the link is visible
        cy.get(brandsLinkElement)
          .should('be.visible')
          .should('not.be.disabled')
        
        // Get the href attribute to validate the URL
        cy.get(brandsLinkElement).then(($link) => {
          const href = $link.prop('href')
          cy.log(`Brands link URL: ${href}`)
          
          // Validate that the link has a proper href
          expect(href).to.exist
          expect(href).to.not.be.empty
          
          // Make a request to check if the brands page returns 200 status
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(`Brands page returned status: ${response.status}`)
          })
          
          // Additionally, test navigation by clicking the link
          cy.get(brandsLinkElement).click()
          
          // Verify we're on the brands page
          cy.url().should('include', 'brands')
          
          // Verify the page loaded successfully (check for common page elements)
          cy.get('body').should('be.visible')
          
          // Check that the page title or heading contains "brands" (case insensitive)
          cy.get('h1, h2, title').then(($elements) => {
            const pageText = $elements.text().toLowerCase()
            expect(pageText).to.include('brand')
          })
        })
      } else {
        // If no brands link found, fail the test with informative message
        cy.log('No brands link found on homepage')
        throw new Error('Brands link not found on homepage. Checked selectors: ' + brandsLinkSelectors.join(', '))
      }
    })
  })
})
