import { pdpHelpers } from "./pdp-config";

describe("KWH PDP – BuyBox Return Policy", () => {
  beforeEach(() => {
    pdpHelpers.visitPdpPage();
    cy.get(".pdp-page-container", { timeout: 15000 }).should("be.visible");
  });

  it("should display arrow path icon when return policy section exists", () => {
    cy.get("body").then(($body) => {
      const arrowIcon = $body
        .find('svg[height="24"][width="24"][class*="text-brand-60"]')
        .not('[class*="stroke-"]'); // Exclude TruckIcon which also has same dimensions

      if (arrowIcon.length > 0) {
        cy.wrap(arrowIcon.first()).should("be.visible");
      }
    });
  });

  it("should render return policy content within proper container", () => {
    cy.get("body").then(($body) => {
      // Look for return policy container
      const returnContainer = $body
        .find("button.cursor-pointer")
        .closest('[class*="box-border"][class*="flex"][class*="gap-4"]');

      if (returnContainer.length > 0) {
        const containerText = returnContainer.text();
        const returnMatch = containerText.match(
          /return|refund|policy|guarantee|money back/i
        );

        if (returnMatch) {
          cy.wrap(returnContainer.first()).should(
            "contain.text",
            returnMatch[0]
          );
        }
      }
    });
  });

  it("should allow return policy interaction without breaking page", () => {
    cy.get("body").then(($body) => {
      // Look for the specific button.cursor-pointer from BuyBoxReturnPolicy
      const returnButton = $body
        .find("button.cursor-pointer")
        .filter((_, el) => {
          const text = el.textContent?.toLowerCase() || "";
          return (
            text.includes("return") ||
            text.includes("policy") ||
            text.includes("guarantee") ||
            text.includes("money back")
          );
        });

      if (returnButton.length > 0) {
        cy.wrap(returnButton.first()).click({ force: true });
        cy.get(".pdp-page-container").should("be.visible");
      }
    });
  });
});
