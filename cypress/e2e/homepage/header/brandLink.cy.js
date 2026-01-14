import 'cypress-real-events/support'

describe('Brands Link Tests', () => {

  beforeEach(() => {
    // Use baseUrl from config, which can be overridden by environment variable
    cy.visit('/', { failOnStatusCode: false })
    
    // Check if we got an authentication error
    cy.get('body').then(($body) => {
      if ($body.text().includes('401') || $body.text().includes('Unauthorized')) {
        cy.log('❌ Preview URL requires authentication or has expired')
        throw new Error('Preview URL is not accessible - may need authentication or has expired')
      }
    })
  })

  // Helper function to find brands link
  const findBrandsLink = () => {
    const brandsLinkSelectors = [
      '[data-link-text="brands"]',
      'a[href*="brands"]',
      'a:contains("Brands")',
      '[href*="/brands"]'
    ]
    
    for (const selector of brandsLinkSelectors) {
      if (Cypress.$('body').find(selector).length > 0) {
        return cy.get(selector)
      }
    }
    
    throw new Error('Brands link not found on homepage. Checked selectors: ' + brandsLinkSelectors.join(', '))
  }

  it('should find brands link on homepage', () => {
    findBrandsLink().should('exist')
    cy.log('✅ Brands link found on homepage')
  })

  it('should verify brands link is visible and enabled', () => {
    findBrandsLink()
      .should('be.visible')
      .should('not.be.disabled')
    cy.log('✅ Brands link is visible and enabled')
  })

  it('should verify brands link has valid href attribute', () => {
    findBrandsLink().should('have.attr', 'href')
    findBrandsLink().invoke('attr', 'href').then((href) => {
      expect(href).to.exist
      expect(href).to.not.be.empty
      expect(href).to.include('brand')
      cy.log(`✅ Brands link has valid href: ${href}`)
    })
  })

  it('should verify brands page returns 200 status code', () => {
    findBrandsLink().invoke('attr', 'href').then((href) => {
      // Construct absolute URL if href is relative
      let fullUrl = href
      if (!href.startsWith('http')) {
        // Use baseUrl from config or fallback to current origin
        const baseUrl = Cypress.config('baseUrl') || window.location.origin
        fullUrl = href.startsWith('/') ? `${baseUrl}${href}` : `${baseUrl}/${href}`
      }
      
      cy.request({
        url: fullUrl,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.log(`✅ Brands page returns status: ${response.status}`)
      })
    })
  })

  it('should successfully navigate to brands page when clicked', () => {
    findBrandsLink().click()
    cy.url().should('include', 'brands')
    cy.log('✅ Successfully navigated to brands page')
  })

  it('should verify brands page loads with proper content', () => {
    findBrandsLink().click()
    
    // Verify URL has changed to brands page
    cy.url().should('include', 'brands')
    
    // Verify page has loaded by checking for common page elements
    cy.get('body').should('be.visible')
    cy.get('main, .main-content, #main, [role="main"]').should('exist')
    
    // Check that the page title or heading contains "brands" (case insensitive)
    cy.get('h1, h2, title').then(($elements) => {
      const pageText = $elements.text().toLowerCase()
      expect(pageText).to.include('brand')
      cy.log('✅ Brands page loaded with proper content')
    })
  })
})
