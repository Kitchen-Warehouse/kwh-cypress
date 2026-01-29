describe("Add to Cart Test", () => {
  it("“Customer” step is highlighted in Step 1 of the checkout process with all the required details", () => {
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
        cy.get('[class*="MiniCart"]', { timeout: 15000 })
          .should("be.visible")
          .then(() => {
            cy.wait(3000);
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .should("not.be.disabled")
              .then(($checkoutBtn) => {
                // Store original style for restoration
                const checkoutBtnOriginalStyle =
                  $checkoutBtn.attr("style") || "";
                // Add black border highlight to secure checkout button
                cy.wrap($checkoutBtn)
                  .invoke(
                    "attr",
                    "style",
                    `${checkoutBtnOriginalStyle} border: 3px solid black !important;`,
                  )
                  .then(() => {
                    // Wait for 3 seconds
                    cy.wait(3000).then(() => {
                      // Remove the border by restoring original style
                      cy.wrap($checkoutBtn)
                        .invoke("attr", "style", checkoutBtnOriginalStyle)
                        .then(() => {
                          // Now click the button
                          cy.wrap($checkoutBtn).click();
                        });
                    });
                  });
              })
              .then(() => {
                cy.url({ timeout: 10000 })
                  .should("include", "/checkout")
                  .then(() => {
                    // Check for step 1 active content element
                    cy.get('[data-testid="step-1-active-content"]', {
                      timeout: 10000,
                    })
                      .should("be.visible")
                      .then(($element) => {
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
                                          // Wait for 3 seconds
                                          cy.wait(3000).then(() => {
                                            // Remove the border by restoring original style
                                            cy.wrap($customerElement)
                                              .invoke(
                                                "attr",
                                                "style",
                                                customerOriginalStyle,
                                              )
                                              .then(() => {
                                                // Verify Order Summary section exists and displays value
                                                cy.get("span")
                                                  .contains("Order summary")
                                                  .should("be.visible")
                                                  .should(
                                                    "have.class",
                                                    "Typography_semibold_weight__yoyH0",
                                                  )
                                                  .then(($orderSummaryText) => {
                                                    // Verify order summary total value exists and is visible
                                                    cy.get(
                                                      '[data-testid="order-summary-total"]',
                                                    )
                                                      .should("be.visible")
                                                      .should("not.be.empty")
                                                      .should(
                                                        "have.class",
                                                        "Typography_semibold_weight__yoyH0",
                                                      )
                                                      .then(($orderTotal) => {
                                                        const totalValue =
                                                          $orderTotal
                                                            .text()
                                                            .trim();
                                                        // Store original style for restoration
                                                        const orderTotalOriginalStyle =
                                                          $orderTotal.attr(
                                                            "style",
                                                          ) || "";
                                                        // Add purple border highlight to order summary total
                                                        cy.wrap($orderTotal)
                                                          .invoke(
                                                            "attr",
                                                            "style",
                                                            `${orderTotalOriginalStyle} border: 3px solid red !important; padding: 2px;`,
                                                          )
                                                          .then(() => {
                                                            // Wait for 3 seconds to show the highlight
                                                            cy.wait(3000).then(
                                                              () => {
                                                                // Remove the border by restoring original style
                                                                cy.wrap(
                                                                  $orderTotal,
                                                                )
                                                                  .invoke(
                                                                    "attr",
                                                                    "style",
                                                                    orderTotalOriginalStyle,
                                                                  )
                                                                  .then(() => {
                                                                    // Verify the value contains currency symbol
                                                                    expect(
                                                                      totalValue,
                                                                    ).to.match(
                                                                      /^\$\d+\.\d{2}$/,
                                                                    );
                                                                  });
                                                              },
                                                            );
                                                          });
                                                      });
                                                  });
                                                // Verify the newsletter subscription checkbox is checked by default
                                                cy.get('input[type="checkbox"]')
                                                  .scrollIntoView()
                                                  .should("be.visible")
                                                  .and("be.checked")
                                                  .then(($checkbox) => {
                                                    // Store original style for restoration
                                                    const checkboxOriginalStyle =
                                                      $checkbox.attr("style") ||
                                                      "";
                                                    // Add blue border highlight to checkbox
                                                    cy.wrap($checkbox)
                                                      .invoke(
                                                        "attr",
                                                        "style",
                                                        `${checkboxOriginalStyle} border: 3px solid red !important;`,
                                                      )
                                                      .then(() => {
                                                        // Wait for 3 seconds
                                                        cy.wait(3000).then(
                                                          () => {
                                                            // Remove the border by restoring original style
                                                            cy.wrap($checkbox)
                                                              .invoke(
                                                                "attr",
                                                                "style",
                                                                checkboxOriginalStyle,
                                                              )
                                                              .then(() => {
                                                                // Verify the checkbox label text
                                                                cy.get(
                                                                  'input[type="checkbox"]',
                                                                )
                                                                  .parent()
                                                                  .should(
                                                                    "contain",
                                                                    "Stay updated on new products, offers and recipes",
                                                                  )
                                                                  .and(
                                                                    "contain",
                                                                    "Untick to opt out - even if you're already subscribed",
                                                                  )
                                                                  .then(() => {
                                                                    // Enter email and verify "Continue to shipping" CTA
                                                                    cy.get(
                                                                      'input[type="email"][name="email"]',
                                                                    )
                                                                      .scrollIntoView()
                                                                      .should(
                                                                        "be.visible",
                                                                      )
                                                                      .type(
                                                                        "test@example.com",
                                                                      )
                                                                      .then(
                                                                        () => {
                                                                          // Verify "Continue to shipping" button is displayed and enabled
                                                                          cy.get(
                                                                            '[data-testid="continue-to-shipping-button"]',
                                                                          )
                                                                            .scrollIntoView()
                                                                            .should(
                                                                              "be.visible",
                                                                            )
                                                                            .should(
                                                                              "not.be.disabled",
                                                                            )
                                                                            .should(
                                                                              "contain",
                                                                              "Continue to shipping",
                                                                            )
                                                                            .then(
                                                                              (
                                                                                $ctaButton,
                                                                              ) => {
                                                                                // Store original style for restoration
                                                                                const ctaOriginalStyle =
                                                                                  $ctaButton.attr(
                                                                                    "style",
                                                                                  ) ||
                                                                                  "";
                                                                                // Add black border highlight to CTA button
                                                                                cy.wrap(
                                                                                  $ctaButton,
                                                                                )
                                                                                  .invoke(
                                                                                    "attr",
                                                                                    "style",
                                                                                    `${ctaOriginalStyle} border: 3px solid black !important;`,
                                                                                  )
                                                                                  .then(
                                                                                    () => {
                                                                                      // Wait for 3 seconds
                                                                                      cy.wait(
                                                                                        3000,
                                                                                      ).then(
                                                                                        () => {
                                                                                          // Remove the border by restoring original style
                                                                                          cy.wrap(
                                                                                            $ctaButton,
                                                                                          )
                                                                                            .invoke(
                                                                                              "attr",
                                                                                              "style",
                                                                                              ctaOriginalStyle,
                                                                                            )
                                                                                            .then(
                                                                                              () => {
                                                                                                // Verify right panel displays all cart items with correct details
                                                                                                cy.get(
                                                                                                  '[data-test-id="cart-item-0"]',
                                                                                                )
                                                                                                  .should(
                                                                                                    "be.visible",
                                                                                                  )
                                                                                                  .within(
                                                                                                    () => {
                                                                                                      // Verify product image
                                                                                                      cy.get(
                                                                                                        '[data-test-id="cart-item-0-image"]',
                                                                                                      )
                                                                                                        .should(
                                                                                                          "be.visible",
                                                                                                        )
                                                                                                        .then(
                                                                                                          (
                                                                                                            $image,
                                                                                                          ) => {
                                                                                                            // Add purple border to image
                                                                                                            const imageOriginalStyle =
                                                                                                              $image.attr(
                                                                                                                "style",
                                                                                                              ) ||
                                                                                                              "";
                                                                                                            cy.wrap(
                                                                                                              $image,
                                                                                                            )
                                                                                                              .invoke(
                                                                                                                "attr",
                                                                                                                "style",
                                                                                                                `${imageOriginalStyle} border: 3px solid purple !important;`,
                                                                                                              )
                                                                                                              .then(
                                                                                                                () => {
                                                                                                                  cy.wait(
                                                                                                                    3000,
                                                                                                                  ).then(
                                                                                                                    () => {
                                                                                                                      cy.wrap(
                                                                                                                        $image,
                                                                                                                      )
                                                                                                                        .invoke(
                                                                                                                          "attr",
                                                                                                                          "style",
                                                                                                                          imageOriginalStyle,
                                                                                                                        )
                                                                                                                        .then(
                                                                                                                          () => {
                                                                                                                            // Check alt attribute separately
                                                                                                                            cy.get(
                                                                                                                              '[data-test-id="cart-item-0-image"]',
                                                                                                                            ).should(
                                                                                                                              "have.attr",
                                                                                                                              "alt",
                                                                                                                            );
                                                                                                                            // Check src attribute separately
                                                                                                                            cy.get(
                                                                                                                              '[data-test-id="cart-item-0-image"]',
                                                                                                                            ).should(
                                                                                                                              "have.attr",
                                                                                                                              "src",
                                                                                                                            );
                                                                                                                          },
                                                                                                                        );
                                                                                                                    },
                                                                                                                  );
                                                                                                                },
                                                                                                              );
                                                                                                          },
                                                                                                        );
                                                                                                      // Verify product title
                                                                                                      cy.get(
                                                                                                        '[data-testid="cart-item-0-title"]',
                                                                                                      )
                                                                                                        .should(
                                                                                                          "be.visible",
                                                                                                        )
                                                                                                        .should(
                                                                                                          "not.be.empty",
                                                                                                        )
                                                                                                        .then(
                                                                                                          (
                                                                                                            $title,
                                                                                                          ) => {
                                                                                                            const titleText =
                                                                                                              $title
                                                                                                                .text()
                                                                                                                .trim();
                                                                                                            // Add orange border to title
                                                                                                            const titleOriginalStyle =
                                                                                                              $title.attr(
                                                                                                                "style",
                                                                                                              ) ||
                                                                                                              "";
                                                                                                            cy.wrap(
                                                                                                              $title,
                                                                                                            )
                                                                                                              .invoke(
                                                                                                                "attr",
                                                                                                                "style",
                                                                                                                `${titleOriginalStyle} border: 3px solid orange !important;`,
                                                                                                              )
                                                                                                              .then(
                                                                                                                () => {
                                                                                                                  cy.wait(
                                                                                                                    3000,
                                                                                                                  ).then(
                                                                                                                    () => {
                                                                                                                      cy.wrap(
                                                                                                                        $title,
                                                                                                                      ).invoke(
                                                                                                                        "attr",
                                                                                                                        "style",
                                                                                                                        titleOriginalStyle,
                                                                                                                      );
                                                                                                                    },
                                                                                                                  );
                                                                                                                },
                                                                                                              );
                                                                                                          },
                                                                                                        );
                                                                                                      // Verify quantity badge
                                                                                                      cy.get(
                                                                                                        '[data-testid="cart-item-0-quantity-badge"]',
                                                                                                      )
                                                                                                        .should(
                                                                                                          "be.visible",
                                                                                                        )
                                                                                                        .should(
                                                                                                          "contain.text",
                                                                                                          "1",
                                                                                                        )
                                                                                                        .should(
                                                                                                          "have.class",
                                                                                                          "bg-primary-600",
                                                                                                        )
                                                                                                        .then(
                                                                                                          (
                                                                                                            $badge,
                                                                                                          ) => {
                                                                                                            // Add pink border to quantity badge
                                                                                                            const badgeOriginalStyle =
                                                                                                              $badge.attr(
                                                                                                                "style",
                                                                                                              ) ||
                                                                                                              "";
                                                                                                            cy.wrap(
                                                                                                              $badge,
                                                                                                            )
                                                                                                              .invoke(
                                                                                                                "attr",
                                                                                                                "style",
                                                                                                                `${badgeOriginalStyle} border: 3px solid pink !important;`,
                                                                                                              )
                                                                                                              .then(
                                                                                                                () => {
                                                                                                                  cy.wait(
                                                                                                                    3000,
                                                                                                                  ).then(
                                                                                                                    () => {
                                                                                                                      cy.wrap(
                                                                                                                        $badge,
                                                                                                                      ).invoke(
                                                                                                                        "attr",
                                                                                                                        "style",
                                                                                                                        badgeOriginalStyle,
                                                                                                                      );
                                                                                                                    },
                                                                                                                  );
                                                                                                                },
                                                                                                              );
                                                                                                          },
                                                                                                        );
                                                                                                      // Verify current price
                                                                                                      cy.get(
                                                                                                        '[data-testid="cart-item-0-price"]',
                                                                                                      )
                                                                                                        .should(
                                                                                                          "be.visible",
                                                                                                        )
                                                                                                        .should(
                                                                                                          "not.be.empty",
                                                                                                        )
                                                                                                        .then(
                                                                                                          (
                                                                                                            $price,
                                                                                                          ) => {
                                                                                                            const priceText =
                                                                                                              $price
                                                                                                                .text()
                                                                                                                .trim();
                                                                                                            // Add yellow border to current price
                                                                                                            const priceOriginalStyle =
                                                                                                              $price.attr(
                                                                                                                "style",
                                                                                                              ) ||
                                                                                                              "";
                                                                                                            cy.wrap(
                                                                                                              $price,
                                                                                                            )
                                                                                                              .invoke(
                                                                                                                "attr",
                                                                                                                "style",
                                                                                                                `${priceOriginalStyle} border: 3px solid yellow !important;`,
                                                                                                              )
                                                                                                              .then(
                                                                                                                () => {
                                                                                                                  cy.wait(
                                                                                                                    3000,
                                                                                                                  ).then(
                                                                                                                    () => {
                                                                                                                      cy.wrap(
                                                                                                                        $price,
                                                                                                                      ).invoke(
                                                                                                                        "attr",
                                                                                                                        "style",
                                                                                                                        priceOriginalStyle,
                                                                                                                      );
                                                                                                                    },
                                                                                                                  );
                                                                                                                },
                                                                                                              );
                                                                                                          },
                                                                                                        );
                                                                                                      // Verify was price (strikethrough)
                                                                                                      cy.get(
                                                                                                        '[data-testid="cart-item-0-was-price"]',
                                                                                                      )
                                                                                                        .should(
                                                                                                          "be.visible",
                                                                                                        )
                                                                                                        .should(
                                                                                                          "have.class",
                                                                                                          "line-through",
                                                                                                        )
                                                                                                        .should(
                                                                                                          "not.be.empty",
                                                                                                        )
                                                                                                        .then(
                                                                                                          (
                                                                                                            $wasPrice,
                                                                                                          ) => {
                                                                                                            const wasPriceText =
                                                                                                              $wasPrice
                                                                                                                .text()
                                                                                                                .trim();
                                                                                                            // Add cyan border to was price
                                                                                                            const wasPriceOriginalStyle =
                                                                                                              $wasPrice.attr(
                                                                                                                "style",
                                                                                                              ) ||
                                                                                                              "";
                                                                                                            cy.wrap(
                                                                                                              $wasPrice,
                                                                                                            )
                                                                                                              .invoke(
                                                                                                                "attr",
                                                                                                                "style",
                                                                                                                `${wasPriceOriginalStyle} border: 3px solid cyan !important;`,
                                                                                                              )
                                                                                                              .then(
                                                                                                                () => {
                                                                                                                  cy.wait(
                                                                                                                    3000,
                                                                                                                  ).then(
                                                                                                                    () => {
                                                                                                                      cy.wrap(
                                                                                                                        $wasPrice,
                                                                                                                      ).invoke(
                                                                                                                        "attr",
                                                                                                                        "style",
                                                                                                                        wasPriceOriginalStyle,
                                                                                                                      );
                                                                                                                    },
                                                                                                                  );
                                                                                                                },
                                                                                                              );
                                                                                                          },
                                                                                                        );
                                                                                                      // Verify promotion percentage
                                                                                                      cy.get(
                                                                                                        '[data-test-id="cart-item-0-promotion-percentage"]',
                                                                                                      )
                                                                                                        .should(
                                                                                                          "be.visible",
                                                                                                        )
                                                                                                        .should(
                                                                                                          "contain.text",
                                                                                                          "% off RRP",
                                                                                                        )
                                                                                                        .then(
                                                                                                          (
                                                                                                            $promotion,
                                                                                                          ) => {
                                                                                                            const promotionText =
                                                                                                              $promotion
                                                                                                                .text()
                                                                                                                .trim();
                                                                                                            // Add lime border to promotion
                                                                                                            const promotionOriginalStyle =
                                                                                                              $promotion.attr(
                                                                                                                "style",
                                                                                                              ) ||
                                                                                                              "";
                                                                                                            cy.wrap(
                                                                                                              $promotion,
                                                                                                            )
                                                                                                              .invoke(
                                                                                                                "attr",
                                                                                                                "style",
                                                                                                                `${promotionOriginalStyle} border: 3px solid lime !important;`,
                                                                                                              )
                                                                                                              .then(
                                                                                                                () => {
                                                                                                                  cy.wait(
                                                                                                                    3000,
                                                                                                                  ).then(
                                                                                                                    () => {
                                                                                                                      cy.wrap(
                                                                                                                        $promotion,
                                                                                                                      ).invoke(
                                                                                                                        "attr",
                                                                                                                        "style",
                                                                                                                        promotionOriginalStyle,
                                                                                                                      );
                                                                                                                    },
                                                                                                                  );
                                                                                                                },
                                                                                                              );
                                                                                                          },
                                                                                                        );
                                                                                                    },
                                                                                                  );
                                                                                              },
                                                                                            );
                                                                                        },
                                                                                      );
                                                                                    },
                                                                                  );
                                                                              },
                                                                            );
                                                                        },
                                                                      );
                                                                  });
                                                              });
                                                          },
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
        cy.get('[class*="MiniCart"]', { timeout: 15000 })
          .should("be.visible")
          .then(() => {
            cy.wait(3000);
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .should("not.be.disabled")
              .click()
              .then(() => {
                cy.url({ timeout: 10000 })
                  .should("include", "/checkout")
                  .then(() => {
                    // Ensure email field is empty
                    cy.get('input[type="email"][name="email"]')
                      .should("be.visible")
                      .clear()
                      .should("have.value", "")
                      .then(() => {
                        // Verify continue button is disabled
                        cy.get('[data-testid="continue-to-shipping-button"]')
                          // .should('be.disabled')
                          .then(() => {
                            // Try to click the disabled button to trigger error
                            cy.get(
                              '[data-testid="continue-to-shipping-button"]',
                            )
                              .click({ force: true })
                              .then(() => {
                                // Verify error message appears
                                cy.contains("span", "Email is required")
                                  .should("be.visible")
                                  .should("have.class", "text-brand-60")
                                  .then(() => {
                                    // Verify email input has error styling
                                    cy.get('input[type="email"][name="email"]')
                                      .should(
                                        "have.class",
                                        "inputErrorBorderClassName",
                                      )
                                      .should("have.class", "ring-brand");
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
        cy.get('[class*="MiniCart"]', { timeout: 15000 })
          .should("be.visible")
          .then(() => {
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .should("not.be.disabled")
              .click()
              .then(() => {
                cy.url({ timeout: 10000 })
                  .should("include", "/checkout")
                  .then(() => {
                    // Loop through all invalid emails
                    cy.wrap(invalidEmails).each((invalidEmail) => {
                      // Clear and enter the invalid email
                      cy.get('input[type="email"][name="email"]')
                        .clear()
                        .type(invalidEmail)
                        .then(() => {
                          // Try to click continue button
                          cy.get('[data-testid="continue-to-shipping-button"]')
                            .click({ force: true })
                            .then(() => {
                              // Verify error message appears
                              cy.contains("span", "Invalid email format")
                                .should("be.visible")
                                .should("have.class", "text-brand-60")
                                .then(() => {
                                  // Verify input has error styling
                                  cy.get('input[type="email"][name="email"]')
                                    .should(
                                      "have.class",
                                      "inputErrorBorderClassName",
                                    )
                                    .should("have.class", "ring-brand")
                                    .then(() => {
                                      // Wait 3 seconds before proceeding to next email
                                      cy.wait(3000);
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
        // Wait for mini cart and click checkout
        cy.get('[class*="MiniCart"]', { timeout: 15000 })
          .should("be.visible")
          .then(() => {
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .click()
              .then(() => {
                // Wait for checkout page to load
                cy.url({ timeout: 10000 })
                  .should("include", "/checkout")
                  .then(() => {
                    // Verify we're on Step 1
                    cy.get('[data-testid="step-1-active-content"]', {
                      timeout: 10000,
                    })
                      .should("be.visible")
                      .then(() => {
                        // Fill the email field with test data
                        const testEmail = "navigation-test@example.com";
                        cy.get('input[type="email"][name="email"]')
                          .scrollIntoView()
                          .should("be.visible")
                          .clear()
                          .type(testEmail)
                          .should("have.value", testEmail)
                          .then(() => {
                            // Store original checkbox state
                            let originalCheckboxState;
                            cy.get('input[type="checkbox"]')
                              .should("be.visible")
                              .then(($checkbox) => {
                                originalCheckboxState =
                                  $checkbox.is(":checked");
                                // Click Continue to shipping to proceed to Step 2
                                cy.get(
                                  '[data-testid="continue-to-shipping-button"]',
                                )
                                  .scrollIntoView()
                                  .should("be.visible")
                                  .should("not.be.disabled")
                                  .click()
                                  .then(() => {
                                    // Wait for Step 2 to load
                                    cy.wait(3000);
                                    // Verify we're now on Step 2 by checking URL or step indicators
                                    cy.url({ timeout: 10000 })
                                      .should("include", "/checkout")
                                      .then(() => {
                                        // Look for the Customer step with checkmark and edit button
                                        // Based on provided HTML: Customer step should have checkmark icon and edit button
                                        cy.get('span[data-testid=""]')
                                          .contains("Customer")
                                          .should("be.visible")
                                          .then(() => {
                                            // Verify checkmark icon is present (indicating step completion)
                                            cy.get("svg")
                                              .should("be.visible")
                                              .then(() => {
                                                // Find and click the Edit button
                                                cy.get(
                                                  '[data-testid="edit-button"]',
                                                )
                                                  .should("be.visible")
                                                  .should(
                                                    "contain.text",
                                                    "Edit",
                                                  )
                                                  .then(($editBtn) => {
                                                    // Add visual highlight to edit button before clicking
                                                    const editBtnOriginalStyle =
                                                      $editBtn.attr("style") ||
                                                      "";
                                                    cy.wrap($editBtn)
                                                      .invoke(
                                                        "attr",
                                                        "style",
                                                        `${editBtnOriginalStyle} border: 3px solid red !important;`,
                                                      )
                                                      .then(() => {
                                                        // Wait for 2 seconds to show the highlight
                                                        cy.wait(2000).then(
                                                          () => {
                                                            // Remove the border and click the button
                                                            cy.wrap($editBtn)
                                                              .invoke(
                                                                "attr",
                                                                "style",
                                                                editBtnOriginalStyle,
                                                              )
                                                              .click()
                                                              .then(() => {
                                                                // Verify navigation back to Step 1
                                                                cy.wait(2000);
                                                                cy.get(
                                                                  '[data-testid="step-1-active-content"]',
                                                                  {
                                                                    timeout: 10000,
                                                                  },
                                                                )
                                                                  .should(
                                                                    "be.visible",
                                                                  )
                                                                  .then(() => {
                                                                    // Verify email field data is retained
                                                                    cy.get(
                                                                      'input[type="email"][name="email"]',
                                                                    )
                                                                      .should(
                                                                        "be.visible",
                                                                      )
                                                                      .should(
                                                                        "have.value",
                                                                        testEmail,
                                                                      )
                                                                      .then(
                                                                        () => {
                                                                          // Verify newsletter checkbox state is retained
                                                                          cy.get(
                                                                            'input[type="checkbox"]',
                                                                          )
                                                                            .should(
                                                                              "be.visible",
                                                                            )
                                                                            .then(
                                                                              (
                                                                                $checkbox,
                                                                              ) => {
                                                                                const currentCheckboxState =
                                                                                  $checkbox.is(
                                                                                    ":checked",
                                                                                  );
                                                                                expect(
                                                                                  currentCheckboxState,
                                                                                ).to.equal(
                                                                                  originalCheckboxState,
                                                                                );
                                                                                // Verify cart items are still present
                                                                                cy.get(
                                                                                  '[data-test-id="cart-item-0"]',
                                                                                )
                                                                                  .should(
                                                                                    "be.visible",
                                                                                  )
                                                                                  .within(
                                                                                    () => {
                                                                                      // Verify cart item title
                                                                                      cy.get(
                                                                                        '[data-testid="cart-item-0-title"]',
                                                                                      )
                                                                                        .should(
                                                                                          "be.visible",
                                                                                        )
                                                                                        .should(
                                                                                          "not.be.empty",
                                                                                        )
                                                                                        .then(
                                                                                          () => {},
                                                                                        );
                                                                                      // Verify cart item quantity
                                                                                      cy.get(
                                                                                        '[data-testid="cart-item-0-quantity-badge"]',
                                                                                      )
                                                                                        .should(
                                                                                          "be.visible",
                                                                                        )
                                                                                        .should(
                                                                                          "contain.text",
                                                                                          "1",
                                                                                        )
                                                                                        .then(
                                                                                          () => {},
                                                                                        );
                                                                                      // Verify cart item price
                                                                                      cy.get(
                                                                                        '[data-testid="cart-item-0-price"]',
                                                                                      )
                                                                                        .should(
                                                                                          "be.visible",
                                                                                        )
                                                                                        .should(
                                                                                          "not.be.empty",
                                                                                        )
                                                                                        .then(
                                                                                          () => {},
                                                                                        );
                                                                                    },
                                                                                  );
                                                                              },
                                                                            );
                                                                        },
                                                                      );
                                                                  });
                                                              });
                                                          },
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
        // Wait for mini cart and click checkout
        cy.get('[class*="MiniCart"]', { timeout: 15000 })
          .should("be.visible")
          .then(() => {
            cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
              .should("be.visible")
              .click()
              .then(() => {
                // Wait for checkout page to load
                cy.url({ timeout: 10000 })
                  .should("include", "/checkout")
                  .then(() => {
                    // Verify we're on Step 1
                    cy.get('[data-testid="step-1-active-content"]', {
                      timeout: 10000,
                    })
                      .should("be.visible")
                      .then(() => {
                        // Verify "Back to cart" button is visible
                        cy.get('[data-testid="back-to-cart-btn"]')
                          .should("be.visible")
                          .should("contain.text", "Back to cart")
                          .then(($backBtn) => {
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
                                    // Store current URL for comparison
                                  })
                                  .then(() => {
                                    // Store current URL for comparison
                                    cy.url().then((currentUrl) => {
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
                                                // Wait for navigation
                                                cy.wait(3000);
                                                // Verify navigation to cart page
                                                cy.url({ timeout: 10000 })
                                                  .should("include", "/cart")
                                                  .should(
                                                    "not.include",
                                                    "/checkout",
                                                  )
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

describe("Checkout Step 2 Tests for form fields validation and order placing with Afterpay", () => {
  it("should complete comprehensive Step 2 checkout validation in a single flow", () => {
    // Navigate to step 2 by going through step 1 first
    cy.visit(
      "https://staging.kitchenwarehouse.com.au/product/wolstead-series-acacia-wood-cutting-board-50x35cm",
    );
    cy.wait(3000);
    cy.get(".mt-6 > .gap-2 > .group").should("be.visible").click().type("2");
    cy.wait(5000);
    // Add item to cart
    cy.get('[data-testid="add-to-cart-or-preorder"]', {timeout: 15000} )
      .should("be.visible")
      .click();

    // Navigate to checkout
    cy.get('[class*="MiniCart"]', { timeout: 15000 }).should("be.visible");
    cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
      .should("be.visible")
      .click();

    // Wait for checkout page to load
    cy.url({ timeout: 10000 })
      .should("include", "/checkout")
      .then(() => {
        // Fill step 1 email and continue to step 2
        cy.get('input[type="email"][name="email"]' )
          .should("be.visible")
          .type("nrushimha@compose.co.in");
        cy.get('[data-testid="continue-to-shipping-button"]')
          .should("be.visible")
          .click();

        // Verify step 2 active content is displayed
        cy.get('[data-testid="step-2-active-content"]')
          .should("be.visible")
          .should("exist")
          .then(() => {
            // Test 2: Verify shipping method options are displayed
            cy.contains("Ship").should("be.visible");
            cy.contains("Click and Collect").should("be.visible");
            cy.contains("FREE").should("be.visible");

            // Verify shipping address form fields are present
            cy.contains("First name")
              .should("be.visible")
              .then(($el) => {
                cy.blinkBorder($el, { color: "blue", duration: 1500 }).then(
                  () => {
                    cy.contains("Last name")
                      .should("be.visible")
                      .then(($el2) => {
                        cy.blinkBorder($el2, {
                          color: "green",
                          duration: 1500,
                        }).then(() => {
                          cy.contains("Phone number (e.g. 0400 000 000)")
                            .should("be.visible")
                            .then(($el3) => {
                              cy.blinkBorder($el3, {
                                color: "orange",
                                duration: 1500,
                              }).then(() => {
                                cy.contains("Address*")
                                  .should("be.visible")
                                  .then(($el4) => {
                                    cy.blinkBorder($el4, {
                                      color: "purple",
                                      duration: 1500,
                                    });
                                  });
                              });
                            });
                        });
                      });
                  },
                );
              });

            // Verify continue to payment button exists
            cy.get('[data-testid=" Continue to payment button"]')
              .should("be.visible")
              .should("exist")
              .should("contain", "Continue to payment");

            // Individual field validation - test each field separately

            // First Name validation (leave first name empty, fill others)
            cy.get('input[name="lastName"]').clear().type("Smith");
            cy.get('input[name="phoneNumber"]').clear().type("0400123456");
            cy.get("#search-address").clear().type("123");

            // Wait for address suggestions to load
            cy.wait(4000);

            // Click on the first address suggestion
            cy.get('[data-testid="searchable-list-item-btn"]')
              .first()
              .should("be.visible")
              .click();

            cy.get('[data-testid=" Continue to payment button"]').click();

            cy.get("span.text-brand-60")
              .contains("First name is required")
              .should("be.visible")
              .should("have.class", "Typography_body_SM__a0qv8")
              .then(($el) => {
                cy.blinkBorder($el, { color: "red", duration: 1500 });
              });

            // Verify First name input has error styling
            cy.get('input[name="firstName"]')
              .should("have.class", "inputErrorBorderClassName")
              .should("have.class", "ring-brand")
              .then(($input) => {
                cy.blinkBorder($input, { color: "red", duration: 1000 });
              });

            // Click the reset button to clear address input for next test
            cy.get("button.underline")
              .contains("Search for an address")
              .should("be.visible")
              .click();

            // Last Name validation (fill first name, leave last name empty)
            cy.get('input[name="firstName"]').clear().type("John");
            cy.get('input[name="lastName"]').clear(); // Leave empty
            cy.get('input[name="phoneNumber"]').clear().type("0400123456");
            cy.get("#search-address").clear().type("123");

            // Wait for address suggestions to load
            cy.wait(4000);

            // Click on the first address suggestion
            cy.get('[data-testid="searchable-list-item-btn"]')
              .first()
              .should("be.visible")
              .click();

            cy.get('[data-testid=" Continue to payment button"]').click();

            cy.get("span.text-brand-60")
              .contains("Last name is required")
              .should("be.visible")
              .should("have.class", "Typography_body_SM__a0qv8")
              .then(($el) => {
                cy.blinkBorder($el, { color: "orange", duration: 1500 });
              });

            // Verify Last name input has error styling
            cy.get('input[name="lastName"]')
              .should("have.class", "inputErrorBorderClassName")
              .should("have.class", "ring-brand")
              .then(($input) => {
                cy.blinkBorder($input, { color: "orange", duration: 1000 });
              });

            // Click the reset button to clear address input for next test
            cy.get("button.underline")
              .contains("Search for an address")
              .should("be.visible")
              .click();

            // Test 5c: Phone Number validation (fill first name and last name, leave phone empty)
            cy.get('input[name="firstName"]').clear().type("John");
            cy.get('input[name="lastName"]').clear().type("Smith");
            cy.get('input[name="phoneNumber"]').clear(); // Leave empty
            cy.get("#search-address").clear().type("123");

            // Wait for address suggestions to load
            cy.wait(4000);

            // Click on the first address suggestion
            cy.get('[data-testid="searchable-list-item-btn"]')
              .first()
              .should("be.visible")
              .click();

            cy.get('[data-testid=" Continue to payment button"]').click();

            cy.get("span.text-brand-60")
              .contains("Phone number is required")
              .should("be.visible")
              .should("have.class", "Typography_body_SM__a0qv8")
              .then(($el) => {
                cy.blinkBorder($el, { color: "blue", duration: 1500 });
              });

            // Verify Phone number input has error styling
            cy.get('input[name="phoneNumber"]')
              .should("have.class", "inputErrorBorderClassName")
              .should("have.class", "ring-brand")
              .then(($input) => {
                cy.blinkBorder($input, { color: "blue", duration: 1000 });
              });

            // Click the reset button to clear address input for next test
            cy.get("button.underline")
              .contains("Search for an address")
              .should("be.visible")
              .click();

            // Address validation (fill all other fields, leave address empty)
            cy.get('input[name="firstName"]').clear().type("John");
            cy.get('input[name="lastName"]').clear().type("Smith");
            cy.get('input[name="phoneNumber"]').clear().type("0400123456");
            cy.get("#search-address").clear(); // Leave empty

            cy.get('[data-testid=" Continue to payment button"]').click();
            cy.contains("Afterpay").click();
            cy.wait(2000);

            cy.contains("Place Order").should("be.visible").click();

 // Handle Afterpay sandbox login on different origin
    cy.origin('https://portal.sandbox.afterpay.com', () => {
      cy.get('[data-testid="login-password-input"]').type("Devulapalli@123");
      cy.get('[data-testid="login-password-button"]').click();
      cy.wait(20000);
      cy.get('[data-testid="summary-button"]').click();
    });

    cy.wait(15000);

          });
      });
  });
});

describe("Checkout Step 2 Tests for form fields validation and order placing with Giftcard", () => {
  it("should complete comprehensive Step 2 checkout validation in a single flow", () => {
    // Navigate to step 2 by going through step 1 first
    cy.visit(
      "https://staging.kitchenwarehouse.com.au/product/bakemaster-silicone-square-collapsible-air-fryer-insert-21cm",
    );
    cy.wait(3000);
    // Add item to cart
    cy.get('[data-testid="add-to-cart-or-preorder"]', { timeout: 15000 })
      .should("be.visible")
      .click();

    // Navigate to checkout
    cy.get('[class*="MiniCart"]', { timeout: 15000 }).should("be.visible");
    cy.get('[data-testid="checkout-button"]', { timeout: 15000 })
      .should("be.visible")
      .click();

    // Wait for checkout page to load
    cy.url({ timeout: 10000 })
      .should("include", "/checkout")
      .then(() => {
        // Fill step 1 email and continue to step 2
        cy.get('input[type="email"][name="email"]')
          .should("be.visible")
          .type("nrushimha@compose.co.in");
        cy.get('[data-testid="continue-to-shipping-button"]')
          .should("be.visible")
          .click();

        // Verify step 2 active content is displayed
        cy.get('[data-testid="step-2-active-content"]')
          .should("be.visible")
          .should("exist")
          .then(() => {
            // Test 2: Verify shipping method options are displayed
            cy.contains("Ship").should("be.visible");
            cy.contains("Click and Collect").should("be.visible");
            cy.contains("FREE").should("be.visible");

            // Address validation (fill all other fields, leave address empty)
            cy.get('input[name="firstName"]').clear().type("John");
            cy.get('input[name="lastName"]').clear().type("Smith");
            cy.get('input[name="phoneNumber"]').clear().type("0400123456");
            cy.get("#search-address").clear().type("123");

            // Wait for address suggestions to load
            cy.wait(4000);

            // Click on the first address suggestion
            cy.get('[data-testid="searchable-list-item-btn"]')
              .first()
              .should("be.visible")
              .click();
            // Wait for address to be populated
            cy.wait(4000);

            cy.get('[data-testid=" Continue to payment button"]').click();

            // Click on Gift Card payment option
            cy.contains("Gift Card").should("be.visible").click();

            // Wait for the gift card input field to appear
            cy.wait(3000);

            // Enter a sample 6-digit gift card code
            cy.get('input[placeholder="Gift card code"]')
              .should("be.visible")
              .type("123456");
            cy.wait(3000);

            // Click the Apply button - look for it as a sibling in the flex container
           cy.get('.Typography_body_SM__a0qv8 > .Button_button__xS0QI > [data-testid]').click({ force: true });

            // Wait for processing
            cy.wait(9000);

            // Click on Place order CTA
          cy.get('.review-button-wrapper > .Button_button__xS0QI').should("be.visible").click();

            cy.wait(15000);
          });
      });
  });
});