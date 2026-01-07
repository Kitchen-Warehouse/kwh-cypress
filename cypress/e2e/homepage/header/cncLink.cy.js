import 'cypress-real-events/support'

describe('Click and Collect Link Tests', () => {
  // Helper function to find click and collect link in header
  const findClickAndCollectLink = () => {
    const cncLinkSelectors = [
      '[data-link-text="click and collect"]',
      '[data-link-text="click-and-collect"]',
      'a[href*="/click-collect"]',
      'a[href*="click-and-collect"]',
      'a[href*="click_and_collect"]',
      'a:contains("Click and Collect")',
      'a:contains("Click & Collect")',
      '[href*="/cnc"]'
    ]
    
    return cy.get('#header-section').then(($header) => {
      for (const selector of cncLinkSelectors) {
        const $foundElement = $header.find(selector)
        if ($foundElement.length > 0) {
          return cy.wrap($foundElement.first())
        }
      }
      throw new Error('Click and Collect link not found in header-section. Checked selectors: ' + cncLinkSelectors.join(', '))
    })
  }

  beforeEach(() => {
    cy.visit('https://staging.kitchenwarehouse.com.au/')
  })

  it('should find click and collect link on homepage', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element).should('exist')
      cy.log('✅ Click and Collect link found in header-section')
    })
  })

  it('should verify click and collect link is visible and enabled', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element)
        .should('be.visible')
        .should('not.be.disabled')
      cy.log('✅ Click and Collect link is visible and enabled')
    })
  })

  it('should verify click and collect link has valid href attribute', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element).should('have.attr', 'href')
      cy.wrap($element).invoke('attr', 'href').then((href) => {
        expect(href).to.exist
        expect(href).to.not.be.empty
        // Check if href contains the expected /click-collect path
        expect(href.toLowerCase()).to.include('/click-collect')
        cy.log(`✅ Click and Collect link has valid href: ${href}`)
      })
    })
  })

  it('should verify click and collect page returns 200 status code', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element).invoke('attr', 'href').then((href) => {
        cy.request({
          url: href,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200)
          cy.log(`✅ Click and Collect page returns status: ${response.status}`)
        })
      })
    })
  })

  it('should successfully navigate to click and collect page when clicked', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element).click()
      
      // Check if URL contains the expected /click-collect path
      cy.url().should('include', '/click-collect')
      cy.log('✅ Successfully navigated to Click and Collect page')
    })
  })

  it('should verify click and collect page loads with proper content', () => {
    findClickAndCollectLink().then((selector) => {
      cy.get(selector).click()
      
      // Verify page loaded successfully
      cy.get('body').should('be.visible').and('not.be.empty')
      
      // Check that the page title or heading contains click and collect related terms (case insensitive)
      cy.get('h1, h2, h3, title').then(($elements) => {
        const pageText = $elements.text().toLowerCase()
        const cncTerms = ['click and collect', 'click & collect', 'click-and-collect', 'cnc']
        const containsCncTerm = cncTerms.some(term => pageText.includes(term))
        expect(containsCncTerm).to.be.true
        cy.log('✅ Click and Collect page loaded with proper content')
      })
    })
  })
})
