import 'cypress-real-events/support'

describe('Product Carousel Container', () => {
	beforeEach(() => {
		// Update this to visit the correct page where the carousel exists
		cy.visit('https://staging.kitchenwarehouse.com.au/');
	});

	it('should exist in the DOM', () => {
		cy.get('[class*="ProductCarouselContainerTastic"]').should('exist');
	});

	it('should be visible', () => {
		cy.get('[class*="ProductCarouselContainerTastic"]').should('be.visible');
	});

	it('should have product slider items that exist and are visible', () => {
		cy.get('.product-slider-item').should('exist');
		cy.get('.product-slider-item').first().should('be.visible');
		cy.log('Checking first product slider item');
	});

	it('should have product cards with title wrappers containing text', () => {
		cy.log('Checking first product card');
		cy.get('.product-slider-item').first().within(() => {
			cy.get('[class*="ProductCard_cardTitleWrapper"]').should('exist');
			cy.get('[class*="ProductCard_cardTitleWrapper"]').should('be.visible');
			cy.get('[class*="ProductCard_cardTitleWrapper"]').should('not.be.empty');
		});
	});

	it('should have typography span elements with valid links inside product slider items', () => {
		cy.log('Checking typography links in first product item');
		cy.get('.product-slider-item').first().within(() => {
			cy.get('span[class*="Typography_body_LG"][class*="text-base-black"]').should('exist');
			cy.get('span[class*="Typography_body_LG"][class*="text-base-black"]').within(() => {
				cy.get('a').should('exist');
				cy.get('a').should('have.attr', 'href');
				cy.get('a').should('have.attr', 'href').and('not.be.empty');
				
				// Check if the link returns 200 status code
				cy.get('a').invoke('attr', 'href').then((href) => {
					cy.log(`Testing link: ${href}`);
					
					// Construct full URL if href is relative
					const baseUrl = 'https://staging.kitchenwarehouse.com.au';
					const fullUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;
					
					cy.request('GET', fullUrl).then((response) => {
						expect(response.status).to.eq(200);
					});
					
					// Visit the page using the full URL to verify it loads successfully
					cy.visit(fullUrl);
					cy.url().should('include', href.startsWith('/') ? href : href);
				});
			});
		});
	});
});
