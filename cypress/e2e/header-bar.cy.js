import 'cypress-real-events/support'

describe('Brands Link Tests', () => {

  beforeEach(() => {
    cy.visit('https://staging.kitchenwarehouse.com.au/')
  })

  // Helper function to find brands link
  const findBrandsLink = () => {
    const brandsLinkSelectors = [
      '[data-link-text="brands"]',
      'a[href*="brands"]',
      'a:contains("Brands")',
      '[href*="/brands"]'
    ]
    
    return cy.get('body').then(($body) => {
      for (const selector of brandsLinkSelectors) {
        if ($body.find(selector).length > 0) {
          return cy.wrap(selector)
        }
      }
      throw new Error('Brands link not found on homepage. Checked selectors: ' + brandsLinkSelectors.join(', '))
    })
  }

  it('should find brands link on homepage', () => {
    findBrandsLink().then((selector) => {
      cy.get(selector).should('exist')
      cy.log('✅ Brands link found on homepage')
    })
  })

  it('should verify brands link is visible and enabled', () => {
    findBrandsLink().then((selector) => {
      cy.get(selector)
        .should('be.visible')
        .should('not.be.disabled')
      cy.log('✅ Brands link is visible and enabled')
    })
  })

  it('should verify brands link has valid href attribute', () => {
    findBrandsLink().then((selector) => {
      cy.get(selector).should('have.attr', 'href')
      cy.get(selector).invoke('attr', 'href').then((href) => {
        expect(href).to.exist
        expect(href).to.not.be.empty
        expect(href).to.include('brand')
        cy.log(`✅ Brands link has valid href: ${href}`)
      })
    })
  })

  it('should verify brands page returns 200 status code', () => {
    findBrandsLink().then((selector) => {
      cy.get(selector).invoke('attr', 'href').then((href) => {
        cy.request({
          url: href,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200)
          cy.log(`✅ Brands page returns status: ${response.status}`)
        })
      })
    })
  })

  it('should successfully navigate to brands page when clicked', () => {
    findBrandsLink().then((selector) => {
      cy.get(selector).click()
      cy.url().should('include', 'brands')
      cy.log('✅ Successfully navigated to brands page')
    })
  })

  it('should verify brands page loads with proper content', () => {
    findBrandsLink().then((selector) => {
      cy.get(selector).click()
      
      // Verify page loaded successfully
      cy.get('body').should('be.visible').and('not.be.empty')
      
      // Check that the page title or heading contains "brands" (case insensitive)
      cy.get('h1, h2, title').then(($elements) => {
        const pageText = $elements.text().toLowerCase()
        expect(pageText).to.include('brand')
        cy.log('✅ Brands page loaded with proper content')
      })
    })
  })
})
