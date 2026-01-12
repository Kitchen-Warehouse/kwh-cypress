import "cypress-real-events/support";

// Product Listing Page Tests
describe("Product listing Page E2E Tests", () => {
  // Visit the staging site and should hover over appliances menu and verify dropdown appears
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-link-text="appliances"]').should("be.visible").realHover();

    cy.get(".gridItem").should("be.visible");

    cy.get('[data-link-text="air fryers"]').should("be.visible").click();
  });


  it("should display the correct page heading and breadcrumbs", () => {
    // Verify the main H1 heading
    cy.get("h1").should("be.visible");

    // Verify breadcrumbs exist and contain the path
    cy.get("#kwh-breadcrumbs")
      .should("be.visible")
      .within(() => {
        cy.contains("Home").should("exist");
      });
  });

  it("should display the page heading description", () => {
    // Verify the description block is visible and not empty
    cy.get("#description").should("be.visible").and("not.be.empty");
  });

  it("should display the product filters", () => {
    // Verify the filters section wrapper is visible
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

          // Verify that the product link returns 200
          cy.request(href).its("status").should("eq", 200);
        });
      });
  });

  it("should contain valid card image and details", () => {
    // Check that product card image is visible
    cy.get("#list, .grid")
      .find(".product-card img, [data-testid='product-image']")
      .first()
      .should("be.visible")
      .and(($img) => {
        expect($img.attr("src")).to.exist;
      });

    // Check that product card content is visible
    cy.get("#list, .grid")
      .find(".detail-section, [data-testid='product-details']")
      .first()
      .should("be.visible")
      .within(() => {
        cy.get("a, [data-testid='product-title']")
          .first()
          .should("be.visible")
          .and("not.be.empty");
      });
  });

  it("should navigate to a product detail page when a card is clicked", () => {
    cy.get("#list, .grid")
      .find('.product-card a, [data-testid="product-tile"] a')
      .first()
      .as("firstProductLink");

    cy.get("@firstProductLink")
      .should("have.attr", "href")
      .then((href) => {
        cy.get("@firstProductLink").click();

        // URL should include the product path
        cy.url().should("include", "/product/");
        cy.url().should("include", href.toString().split("/product/")[1]);
      });

    // Product detail page should show a title
    cy.get("h1").should("be.visible");
  });
});
