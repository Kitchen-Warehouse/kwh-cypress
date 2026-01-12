const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Base URL for your application (uncomment and set when you have a running server)
    // baseUrl: 'http://localhost:3000',
    
    // Where your test files are located
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Support file
    supportFile: 'cypress/support/e2e.js',
    
    // Screenshots and videos
    screenshotOnRunFailure: true,
    video: true,
    
    // Viewport settings
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Default command timeout
    defaultCommandTimeout: 10000,
    
    // Page load timeout
    pageLoadTimeout: 120000,
    
    // Request timeout
    requestTimeout: 30000,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
    projectId: "s15ohg",
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
})