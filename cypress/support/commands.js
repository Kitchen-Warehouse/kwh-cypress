// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to visit with better error handling for preview URLs
Cypress.Commands.add('visitWithRetry', (url = '/', options = {}) => {
  const maxRetries = options.retries || 3;
  const retryDelay = options.retryDelay || 10000; // 10 seconds
  
  const attemptVisit = (attempt = 1) => {
    cy.log(`🔄 Attempting to visit ${url} (attempt ${attempt}/${maxRetries})`);
    
    return cy.visit(url, { 
      failOnStatusCode: false,
      timeout: 120000,
      ...options 
    }).then(() => {
      // Check if page loaded properly
      cy.get('body', { timeout: 30000 }).should('exist');
    }, (error) => {
      if (attempt < maxRetries) {
        cy.log(`⚠️ Visit failed (attempt ${attempt}), retrying in ${retryDelay/1000}s...`);
        cy.wait(retryDelay);
        return attemptVisit(attempt + 1);
      } else {
        cy.log(`❌ Failed to load ${url} after ${maxRetries} attempts`);
        throw error;
      }
    });
  };
  
  return attemptVisit();
});

// Custom command to check if URL is accessible before visiting
Cypress.Commands.add('checkUrlAccessible', (url) => {
  return cy.request({
    method: 'GET',
    url: url,
    failOnStatusCode: false,
    timeout: 30000
  }).then((response) => {
    const accessible = response.status >= 200 && response.status < 400;
    if (accessible) {
      cy.log(`✅ URL ${url} is accessible (${response.status})`);
    } else {
      cy.log(`⚠️ URL ${url} returned status ${response.status}`);
    }
    return cy.wrap(accessible);
  });
});

// Custom command to login (example)
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('[data-testid="username"]').type(username)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="login-button"]').click()
    cy.url().should('not.contain', '/login')
  })
})

// Custom command to get element by data-testid
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`)
})

// Custom command to wait for API call
Cypress.Commands.add('waitForApi', (alias) => {
  return cy.wait(alias).then((interception) => {
    expect(interception.response.statusCode).to.be.oneOf([200, 201, 204])
  })
})