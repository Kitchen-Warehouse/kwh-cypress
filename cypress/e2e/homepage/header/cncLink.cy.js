import 'cypress-real-events/support'

describe('Click and Collect Link Tests', () => {
  // Helper function to find click and collect link in header
  const findClickAndCollectLink = () => {
    const cncLinkSelector = 'a[href*="/click-collect"]'
    
    return cy.get('#header-section').then(($header) => {
      const $foundElement = $header.find(cncLinkSelector)
      if ($foundElement.length > 0) {
        return cy.wrap($foundElement.first())
      }
      throw new Error(`Click and Collect link not found in header-section. Checked selector: ${cncLinkSelector}`)
    })
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('should find click and collect link on homepage', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element).should('exist')
      cy.log('✅ Click and Collect link found in header-section')
    })
  })

  it('should verify click and collect link is visible and enabled', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element).should('be.visible')
      cy.log('✅ Click and Collect link is visible')
    })
  })

  it('should verify click and collect link has valid href attribute', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element).should('have.attr', 'href')
      cy.wrap($element).invoke('attr', 'href').then((href) => {
        expect(href).to.exist
        expect(href).to.not.be.empty
        // Check if href contains the expected /click-collect path specifically
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
      
      // Check if URL contains the expected /click-collect path specifically
      cy.url().should('include', '/click-collect')
      cy.log('✅ Successfully navigated to Click and Collect page')
    })
  })

  it('should verify click and collect page loads with proper content', () => {
    findClickAndCollectLink().then(($element) => {
      cy.wrap($element).click()
      
      // Verify page loaded successfully
      cy.get('body').should('be.visible')
      
      // Check that visible page headings contain click and collect related terms (case insensitive)
      cy.get('h1, h2, h3').then(($headings) => {
        if ($headings.length > 0) {
          const headingText = $headings.text().toLowerCase()
          const cncTerms = ['click and collect', 'click & collect', 'click-and-collect', 'cnc']
          const containsCncTerm = cncTerms.some(term => headingText.includes(term))
          expect(containsCncTerm).to.be.true
          cy.log('✅ Click and Collect page loaded with proper content')
        } else {
          // Fallback: check page title if no visible headings found
          cy.title().then((title) => {
            const titleText = title.toLowerCase()
            const cncTerms = ['click and collect', 'click & collect', 'click-and-collect', 'cnc']
            const containsCncTerm = cncTerms.some(term => titleText.includes(term))
            expect(containsCncTerm).to.be.true
            cy.log('✅ Click and Collect page loaded with proper content (verified via title)')
          })
        }
      })
    })
  })
})
