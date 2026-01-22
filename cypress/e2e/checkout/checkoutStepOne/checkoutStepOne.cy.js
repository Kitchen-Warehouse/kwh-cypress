describe("Add to Cart Test", () => {
  it("“Customer” step is highlighted in Step 1 of the checkout process", () => {
    // Visit product page
    cy.visit(
      "https://staging.kitchenwarehouse.com.au/product/wolstead-series-acacia-wood-cutting-board-50x35cm",
    );
    cy.wait(3000);

    // Click add to cart button
    cy.get('[data-testid="add-to-cart-or-preorder"]', { timeout: 15000 })
      .should("be.visible")
      .should("not.be.disabled")
      .scrollIntoView()
      .click()
      .then(() => {
        cy.log("✅ Successfully clicked add to cart button!");
        cy.get('[class*="MiniCart"]', { timeout: 15000 })
          .should("be.visible")
          .then(() => {
            cy.log("✅ Mini cart flyout is visible");
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .should("not.be.disabled")
              .click()
              .then(() => {
                cy.log(
                  "✅ Successfully clicked secure checkout button in mini cart flyout!",
                );
                cy.url({ timeout: 10000 })
                  .should("include", "/checkout")
                  .then(() => {
                    cy.log("✅ Successfully redirected to checkout page!");

                    // Check for step 1 active content element
                    cy.get('[data-testid="step-1-active-content"]', {
                      timeout: 10000,
                    })
                      .should("be.visible")
                      .then(($element) => {
                        // cy.log('✅ Step 1 active content element is visible on checkout page!');

                        // Store original style for restoration
                        const originalStyle = $element.attr("style") || "";

                        // Add red border highlight
                        cy.wrap($element)
                          .invoke(
                            "attr",
                            "style",
                            `${originalStyle} border: 3px solid red !important;`,
                          )
                          .then(() => {
                            // cy.log('🔴 Added red border highlight to step-1-active-content');

                            // Wait for 3 seconds
                            cy.wait(3000).then(() => {
                              // Remove the border by restoring original style
                              cy.wrap($element)
                                .invoke("attr", "style", originalStyle)
                                .then(() => {
                                  // Check that customer step progress text is bolded
                                  cy.get(
                                    '[data-testid="customer-step-progress"]',
                                    { timeout: 10000 },
                                  )
                                    .should("be.visible")
                                    .should("contain.text", "Customer")
                                    .should(
                                      "have.class",
                                      "Typography_semibold_weight__yoyH0",
                                    )
                                    .then(($customerElement) => {
                                      cy.log(
                                        "✅ Customer step progress text is bolded and visible!",
                                      );

                                      // Store original style for restoration
                                      const customerOriginalStyle =
                                        $customerElement.attr("style") || "";

                                      // Add green border highlight to customer text
                                      cy.wrap($customerElement)
                                        .invoke(
                                          "attr",
                                          "style",
                                          `${customerOriginalStyle} border: 3px solid green !important;`,
                                        )
                                        .then(() => {
                                          // cy.log(
                                          //   "🟢 Added green border highlight to customer-step-progress",
                                          // );

                                          // Wait for 3 seconds
                                          cy.wait(3000).then(() => {
                                            // Remove the border by restoring original style
                                            cy.wrap($customerElement).invoke(
                                              "attr",
                                              "style",
                                              customerOriginalStyle,
                                            );
                                          });
                                        });
                                    });
                                });
                            });
                          });
                      });
                  });
              });
          });
      });
  });

});
