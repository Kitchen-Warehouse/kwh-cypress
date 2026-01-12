describe('Promotional Grid Component', () => {
  beforeEach(() => {
    // Visit the homepage or relevant page where the promotional grid is located
    cy.visit('/')
  })

  it('should have a PromotionalSwiper component', () => {
    // Check if a component exists with classname containing "PromotionalSwiper"
    cy.get('[class*="PromotionalSwiper"]', { timeout: 70000 }).should('exist')
  })

  it('should have slide elements with relative flex h-full flex-col classes inside PromotionalSwiper', () => {
    // Check if PromotionalSwiper contains slide elements with the specific classes
    cy.get('[class*="PromotionalSwiper"]', { timeout: 70000 })
      .find('.relative.flex.h-full.flex-col, [class*="relative"][class*="flex"][class*="h-full"][class*="flex-col"]')
      .should('exist')
      .should('have.length.greaterThan', 0)
  })

  it('should have visible images in each slide', () => {
    // Check if the first slide has a visible image container
    cy.get('[class*="PromotionalSwiper"]', { timeout: 70000 })
      .find('.relative.flex.h-full.flex-col, [class*="relative"][class*="flex"][class*="h-full"][class*="flex-col"]')
      .first()
      .find('[class*="nextjs-image-container"], .nextjs-image-container')
      .should('exist')
      .should('be.visible')
      .find('img')
      .should('exist')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('not.be.empty')
  })

  it('should have content div with rounded-b p-4 classes at same level as image', () => {
    // Check if the first slide has a div with "rounded-b p-4" classes at the same level as image
    cy.get('[class*="PromotionalSwiper"]', { timeout: 70000 })
      .find('.relative.flex.h-full.flex-col, [class*="relative"][class*="flex"][class*="h-full"][class*="flex-col"]')
      .first()
      .find('.rounded-b.p-4, [class*="rounded-b"][class*="p-4"]')
      .should('exist')
  })

  it('should have Typography_body_MD element with content inside rounded-b p-4 div', () => {
    // Check if the first slide's rounded-b p-4 div contains Typography_body_MD element that is not empty
    cy.get('[class*="PromotionalSwiper"]', { timeout: 70000 })
      .find('.relative.flex.h-full.flex-col, [class*="relative"][class*="flex"][class*="h-full"][class*="flex-col"]')
      .first()
      .find('.rounded-b.p-4, [class*="rounded-b"][class*="p-4"]')
      .find('[class*="Typography_body_MD"], .Typography_body_MD')
      .should('exist')
      .should('not.be.empty')
      .invoke('text')
      .should('not.be.empty')
  })

  it('should have at least one promotional slide', () => {
    // Ensure there's at least one slide in the promotional grid
    cy.get('[class*="PromotionalSwiper"]', { timeout: 70000 })
      .find('.relative.flex.h-full.flex-col, [class*="relative"][class*="flex"][class*="h-full"][class*="flex-col"]')
      .should('have.length.greaterThan', 0)
  })

  it('should have properly loaded images', () => {
    // Verify the first slide's image is actually loaded and not broken
    cy.get('[class*="PromotionalSwiper"]', { timeout: 70000 })
      .find('.relative.flex.h-full.flex-col, [class*="relative"][class*="flex"][class*="h-full"][class*="flex-col"]')
      .first()
      .find('[class*="nextjs-image-container"], .nextjs-image-container')
      .find('img')
      .should('be.visible')
      .and(($el) => {
        // Check if image is actually loaded
        expect($el[0].naturalWidth).to.be.greaterThan(0)
        expect($el[0].naturalHeight).to.be.greaterThan(0)
      })
  })
})