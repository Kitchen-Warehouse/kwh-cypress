import { pdpHelpers } from "./pdp-config.js";

describe("PDP - Product Pricing", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
  });

  it("should display the main product price", () => {
    // Main price must always be present
    cy.get('[class*="Display"], [class*="display"]')
      .first()
      .should("be.visible")
      .invoke("text")
      .should("match", /\d/);
  });

  it("should display RRP price when present", () => {
    cy.get("body").then(($body) => {
      const rrp = $body.find('.line-through:contains("RRP")');

      if (rrp.length) {
        cy.wrap(rrp)
          .should("be.visible")
          .invoke("text")
          .should("match", /RRP\s*\$\d+\.\d+/);
      } else {
        cy.log("RRP not present for this product");
      }
    });
  });

  it("should display savings badge when present", () => {
    cy.get("body").then(($body) => {
      const badge = $body.find('.bg-brand-60:contains("OFF RRP")');

      if (badge.length) {
        cy.wrap(badge)
          .should("be.visible")
          .invoke("text")
          .should("match", /\d+%\s*OFF RRP/i);
      } else {
        cy.log("No savings badge for this product");
      }
    });
  });

  it("should display trade pricing when applicable", () => {
    cy.get("body").then(($body) => {
      if ($body.text().includes("Trade price")) {
        cy.contains("Trade price").closest("[class]").should("be.visible");

        cy.contains(/Regular\s*\d/)
          .closest(".line-through")
          .should("be.visible");
      } else {
        cy.log("Trade pricing not applicable");
      }
    });
  });
});
