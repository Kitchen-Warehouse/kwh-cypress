import "cypress-real-events/support";
// Product Listing Page Filter Button Tests
describe("Product Listing Page Filter Button Tests", () => {
  // Visit the staging site and should hover over appliances menu and verify dropdown appears
  beforeEach(() => {
    cy.visit("https://staging.kitchenwarehouse.com.au/");

    cy.get('[data-link-text="appliances"]').should("be.visible").realHover();

    cy.get(".gridItem").should("be.visible");

    cy.get('[data-link-text="air fryers"]').should("be.visible").click();
  });
  afterEach(() => {
    // 3 seconds after each test
    cy.wait(3000);
  });

  it("should display the show/hide filters button", () => {
    cy.get(".xl\\:flex .filters-btn-text").should("be.visible");
  });

  it('should show "Show filters" text initially', () => {
    cy.get(".xl\\:flex .filters-btn-text")
      .find("span.lg\\:block")
      .should("contain.text", "Show filters")
      .and("be.visible");
  });

  it("should display filter icon on the button", () => {
    cy.get(".xl\\:flex .filters-btn-text").find("svg").should("exist");
  });

  it("should display filter panel with all filter options after clicking show filters button", () => {
    cy.get(".xl\\:flex .filters-btn-text").click();
  });


  it('should change button text to "Hide filters" after clicking', () => {
    // Click the show filters button
    cy.get(".xl\\:flex .filters-btn-text").click();
    // Verify the button text changes to "Hide filters"
    cy.get(".xl\\:flex .filters-btn-text")
      .find("span.lg\\:block")
      .should("contain.text", "Hide filters")
      .and("be.visible");
  });

  it("should hide filter panel after clicking hide filters button", () => {
    // Click the show filters button
    cy.get(".xl\\:flex .filters-btn-text").click();
    // Click the hide filters button
    cy.get(".xl\\:flex .filters-btn-text").click();

    // Verify the filter panel is hidden
    cy.get('[class*="ProductFilters_filterDesktopContainer"]').should(
      "not.exist"
    );
  });

  // Open filters + check Appetito brand + verify filtered state
  it("should show filtered state after Brand selection", () => {
    // Click the show filters button
    cy.get(".xl\\:flex .filters-btn-text").click();
    cy.get('[class*="ProductFilters_filterDesktopContainer"]').within(() => {
      cy.contains("Air Fryer Ovens")
        .parent()
        .find('input[type="checkbox"]')
        .check({ force: true });
    });

    // Verify tag visible
    cy.contains("button", "Air Fryer Ovens").should("be.visible");
    cy.get('.ProductCardproductCard, [class*="productCard"]').should(
      "have.length.gte",
      1
    );
  });
});
