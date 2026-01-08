import { pdpHelpers } from "./pdp-config";

describe("PDP - MetadataPanel Basic Tests", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
    cy.get(".pdp-page-container", { timeout: 15000 }).should("be.visible");
  });

  it("should display and expand product description", () => {
    cy.contains("Product description")
      .should("be.visible")
      .scrollIntoView()
      .click({ force: true });
    cy.get(".html-container.pdp-description").should("be.visible");
  });

  it("should display and expand specifications", () => {
    cy.contains("Specifications")
      .should("be.visible")
      .scrollIntoView()
      .click({ force: true });
    cy.get(".html-container.pdp-specification").should("be.visible");
  });

  it("should show view more button when description is long", () => {
    cy.contains("Product description").scrollIntoView().click({ force: true });
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("View More")').length > 0) {
        cy.contains("button", "View More")
          .should("be.visible")
          .scrollIntoView()
          .click({ force: true });
        cy.contains("button", "View More").should("not.exist");
      }
    });
  });

  it("should handle reviews section when available", () => {
    cy.get("body").then(($body) => {
      if ($body.find(":contains('Reviews')").length > 0) {
        cy.contains("Reviews").scrollIntoView().click({ force: true });
        cy.get("#review-container").should("be.visible");
      }
    });
  });
});
