import "cypress-real-events/support";

describe("Product listing Page E2E Tests", () => {
  // Visit the staging site and should hover over appliances menu and verify dropdown appears
  beforeEach(() => {
    cy.visit("https://staging.kitchenwarehouse.com.au/");

    cy.get('[data-link-text="appliances"]').should("be.visible").realHover();

    cy.get(".gridItem").should("be.visible");

    cy.get('[data-link-text="air fryers"]').should("be.visible").click();
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

  it("should click the show filters button", () => {
    cy.get(".xl\\:flex .filters-btn-text").click();
  });

  it("should display filter panel with all filter options after clicking show filters button", () => {
    // Click the show filters button
    cy.get(".xl\\:flex .filters-btn-text").click();

    // Verify the filter sidebar container is visible with all filter options
    cy.get('[class*="ProductFilters_filterDesktopContainer"]')
      .first()
      .within(() => {
        cy.contains("button span", "Brand")
          .parent("button")
          .should("have.attr", "data-headlessui-state", "open");

        cy.get("ul li:has(label)").should("have.length", 20); // ~20 brands filters shown
      });
  });

});
