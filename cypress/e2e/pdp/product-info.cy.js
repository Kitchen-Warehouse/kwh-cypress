import { pdpHelpers } from "./pdp-config.js";

describe("PDP - Product Information Section", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
  });

  it("should display brand name when present", () => {
    cy.viewport(1280, 800);

    cy.get("body").then(($body) => {
      const brandLink = $body.find("div.md\\:flex a.underline");

      if (brandLink.length) {
        cy.wrap(brandLink)
          .first()
          .should("be.visible")
          .and("not.have.text", "");
      } else {
        cy.log("Brand not present for this product");
      }
    });
  });

  it("should display product name", () => {
    cy.get("h1").should("be.visible").and("not.be.empty");
  });

  it("should display short description when present", () => {
    cy.get("h1").then(($h1) => {
      const shortDesc = $h1.next("div.pb-3");

      if (shortDesc.length) {
        cy.wrap(shortDesc).should("be.visible").and("not.have.text", "");
        cy.log("Short description found");
      } else {
        cy.log("Short description not present for this product");
      }
    });
  });
});
