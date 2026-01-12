import 'cypress-real-events/support'

describe('Product Carousel Container', () => {
	beforeEach(() => {
		// Update this to visit the correct page where the carousel exists
		cy.visit('/');
	});

	it('should exist in the DOM', () => {
		cy.get('[class*="ProductCarouselContainerTastic"]', { timeout: 70000 }).should('exist');
	});

	it('should be visible', () => {
		cy.get('[class*="ProductCarouselContainerTastic"]', { timeout: 70000 }).should('be.visible');
	});

	it('should have product slider items that exist and are visible', () => {
		cy.get('.product-slider-item', { timeout: 70000 }).should('exist');
		cy.get('.product-slider-item', { timeout: 70000 }).first().should('be.visible');
		cy.log('Checking first product slider item');
	});

	it('should have a visible image inside product slider items', () => {
		cy.log('Checking product image in first product item');
		cy.get('.product-slider-item', { timeout: 70000 }).first()
			.find(".product-card img, [data-testid='product-image']")
			.first()
			.should("be.visible")
			.and(($img) => {
				expect($img.attr("src")).to.exist;
			});
	});

	it('should have product cards with title wrappers containing text', () => {
		cy.log('Checking first product card');
		cy.get('.product-slider-item', { timeout: 70000 }).first().within(() => {
			cy.get('[class*="ProductCard_cardTitleWrapper"]').should('exist');
			cy.get('[class*="ProductCard_cardTitleWrapper"]').should('be.visible');
			cy.get('[class*="ProductCard_cardTitleWrapper"]').should('not.be.empty');
		});
	});

	it('should have typography span elements for price with valid links inside product slider items', () => {
		cy.log('Checking typography links in first product item');
		cy.get('.product-slider-item', { timeout: 70000 }).first().within(() => {
			// Look for spans with text-base-black class inside detail-section div
			cy.get('.detail-section span[class*="text-base-black"]').then($spans => {
				cy.log(`Found ${$spans.length} span elements with text-base-black class in detail-section`);
				$spans.each((index, span) => {
					cy.log(`Span ${index}: ${span.className}`);
				});
			});
			
			// Also check for any anchor tags specifically in spans with text-base-black class
			cy.get('.detail-section span[class*="text-base-black"] a').then($links => {
				cy.log(`Found ${$links.length} anchor elements in detail-section spans with text-base-black class`);
				$links.each((index, link) => {
					cy.log(`Link ${index}: ${link.href}`);
				});
			});
			
			// Look for anchor tags specifically within spans that have text-base-black class in detail-section
			cy.get('.detail-section span[class*="text-base-black"] a').should('exist').first().then($link => {
				cy.wrap($link).should('have.attr', 'href');
				cy.wrap($link).should('have.attr', 'href').and('not.be.empty');
				
				// Check if the link returns 200 status code
				cy.wrap($link).invoke('attr', 'href').then((href) => {
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
