// Base configuration and helpers for PDP tests
export const PDP_CONFIG = {
  testUrl:
    "https://staging.kitchenwarehouse.com.au/product/wolstead-series-acacia-wood-cutting-board-50x35cm",
  defaultTimeout: 15000,
};

// Common PDP helpers
export const pdpHelpers = {
  visitPdpPage(url = PDP_CONFIG.testUrl) {
    cy.visit(url);
    cy.get("body", { timeout: PDP_CONFIG.defaultTimeout }).should("be.visible");
  },

  // Mandatory element → test MUST fail if missing
  checkMandatoryElement(selector, elementName) {
    cy.get(selector, { timeout: PDP_CONFIG.defaultTimeout })
      .should("exist")
      .and("be.visible")
      .invoke("text")
      .then((text) => {
        expect(text.trim(), `${elementName} should not be empty`).to.not.equal(
          ""
        );
      });
  },

  // Optional element → validate only if present
  checkOptionalElement(selector, elementName) {
    cy.get("body").then(($body) => {
      if ($body.find(selector).length) {
        cy.get(selector)
          .should("be.visible")
          .invoke("text")
          .should("not.be.empty");
      } else {
        cy.log(`${elementName} not present for this product`);
      }
    });
  },

  // Optional clickable link → verify navigation + 200 status
  checkOptionalLink(selector, elementName) {
    cy.get("body").then(($body) => {
      if ($body.find(selector).length) {
        cy.get(selector)
          .should("be.visible")
          .and("have.attr", "href")
          .then((href) => {
            cy.request(href).its("status").should("eq", 200);
          });
      } else {
        cy.log(`${elementName} link not present`);
      }
    });
  },
};
