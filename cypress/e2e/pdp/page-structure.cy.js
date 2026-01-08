import { pdpHelpers } from "./pdp-config.js";

describe("PDP - Page Structure and Container Elements", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
  });

  it("should display the main PDP container", () => {
    cy.get(".pdp-page-container", { timeout: 15000 })
      .should("exist")
      .and("be.visible");
  });

  it("should display breadcrumbs", () => {
    // Verify breadcrumbs exist and contain the full path
    cy.get("#kwh-breadcrumbs")
      .should("be.visible")
      .within(() => {
        // Check that breadcrumbs start with Home
        cy.contains("Home").should("exist");

        // Verify there are multiple breadcrumb items (indicating a navigation path)
        cy.get("a, span, li").should("have.length.at.least", 2);
      });
  });
});
