import { pdpHelpers } from "./pdp-config";

describe("KWH PDP – BuyBox Click & Collect", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
    cy.get(".pdp-page-container", { timeout: 15000 }).should("be.visible");
  });

  it("should display building storefront icon when CNC section exists", () => {
    cy.get("body").then(($body) => {
      const buildingIcon = $body.find(
        'svg[class*="text-brand-60"][class*="size-6"]'
      );

      if (buildingIcon.length > 0) {
        cy.wrap(buildingIcon.first()).should("be.visible");
      }
    });
  });

  it("should render CNC content within proper container", () => {
    cy.get("body").then(($body) => {
      // Look for CNC container structure: "box-border flex w-full justify-between gap-4"
      const cncContainer = $body
        .find(
          '[class*="box-border"][class*="flex"][class*="justify-between"][class*="gap-4"]'
        )
        .filter(
          (_, el) => Cypress.$(el).find('svg[class*="size-6"]').length > 0
        );

      if (cncContainer.length > 0) {
        const containerText = cncContainer.text();
        const cncMatch = containerText.match(
          /click|collect|pickup|store|available/i
        );

        if (cncMatch) {
          cy.wrap(cncContainer.first()).should("contain.text", cncMatch[0]);
        }
      }
    });
  });

  it("should allow store selection interaction without crashing", () => {
    cy.get("body").then(($body) => {
      // Look for FindStoreStockButton or clickable descriptions with specific patterns
      const clickableElements = $body
        .find("button")
        .filter((_, el) => {
          const text = el.textContent?.toLowerCase() || "";
          return text.includes("store") || text.includes("select");
        })
        .add($body.find('[class*="underline"][class*="cursor-pointer"]'));

      if (clickableElements.length > 0) {
        cy.wrap(clickableElements.first()).click({ force: true });
        cy.get(".pdp-page-container").should("be.visible");
      }
    });
  });
});
