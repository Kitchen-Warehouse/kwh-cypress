const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Dynamic base URL - can be overridden by environment variable
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://staging.kitchenwarehouse.com.au/',
    
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
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // Make environment variables available to tests
      config.env.PR_NUMBER = process.env.CYPRESS_PR_NUMBER
      config.env.REPO_NAME = process.env.CYPRESS_REPO_NAME
      config.env.BASE_URL = config.baseUrl
      
      return config
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