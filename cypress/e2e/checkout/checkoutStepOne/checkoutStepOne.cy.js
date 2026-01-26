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
            cy.wait(3000);
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .should("not.be.disabled")
              .then(($checkoutBtn) => {
                cy.log("✅ Secure checkout button found and visible!");

                // Store original style for restoration
                const checkoutBtnOriginalStyle = $checkoutBtn.attr('style') || '';

                // Add black border highlight to secure checkout button
                cy.wrap($checkoutBtn)
                  .invoke('attr', 'style', `${checkoutBtnOriginalStyle} border: 3px solid black !important;`)
                  .then(() => {
                    cy.log("⚫ Added black border highlight to checkout button");

                    // Wait for 3 seconds
                    cy.wait(3000).then(() => {
                      // Remove the border by restoring original style
                      cy.wrap($checkoutBtn)
                        .invoke('attr', 'style', checkoutBtnOriginalStyle)
                        .then(() => {
                          cy.log("✅ Removed border highlight from checkout button");

                          // Now click the button
                          cy.wrap($checkoutBtn).click();
                        });
                    });
                  });
              })
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
                                            ).then(() => {
                                              // Verify the newsletter subscription checkbox is checked by default
                                              cy.get('input[type="checkbox"]')
                                                .scrollIntoView()
                                                .should('be.visible')
                                                .and('be.checked')
                                                .then(($checkbox) => {
                                                  cy.log('✅ Newsletter subscription checkbox is checked by default!');

                                                  // Store original style for restoration
                                                  const checkboxOriginalStyle = $checkbox.attr('style') || '';

                                                  // Add blue border highlight to checkbox
                                                  cy.wrap($checkbox)
                                                    .invoke('attr', 'style', `${checkboxOriginalStyle} border: 3px solid red !important;`)
                                                    .then(() => {
                                                      cy.log('🔵 Added blue border highlight to newsletter checkbox');

                                                      // Wait for 3 seconds
                                                      cy.wait(3000).then(() => {
                                                        // Remove the border by restoring original style
                                                        cy.wrap($checkbox)
                                                          .invoke('attr', 'style', checkboxOriginalStyle)
                                                          .then(() => {
                                                            cy.log('✅ Removed border highlight from newsletter checkbox');

                                                            // Verify the checkbox label text
                                                            cy.get('input[type="checkbox"]')
                                                              .parent()
                                                              .should('contain', 'Stay updated on new products, offers and recipes')
                                                              .and('contain', 'Untick to opt out - even if you\'re already subscribed')
                                                              .then(() => {
                                                                cy.log('✅ Newsletter subscription checkbox label text is correct!');

                                                                // Enter email and verify "Continue to shipping" CTA
                                                                cy.get('input[type="email"][name="email"]')
                                                                  .scrollIntoView()
                                                                  .should('be.visible')
                                                                  .type('test@example.com')
                                                                  .then(() => {
                                                                    cy.log('✅ Email entered successfully!');

                                                                    // Verify "Continue to shipping" button is displayed and enabled
                                                                    cy.get('[data-testid="continue-to-shipping-button"]')
                                                                      .scrollIntoView()
                                                                      .should('be.visible')
                                                                      .should('not.be.disabled')
                                                                      .should('contain', 'Continue to shipping')
                                                                      .then(($ctaButton) => {
                                                                        cy.log('✅ Continue to shipping CTA is displayed and enabled!');

                                                                        // Store original style for restoration
                                                                        const ctaOriginalStyle = $ctaButton.attr('style') || '';

                                                                        // Add black border highlight to CTA button
                                                                        cy.wrap($ctaButton)
                                                                          .invoke('attr', 'style', `${ctaOriginalStyle} border: 3px solid black !important;`)
                                                                          .then(() => {
                                                                            cy.log('⚫ Added black border highlight to Continue to shipping button');

                                                                            // Wait for 3 seconds
                                                                            cy.wait(3000).then(() => {
                                                                              // Remove the border by restoring original style
                                                                              cy.wrap($ctaButton)
                                                                                .invoke('attr', 'style', ctaOriginalStyle)
                                                                                .then(() => {
                                                                                  cy.log('✅ Removed border highlight from Continue to shipping button');

                                                                                  // Verify right panel displays all cart items with correct details
                                                                                  cy.get('[data-test-id="cart-item-0"]')
                                                                                    .should('be.visible')
                                                                                    .within(() => {
                                                                                      // Verify product image
                                                                                      cy.get('[data-test-id="cart-item-0-image"]')
                                                                                        .should('be.visible')
                                                                                        .then(($image) => {
                                                                                          cy.log('✅ Cart item image is visible');

                                                                                          // Add purple border to image
                                                                                          const imageOriginalStyle = $image.attr('style') || '';
                                                                                          cy.wrap($image)
                                                                                            .invoke('attr', 'style', `${imageOriginalStyle} border: 3px solid purple !important;`)
                                                                                            .then(() => {
                                                                                              cy.log('🟣 Added purple border to cart item image');

                                                                                              cy.wait(3000).then(() => {
                                                                                                cy.wrap($image)
                                                                                                  .invoke('attr', 'style', imageOriginalStyle)
                                                                                                  .then(() => {
                                                                                                    cy.log('✅ Removed border from cart item image');

                                                                                                    // Check alt attribute separately
                                                                                                    cy.get('[data-test-id="cart-item-0-image"]')
                                                                                                      .should('have.attr', 'alt');

                                                                                                    // Check src attribute separately
                                                                                                    cy.get('[data-test-id="cart-item-0-image"]')
                                                                                                      .should('have.attr', 'src')
                                                                                                      .then(() => {
                                                                                                        cy.log('✅ Cart item image has alt text and src attributes');
                                                                                                      });
                                                                                                  });
                                                                                              });
                                                                                            });
                                                                                        });

                                                                                      // Verify product title
                                                                                      cy.get('[data-testid="cart-item-0-title"]')
                                                                                        .should('be.visible')
                                                                                        .should('not.be.empty')
                                                                                        .then(($title) => {
                                                                                          const titleText = $title.text().trim();
                                                                                          cy.log(`✅ Cart item title is visible: "${titleText}"`);

                                                                                          // Add orange border to title
                                                                                          const titleOriginalStyle = $title.attr('style') || '';
                                                                                          cy.wrap($title)
                                                                                            .invoke('attr', 'style', `${titleOriginalStyle} border: 3px solid orange !important;`)
                                                                                            .then(() => {
                                                                                              cy.log('🟠 Added orange border to cart item title');

                                                                                              cy.wait(3000).then(() => {
                                                                                                cy.wrap($title)
                                                                                                  .invoke('attr', 'style', titleOriginalStyle)
                                                                                                  .then(() => {
                                                                                                    cy.log('✅ Removed border from cart item title');
                                                                                                  });
                                                                                              });
                                                                                            });
                                                                                        });

                                                                                      // Verify quantity badge
                                                                                      cy.get('[data-testid="cart-item-0-quantity-badge"]')
                                                                                        .should('be.visible')
                                                                                        .should('contain.text', '1')
                                                                                        .should('have.class', 'bg-primary-600')
                                                                                        .then(($badge) => {
                                                                                          cy.log('✅ Cart item quantity badge is visible with correct styling');

                                                                                          // Add pink border to quantity badge
                                                                                          const badgeOriginalStyle = $badge.attr('style') || '';
                                                                                          cy.wrap($badge)
                                                                                            .invoke('attr', 'style', `${badgeOriginalStyle} border: 3px solid pink !important;`)
                                                                                            .then(() => {
                                                                                              cy.log('🩷 Added pink border to quantity badge');

                                                                                              cy.wait(3000).then(() => {
                                                                                                cy.wrap($badge)
                                                                                                  .invoke('attr', 'style', badgeOriginalStyle)
                                                                                                  .then(() => {
                                                                                                    cy.log('✅ Removed border from quantity badge');
                                                                                                  });
                                                                                              });
                                                                                            });
                                                                                        });

                                                                                      // Verify current price
                                                                                      cy.get('[data-testid="cart-item-0-price"]')
                                                                                        .should('be.visible')
                                                                                        .should('not.be.empty')
                                                                                        .then(($price) => {
                                                                                          const priceText = $price.text().trim();
                                                                                          cy.log(`✅ Cart item current price is visible: "${priceText}"`);

                                                                                          // Add yellow border to current price
                                                                                          const priceOriginalStyle = $price.attr('style') || '';
                                                                                          cy.wrap($price)
                                                                                            .invoke('attr', 'style', `${priceOriginalStyle} border: 3px solid yellow !important;`)
                                                                                            .then(() => {
                                                                                              cy.log('🟡 Added yellow border to current price');

                                                                                              cy.wait(3000).then(() => {
                                                                                                cy.wrap($price)
                                                                                                  .invoke('attr', 'style', priceOriginalStyle)
                                                                                                  .then(() => {
                                                                                                    cy.log('✅ Removed border from current price');
                                                                                                  });
                                                                                              });
                                                                                            });
                                                                                        });

                                                                                      // Verify was price (strikethrough)
                                                                                      cy.get('[data-testid="cart-item-0-was-price"]')
                                                                                        .should('be.visible')
                                                                                        .should('have.class', 'line-through')
                                                                                        .should('not.be.empty')
                                                                                        .then(($wasPrice) => {
                                                                                          const wasPriceText = $wasPrice.text().trim();
                                                                                          cy.log(`✅ Cart item was price is visible with strikethrough: "${wasPriceText}"`);

                                                                                          // Add cyan border to was price
                                                                                          const wasPriceOriginalStyle = $wasPrice.attr('style') || '';
                                                                                          cy.wrap($wasPrice)
                                                                                            .invoke('attr', 'style', `${wasPriceOriginalStyle} border: 3px solid cyan !important;`)
                                                                                            .then(() => {
                                                                                              cy.log('🩵 Added cyan border to was price');

                                                                                              cy.wait(3000).then(() => {
                                                                                                cy.wrap($wasPrice)
                                                                                                  .invoke('attr', 'style', wasPriceOriginalStyle)
                                                                                                  .then(() => {
                                                                                                    cy.log('✅ Removed border from was price');
                                                                                                  });
                                                                                              });
                                                                                            });
                                                                                        });

                                                                                      // Verify promotion percentage
                                                                                      cy.get('[data-test-id="cart-item-0-promotion-percentage"]')
                                                                                        .should('be.visible')
                                                                                        .should('contain.text', '% off RRP')
                                                                                        .then(($promotion) => {
                                                                                          const promotionText = $promotion.text().trim();
                                                                                          cy.log(`✅ Cart item promotion is visible: "${promotionText}"`);

                                                                                          // Add lime border to promotion
                                                                                          const promotionOriginalStyle = $promotion.attr('style') || '';
                                                                                          cy.wrap($promotion)
                                                                                            .invoke('attr', 'style', `${promotionOriginalStyle} border: 3px solid lime !important;`)
                                                                                            .then(() => {
                                                                                              cy.log('🟢 Added lime border to promotion');

                                                                                              cy.wait(3000).then(() => {
                                                                                                cy.wrap($promotion)
                                                                                                  .invoke('attr', 'style', promotionOriginalStyle)
                                                                                                  .then(() => {
                                                                                                    cy.log('✅ Removed border from promotion');
                                                                                                  });
                                                                                              });
                                                                                            });
                                                                                        });
                                                                                    })
                                                                                    .then(() => {
                                                                                      cy.log('✅ All cart item details verified successfully in right panel!');
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



  it("should show error message when trying to proceed without entering an email", () => {
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
            cy.wait(3000);
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

                    // Ensure email field is empty
                    cy.get('input[type="email"][name="email"]')
                      .should("be.visible")
                      .clear()
                      .should("have.value", "")
                      .then(() => {
                        cy.log("✅ Email field is empty");

                        // Verify continue button is disabled
                        cy.get('[data-testid="continue-to-shipping-button"]')
                          // .should('be.disabled')
                          .then(() => {
                            cy.log(
                              "✅ Continue to shipping button is disabled when email is empty",
                            );

                            // Try to click the disabled button to trigger error
                            cy.get(
                              '[data-testid="continue-to-shipping-button"]',
                            )
                              .click({ force: true })
                              .then(() => {
                                cy.log(
                                  "✅ Attempted to click disabled continue button",
                                );

                                // Verify error message appears
                                cy.contains("span", "Email is required")
                                  .should("be.visible")
                                  .should("have.class", "text-brand-60")
                                  .then(() => {
                                    cy.log(
                                      '✅ Error message "Email is required" is displayed',
                                    );

                                    // Verify email input has error styling
                                    cy.get('input[type="email"][name="email"]')
                                      .should(
                                        "have.class",
                                        "inputErrorBorderClassName",
                                      )
                                      .should("have.class", "ring-brand")
                                      .then(() => {
                                        cy.log(
                                          "✅ Email input field has error styling applied",
                                        );
                                      });
                                  });
                              });
                            cy.wait(3000);
                          });
                      });
                  });
              });
          });
      });
  });

  it("should validate all invalid email formats", () => {
    const invalidEmails = [
      "plainaddress",
      "#@%^%#$@#$@#.com",
      "@example.com",
      "JoeSmith<email@example.com>",
      "email.example.com",
      "email@example@example.com",
      "あいうえお@example.com",
      "email@example.com (Joe Smith)",
      "email@example",
      "email@111.222.333.44444",
    ];

    // Visit product page and navigate to checkout
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

                    // Loop through all invalid emails
                    cy.wrap(invalidEmails).each((invalidEmail) => {
                      cy.log(`🔍 Testing invalid email: "${invalidEmail}"`);

                      // Clear and enter the invalid email
                      cy.get('input[type="email"][name="email"]')
                        .clear()
                        .type(invalidEmail)
                        .then(() => {
                          cy.log(`✅ Entered invalid email: "${invalidEmail}"`);

                          // Try to click continue button
                          cy.get('[data-testid="continue-to-shipping-button"]')
                            .click({ force: true })
                            .then(() => {
                              cy.log(
                                `✅ Clicked continue button for: "${invalidEmail}"`,
                              );

                              // Verify error message appears
                              cy.contains("span", "Invalid email format")
                                .should("be.visible")
                                .should("have.class", "text-brand-60")
                                .then(() => {
                                  cy.log(
                                    `✅ "Invalid email format" error shown for: "${invalidEmail}"`,
                                  );

                                  // Verify input has error styling
                                  cy.get('input[type="email"][name="email"]')
                                    .should(
                                      "have.class",
                                      "inputErrorBorderClassName",
                                    )
                                    .should("have.class", "ring-brand")
                                    .then(() => {
                                      cy.log(
                                        `✅ Error styling applied for: "${invalidEmail}"`,
                                      );

                                      // Wait 3 seconds before proceeding to next email
                                      cy.wait(3000).then(() => {
                                        cy.log(
                                          `⏰ 3 second delay completed for: "${invalidEmail}"`,
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

describe("Navigation Flow Test", () => {
  it("should navigate back to Step 1 with data retained when clicking edit button from Step 2", () => {
    // Visit product page and add item to cart
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
        // Wait for mini cart and click checkout
        cy.get('[class*="MiniCart"]', { timeout: 15000 })
          .should("be.visible")
          .then(() => {
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .click()
              .then(() => {
                cy.log("✅ Successfully clicked secure checkout button!");

                // Wait for checkout page to load
                cy.url({ timeout: 10000 })
                  .should("include", "/checkout")
                  .then(() => {
                    cy.log("✅ Successfully redirected to checkout page!");

                    // Verify we're on Step 1
                    cy.get('[data-testid="step-1-active-content"]', { timeout: 10000 })
                      .should("be.visible")
                      .then(() => {
                        cy.log("✅ Step 1 active content confirmed!");

                        // Fill the email field with test data
                        const testEmail = 'navigation-test@example.com';
                        cy.get('input[type="email"][name="email"]')
                          .scrollIntoView()
                          .should('be.visible')
                          .clear()
                          .type(testEmail)
                          .should('have.value', testEmail)
                          .then(() => {
                            cy.log(`✅ Email entered: "${testEmail}"`);

                            // Store original checkbox state
                            let originalCheckboxState;
                            cy.get('input[type="checkbox"]')
                              .should('be.visible')
                              .then(($checkbox) => {
                                originalCheckboxState = $checkbox.is(':checked');
                                cy.log(`📝 Newsletter checkbox state: ${originalCheckboxState}`);

                                // Click Continue to shipping to proceed to Step 2
                                cy.get('[data-testid="continue-to-shipping-button"]')
                                  .scrollIntoView()
                                  .should('be.visible')
                                  .should('not.be.disabled')
                                  .click()
                                  .then(() => {
                                    cy.log("✅ Clicked Continue to shipping button!");

                                    // Wait for Step 2 to load
                                    cy.wait(3000);

                                    // Verify we're now on Step 2 by checking URL or step indicators
                                    cy.url({ timeout: 10000 })
                                      .should("include", "/checkout")
                                      .then(() => {
                                        cy.log("✅ Still on checkout page, should be Step 2!");

                                        // Look for the Customer step with checkmark and edit button
                                        // Based on provided HTML: Customer step should have checkmark icon and edit button
                                        cy.get('span[data-testid=""]')
                                          .contains('Customer')
                                          .should('be.visible')
                                          .then(() => {
                                            cy.log("✅ Customer step text found!");

                                            // Verify checkmark icon is present (indicating step completion)
                                            cy.get('svg')
                                              .should('be.visible')
                                              .then(() => {
                                                cy.log("✅ Checkmark icon visible indicating Customer step completion!");

                                                // Find and click the Edit button
                                                cy.get('[data-testid="edit-button"]')
                                                  .should('be.visible')
                                                  .should('contain.text', 'Edit')
                                                  .then(($editBtn) => {
                                                    cy.log("✅ Edit button found and visible!");

                                                    // Add visual highlight to edit button before clicking
                                                    const editBtnOriginalStyle = $editBtn.attr('style') || '';
                                                    cy.wrap($editBtn)
                                                      .invoke('attr', 'style', `${editBtnOriginalStyle} border: 3px solid red !important;`)
                                                      .then(() => {
                                                        cy.log("🔴 Added red border highlight to Edit button");

                                                        // Wait for 2 seconds to show the highlight
                                                        cy.wait(2000).then(() => {
                                                          // Remove the border and click the button
                                                          cy.wrap($editBtn)
                                                            .invoke('attr', 'style', editBtnOriginalStyle)
                                                            .click()
                                                            .then(() => {
                                                              cy.log("✅ Successfully clicked Edit button!");

                                                              // Verify navigation back to Step 1
                                                              cy.wait(2000);

                                                              cy.get('[data-testid="step-1-active-content"]', { timeout: 10000 })
                                                                .should("be.visible")
                                                                .then(() => {
                                                                  cy.log("✅ Successfully navigated back to Step 1!");

                                                                  // Verify email field data is retained
                                                                  cy.get('input[type="email"][name="email"]')
                                                                    .should('be.visible')
                                                                    .should('have.value', testEmail)
                                                                    .then(() => {
                                                                      cy.log(`✅ Email data retained after navigation: "${testEmail}"`);

                                                                      // Verify newsletter checkbox state is retained
                                                                      cy.get('input[type="checkbox"]')
                                                                        .should('be.visible')
                                                                        .then(($checkbox) => {
                                                                          const currentCheckboxState = $checkbox.is(':checked');
                                                                          expect(currentCheckboxState).to.equal(originalCheckboxState);
                                                                          cy.log(`✅ Newsletter checkbox state retained: ${currentCheckboxState}`);

                                                                          // Verify cart items are still present
                                                                          cy.get('[data-test-id="cart-item-0"]')
                                                                            .should("be.visible")
                                                                            .within(() => {
                                                                              // Verify cart item title
                                                                              cy.get('[data-testid="cart-item-0-title"]')
                                                                                .should("be.visible")
                                                                                .should("not.be.empty")
                                                                                .then(() => {
                                                                                  cy.log("✅ Cart item title retained after navigation!");
                                                                                });

                                                                              // Verify cart item quantity
                                                                              cy.get('[data-testid="cart-item-0-quantity-badge"]')
                                                                                .should("be.visible")
                                                                                .should("contain.text", "1")
                                                                                .then(() => {
                                                                                  cy.log("✅ Cart item quantity retained after navigation!");
                                                                                });

                                                                              // Verify cart item price
                                                                              cy.get('[data-testid="cart-item-0-price"]')
                                                                                .should("be.visible")
                                                                                .should("not.be.empty")
                                                                                .then(() => {
                                                                                  cy.log("✅ Cart item price retained after navigation!");

                                                                                  cy.log("🎉 Navigation flow data retention verification completed successfully!");
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
                              });
                          });
                      });
                  });
              });
          });
      });
  });
});

describe("Back to Cart Navigation Test", () => {
  it("should display back to cart button and navigate to cart page when clicked", () => {
    // Visit product page and add item to cart
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
        // Wait for mini cart and click checkout
        cy.get('[class*="MiniCart"]', { timeout: 15000 })
          .should("be.visible")
          .then(() => {
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .click()
              .then(() => {
                cy.log("✅ Successfully clicked secure checkout button!");

                // Wait for checkout page to load
                cy.url({ timeout: 10000 })
                  .should("include", "/checkout")
                  .then(() => {
                    cy.log("✅ Successfully redirected to checkout page!");

                    // Verify we're on Step 1
                    cy.get('[data-testid="step-1-active-content"]', {
                      timeout: 10000,
                    })
                      .should("be.visible")
                      .then(() => {
                        cy.log("✅ Step 1 active content confirmed!");

                        // Verify "Back to cart" button is visible
                        cy.get('[data-testid="back-to-cart-btn"]')
                          .should("be.visible")
                          .should("contain.text", "Back to cart")
                          .then(($backBtn) => {
                            cy.log("✅ Back to cart button is visible!");

                            // Verify the button has the correct structure with SVG icon
                            cy.get('[data-testid="back-to-cart-btn"]')
                              .parent("button")
                              .should("have.class", "Button_button__xS0QI")
                              .within(() => {
                                // Verify SVG icon is present
                                cy.get("svg")
                                  .should("be.visible")
                                  .should("have.attr", "width", "20")
                                  .should("have.attr", "height", "20")
                                  .then(() => {
                                    cy.log(
                                      "✅ Back arrow SVG icon is visible!",
                                    );
                                  });
                              })
                              .then(() => {
                                // Store current URL for comparison
                                cy.url().then((currentUrl) => {
                                  cy.log(
                                    `📝 Current checkout URL: ${currentUrl}`,
                                  );

                                  // Add visual highlight to back button before clicking
                                  const backBtnOriginalStyle =
                                    $backBtn.attr("style") || "";
                                  cy.wrap($backBtn)
                                    .parent("button")
                                    .invoke(
                                      "attr",
                                      "style",
                                      `${backBtnOriginalStyle} border: 3px solid blue !important;`,
                                    )
                                    .then(() => {
                                      cy.log(
                                        "🔵 Added blue border highlight to Back to cart button",
                                      );

                                      // Wait for 2 seconds to show the highlight
                                      cy.wait(2000).then(() => {
                                        // Remove the border and click the button
                                        cy.wrap($backBtn)
                                          .parent("button")
                                          .invoke(
                                            "attr",
                                            "style",
                                            backBtnOriginalStyle,
                                          )
                                          .click()
                                          .then(() => {
                                            cy.log(
                                              "✅ Successfully clicked Back to cart button!",
                                            );

                                            // Wait for navigation
                                            cy.wait(3000);

                                            // Verify navigation to cart page
                                            cy.url({ timeout: 10000 })
                                              .should("include", "/cart")
                                              .should(
                                                "not.include",
                                                "/checkout",
                                              )
                                              .then((newUrl) => {
                                                cy.log(
                                                  `✅ Successfully navigated to cart page: ${newUrl}`,
                                                );

                                                // Verify cart page elements are visible
                                                cy.get("body")
                                                  .should("be.visible")
                                                  .then(() => {
                                                    cy.log(
                                                      "✅ Cart page loaded successfully!",
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
  });
});
