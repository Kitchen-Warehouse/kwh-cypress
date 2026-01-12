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
    
    // Increased timeouts for preview URLs that may take longer to load
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 120000, // Increased from default 60s to 120s
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    // Retry settings for flaky tests
    retries: {
      runMode: 2,
      openMode: 0
    },
    
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