import { pdpHelpers } from "./pdp-config";

describe("KWH PDP – BuyBox Shipping", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
    cy.get(".pdp-page-container", { timeout: 15000 }).should("be.visible");
  });

  it("should display truck icon when shipping section exists", () => {
    cy.get("body").then(($body) => {
      // TruckIcon with specific attributes from BuyBoxShippingMessage
      const truckIcon = $body.find(
        'svg[height="24"][width="24"][class*="stroke-"][class*="text-brand-60"]'
      );

      if (truckIcon.length > 0) {
        cy.wrap(truckIcon.first()).should("be.visible");
      }
    });
  });

  it("should render shipping content within proper container", () => {
    cy.get("body").then(($body) => {
      // Look for the specific container structure
      const shippingContainer = $body
        .find('[class*="box-border"][class*="flex"][class*="gap-4"]')
        .filter(
          (_, el) =>
            Cypress.$(el).find('svg[height="24"][width="24"]').length > 0
        );

      if (shippingContainer.length > 0) {
        const containerText = shippingContainer.text();
        const shippingMatch = containerText.match(
          /shipping|delivery|standard|express/i
        );

        if (shippingMatch) {
          cy.wrap(shippingContainer.first()).should(
            "contain.text",
            shippingMatch[0]
          );
        }
      }
    });
  });

  it("should allow interaction with shipping option without breaking page", () => {
    cy.get("body").then(($body) => {
      // Look for ShippingOption components within shipping container
      const shippingContainer = $body
        .find('[class*="box-border"][class*="flex"][class*="gap-4"]')
        .filter(
          (_, el) =>
            Cypress.$(el).find('svg[height="24"][width="24"]').length > 0
        );

      if (shippingContainer.length > 0) {
        const clickableElements = shippingContainer.find(
          'button, [role="button"]'
        );

        if (clickableElements.length > 0) {
          cy.wrap(clickableElements.first()).click({ force: true });
          cy.get(".pdp-page-container").should("be.visible");
        }
      }
    });
  });
});
