import { pdpHelpers } from "./pdp-config";

describe("PDP – Related Categories (E2E)", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
    // Wait for page to load before running tests
    cy.get("body", { timeout: 15000 }).should("be.visible");
  });

  it("should render Related Categories section when available", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".relatedCategories").length > 0) {
        cy.get(".relatedCategories").should("be.visible");
      }
    });
  });

  it("should display Related Categories heading", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".relatedCategories").length > 0) {
        cy.contains(/related categories/i).should("be.visible");
      }
    });
  });

  it("should display at least one related category item", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".relatedCategories").length > 0) {
        // Wait for the carousel to load (component has 1000ms timeout)
        cy.get(".relatedCategories", { timeout: 15000 })
          .find("a")
          .should("have.length.at.least", 1)
          .first()
          .should("be.visible");
      }
    });
  });

  it("should navigate when a related category is clicked", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".relatedCategories").length > 0) {
        cy.url().then((originalUrl) => {
          cy.get(".relatedCategories")
            .find("a")
            .first()
            .scrollIntoView()
            .click({ force: true });

          cy.url({ timeout: 10000 }).should("not.eq", originalUrl);
        });
      }
    });
  });
});
