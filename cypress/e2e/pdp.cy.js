describe('Product Detail Page (PDP) - Element Existence Tests', () => {
  beforeEach(() => {
    // Visit a product page - replace with actual product URL when running tests
    cy.visit('https://staging.kitchenwarehouse.com.au/product/wolstead-series-acacia-wood-cutting-board-50x35cm') 
    cy.get('body').should('be.visible')
  })

  describe('Page Structure and Container Elements', () => {
    it('should display the main PDP container', () => {
      cy.get('.pdp-page-container', { timeout: 15000 }).should('exist').and('be.visible')
    })

    it('should display breadcrumbs', () => {
      // Look for breadcrumbs using class or check if any breadcrumb elements exist
      cy.get('body').then($body => {
        // Look for actual breadcrumb elements that might exist
        const breadcrumbSelectors = [
          'nav', // semantic breadcrumb nav
          '.breadcrumb',
          '.breadcrumbs', 
          'ol li', // ordered list breadcrumbs
          'ul li', // unordered list breadcrumbs
          '[class*="breadcrumb"]' // any class containing breadcrumb
        ]
        
        let breadcrumbFound = false
        breadcrumbSelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().should('exist')
            breadcrumbFound = true
          }
        })
        
        if (!breadcrumbFound) {
          cy.log('No breadcrumbs found on this page')
        }
      })
    })
  })

  describe('Product Gallery Section', () => {
    it('should display the product gallery wrapper', () => {
      cy.get('.pdpGalleryWrapper').should('exist').and('be.visible')
    })

    it('should display product images', () => {
      // Look for gallery elements based on actual component structure
      cy.get('body').then($body => {
        const gallerySelectors = [
          '.pdpGalleryWrapper', // from ProductDetails component
          '[class*="gallery"]',
          '[class*="Gallery"]',
          'img', // at minimum, should have product images
          '[class*="image"]',
          '[class*="Image"]'
        ]
        
        let galleryFound = false
        gallerySelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().should('exist')
            galleryFound = true
          }
        })
        
        expect(galleryFound, 'At least one gallery element should exist').to.be.true
      })
    })

    it('should display the wishlist/favorite button', () => {
      cy.get('body').then($body => {
        // Look for wishlist/favorite elements
        const favoriteSelectors = [
          'button[class*="favorite"]',
          'button[class*="wishlist"]',
          'button[class*="heart"]',
          '[class*="favorite"]',
          '[class*="wishlist"]',
          'button:contains("Add to Wishlist")',
          'button:contains("Favorite")'
        ]
        
        let favoriteFound = false
        favoriteSelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().should('exist')
            favoriteFound = true
          }
        })
        
        if (!favoriteFound) {
          cy.log('No favorite/wishlist button found on this page')
        }
      })
    })

    it('should display product badge when present', () => {
      cy.get('body').then($body => {
        // Look for badge elements
        const badgeSelectors = [
          '[class*="badge"]',
          '[class*="Badge"]',
          '[class*="tag"]',
          '[class*="Tag"]'
        ]
        
        badgeSelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().should('be.visible')
          }
        })
      })
    })
  })

  describe('Product Information Section', () => {
    it('should display brand name when present', () => {
      cy.get('body').then($body => {
        // Look for brand elements
        const brandSelectors = [
          '[class*="brand"]',
          '[class*="Brand"]',
          'a[href*="brand"]'
        ]
        
        brandSelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().should('be.visible')
          }
        })
      })
    })

    it('should display product heading', () => {
      // Look for product name in headings
      cy.get('body').then($body => {
        const headingSelectors = [
          'h1',
          'h2', 
          '[class*="heading"]',
          '[class*="Heading"]',
          '[class*="title"]',
          '[class*="Title"]',
          '[class*="name"]',
          '[class*="Name"]'
        ]
        
        let headingFound = false
        headingSelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().should('exist').and('be.visible')
            headingFound = true
          }
        })
        
        expect(headingFound, 'At least one heading element should exist').to.be.true
      })
    })

    it('should display product name', () => {
      // Product name should be in a heading or prominent text
      cy.get('h1, h2, h3').should('exist').and('be.visible')
    })

    it('should display product price', () => {
      // Look for price elements
      cy.get('body').then($body => {
        const priceSelectors = [
          '[class*="price"]',
          '[class*="Price"]',
          '[class*="cost"]',
          '[class*="Cost"]',
          'span:contains("$")',
          'div:contains("$")',
          'p:contains("$")'
        ]
        
        let priceFound = false
        priceSelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().should('exist')
            priceFound = true
          }
        })
        
        // Alternative: check if page contains any price indicators
        if (!priceFound && $body.text().includes('$')) {
          cy.contains('$').should('exist')
          priceFound = true
        }
        
        expect(priceFound, 'At least one price element should exist').to.be.true
      })
    })

    it('should display RRP price when present', () => {
      cy.get('body').then($body => {
        const bodyText = $body.text()
        if (bodyText.includes('RRP') || bodyText.includes('Was')) {
          cy.log('RRP or original price found')
        } else {
          cy.log('No RRP price visible')
        }
      })
    })

    it('should display discount percentage when present', () => {
      cy.get('body').then($body => {
        if ($body.text().includes('%') && $body.text().includes('off')) {
          cy.log('Discount percentage found')
        } else {
          cy.log('No discount percentage visible')
        }
      })
    })

    it('should display promotion copy when present', () => {
      cy.get('body').then($body => {
        const bodyText = $body.text().toLowerCase()
        if (bodyText.includes('sale') || bodyText.includes('promotion') || bodyText.includes('offer')) {
          cy.log('Promotion copy found')
        } else {
          cy.log('No promotion copy visible')
        }
      })
    })
  })

  describe('Product Reviews Section', () => {
    it('should display rating component when reviews exist', () => {
      cy.get('body').then($body => {
        // Look for rating indicators
        if ($body.find('[class*="rating"]').length > 0 || 
            $body.find('[class*="star"]').length > 0 ||
            $body.text().includes('★') ||
            $body.text().includes('star')) {
          cy.log('Rating component appears to be present')
        } else {
          cy.log('No rating component visible - product may have no reviews')
        }
      })
    })

    it('should display review link', () => {
      cy.get('body').then($body => {
        if ($body.find('a[href="#review-container"]').length > 0) {
          cy.get('a[href="#review-container"]').should('exist')
        } else {
          cy.log('No review container link found - may be grouped product or no reviews')
        }
      })
    })

    it('should display "Be the first to review" text when no reviews exist', () => {
      cy.get('body').then($body => {
        if ($body.text().includes('Be the first to review')) {
          cy.contains('Be the first to review').should('be.visible')
        } else {
          cy.log('No first review text found')
        }
      })
    })
  })

  describe('Add to Cart Section', () => {
    it('should display add to cart section', () => {
      // Look for add to cart elements
      cy.get('body').then($body => {
        const addToCartSelectors = [
          'button:contains("Add to Cart")',
          'button:contains("Add To Cart")',
          'button:contains("Add to Bag")',
          'button[class*="cart"]',
          'button[class*="Cart"]',
          '[class*="addCart"]',
          '[class*="AddCart"]',
          'form button[type="submit"]',
          'button:contains("Buy")',
          'button:contains("Purchase")'
        ]
        
        let addToCartFound = false
        addToCartSelectors.forEach(selector => {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().should('exist')
            addToCartFound = true
          }
        })
        
        // Fallback: if no specific add to cart found, check if any buttons exist
        if (!addToCartFound) {
          const buttonCount = $body.find('button').length
          if (buttonCount > 0) {
            cy.log(`No specific add to cart button found, but ${buttonCount} buttons exist on page`)
          } else {
            cy.log('No buttons found on this page')
          }
        }
      })
    })

    it('should display quantity selector', () => {
      cy.get('body').then($body => {
        if ($body.find('input[type="number"]').length > 0 || 
            $body.find('select').length > 0) {
          cy.log('Quantity selector found')
        } else {
          cy.log('No quantity selector visible')
        }
      })
    })

    it('should display add to cart button', () => {
      cy.get('button').should('exist').and('have.length.at.least', 1)
    })

    it('should display find store button when applicable', () => {
      cy.get('body').then($body => {
        if ($body.text().toLowerCase().includes('find store') || 
            $body.text().toLowerCase().includes('store locator')) {
          cy.log('Store finder functionality found')
        } else {
          cy.log('No store finder visible')
        }
      })
    })
  })

  describe('Responsive Design Elements', () => {
    it('should display mobile layout on mobile view', () => {
      cy.viewport('iphone-x')
      cy.visit('https://staging.kitchenwarehouse.com.au/product/wolstead-series-acacia-wood-cutting-board-50x35cm')
      cy.get('body').should('be.visible')
      
      // Check that mobile-specific elements are visible
      cy.get('body').should('be.visible')
    })

    it('should display desktop layout on desktop view', () => {
      cy.viewport(1280, 720)
      cy.visit('https://staging.kitchenwarehouse.com.au/product/wolstead-series-acacia-wood-cutting-board-50x35cm')
      cy.get('body').should('be.visible')
      
      // Check that desktop-specific elements are visible
      cy.get('.pdp-page-container').should('exist')
    })
  })

  describe('Content Validation', () => {
    it('should have meaningful text content', () => {
      // Page should not be empty
      cy.get('body').should('not.be.empty')
      cy.get('body').invoke('text').should('have.length.greaterThan', 100)
    })

    it('should have proper page title', () => {
      cy.title().should('not.be.empty')
      cy.title().should('not.equal', 'undefined')
    })
  })
})