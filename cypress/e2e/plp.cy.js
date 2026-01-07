import "cypress-real-events/support";

describe("Product listing Page E2E Tests", () => {
  beforeEach(() => {
    cy.visit(
      "https://staging.kitchenwarehouse.com.au/appliances/cooking-appliances/air-fryers"
    );
  });

  it("should display the correct page heading and breadcrumbs", () => {
    // Verify the main H1 heading
    cy.get("h1").should("be.visible");

    // Verify breadcrumbs exist and contain the path
    cy.get("#kwh-breadcrumbs").should("be.visible");
  });



  it("should display the product filters", () => {
    // Verify the filters section is visible
    cy.get("#productListing").should("be.visible");
  });



  it("should load product tiles and verify the first 3 return 200 status on click", () => {
    // Check that product items are visible
    cy.get("#list, .grid")
      .find('.product-card, [data-testid="product-tile"]')
      .should("have.length.at.least", 1)
      .then(($products) => {
        const productsToTest = $products.slice(0, 3);

        cy.wrap(productsToTest).each(($el) => {
          // Find the link within the product tile
          const href = $el.find("a").first().prop("href");

          cy.request(href).its("status").should("eq", 200);
        });
      });
  });

  it("should contain valid card image and details", () => {
    // Check that product card image is visible
    cy.get(".product-card img").should("be.visible");

    // Check that product card content is visible
    cy.get(".detail-section").should("be.visible");
  });
});
