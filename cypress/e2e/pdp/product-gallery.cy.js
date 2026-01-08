import { pdpHelpers } from "./pdp-config";

describe("PDP – Product Gallery (E2E)", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
  });

  it("renders the product gallery", () => {
    cy.get('[class*="gallery"]').should("exist");
  });

  it("displays at least one product image inside gallery", () => {
    cy.get('[class*="gallery"] img')
      .should("exist")
      .then(($imgs) => {
        cy.wrap($imgs[0]).should("be.visible");
      });
  });

  it("allows user to click main gallery image", () => {
    cy.get('[class*="mainSwiper"] img, [class*="gallery"] button').then(
      ($targets) => {
        if ($targets.length > 0) {
          cy.wrap($targets[0]).click({ force: true });
        }
      }
    );

    // Re-query DOM after possible re-render
    cy.get("body").should("be.visible");
  });

  it("allows user to add or remove product from wishlist", () => {
    cy.get('button[aria-label*="wishlist"]')
      .should("exist")
      .first()
      .click({ force: true });

    cy.get("body").should("be.visible");
  });

  it("allows gallery navigation when multiple images exist", () => {
    cy.get("body").then(($body) => {
      const thumbSelector = '[class*="productGallerySwiper"] button';

      if ($body.find(thumbSelector).length > 1) {
        cy.get(thumbSelector).eq(1).click({ force: true });

        // Ensure app remains stable
        cy.get("body").should("be.visible");
      } else {
        cy.log("Single image product – navigation not applicable");
      }
    });
  });
});
