import { pdpHelpers } from "./pdp-config";

describe("PDP – Recently Viewed (Basic E2E)", () => {
  beforeEach(() => {
    // Update this to visit a real PDP page where recently viewed might exist
    pdpHelpers.visitPdpPage();
  });

  it("should exist in the DOM if recently viewed data is available", () => {
    cy.get("body", { timeout: 70000 }).then(($body) => {
      if ($body.find('section[aria-labelledby="recently-viewed"]').length > 0) {
        cy.log("Recently Viewed section found");
        cy.get('section[aria-labelledby="recently-viewed"]').should("exist");
      } else {
        cy.log(
          "Recently Viewed section not found - no recently viewed products"
        );
      }
    });
  });

  it("should be visible when it exists", () => {
    cy.get("body", { timeout: 70000 }).then(($body) => {
      if ($body.find('section[aria-labelledby="recently-viewed"]').length > 0) {
        cy.log("Testing Recently Viewed visibility");
        cy.get('section[aria-labelledby="recently-viewed"]').should(
          "be.visible"
        );
      } else {
        cy.log(
          "Recently Viewed section not present - skipping visibility test"
        );
      }
    });
  });

  it("should display Recently Viewed heading when section exists", () => {
    cy.get("body", { timeout: 70000 }).then(($body) => {
      if ($body.find("#recently-viewed").length > 0) {
        cy.log("Testing Recently Viewed heading");
        cy.get("#recently-viewed")
          .should("be.visible")
          .and("contain.text", "recently viewed");
      } else {
        cy.log(
          "Recently Viewed heading not found - section may not be present"
        );
      }
    });
  });

  it("should have product links that are visible when section exists", () => {
    cy.get("body", { timeout: 70000 }).then(($body) => {
      if ($body.find('section[aria-labelledby="recently-viewed"]').length > 0) {
        cy.log("Testing Recently Viewed product links");
        cy.get('section[aria-labelledby="recently-viewed"]').within(() => {
          cy.get("a").should("exist").first().should("be.visible");

          // Test that the first product link has a valid href
          cy.get("a").first().should("have.attr", "href").and("not.be.empty");
        });
      } else {
        cy.log(
          "Recently Viewed section not present - skipping product links test"
        );
      }
    });
  });
});
