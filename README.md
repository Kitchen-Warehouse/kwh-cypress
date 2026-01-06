# Cypress Project

This project is set up with Cypress for end-to-end testing.

## Getting Started

### Installation
```bash
npm install
```

### Running Tests

#### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress:open
```

#### Run Tests in Headless Mode
```bash
npm run cypress:run
# or simply
npm test
```

#### Run Tests in Headed Mode (see browser)
```bash
npm run test:headed
```

#### Run Tests in Specific Browser
```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
```

#### Run Specific Test File
```bash
npm run test:spec cypress/e2e/example.cy.js
```

## Project Structure

```
cypress/
├── e2e/                 # End-to-end test files
│   ├── example.cy.js    # Basic example tests
│   ├── api-tests.cy.js  # API testing examples
│   └── auth.cy.js       # Authentication tests
├── fixtures/            # Test data files
│   └── example.json     # Sample test data
└── support/             # Support files and custom commands
    ├── commands.js      # Custom Cypress commands
    └── e2e.js          # Global configuration and imports
```

## Configuration

The main configuration is in `cypress.config.js`. Key settings include:

- **baseUrl**: Set this to your application's URL (currently set to `http://localhost:3000`)
- **viewportWidth/Height**: Default browser viewport size
- **defaultCommandTimeout**: How long Cypress waits for commands to complete

## Custom Commands

The project includes several custom commands in `cypress/support/commands.js`:

- `cy.login(username, password)` - Login with session management
- `cy.getByTestId(testId)` - Get elements by data-testid attribute
- `cy.waitForApi(alias)` - Wait for API calls with status validation

## Test Data

Test fixtures are stored in `cypress/fixtures/` and can be loaded in tests using:

```javascript
cy.fixture('example').then((data) => {
  // Use data in your tests
})
```

## Best Practices

1. Use `data-testid` attributes for reliable element selection
2. Keep tests isolated and independent
3. Use custom commands for common operations
4. Mock API calls when needed using `cy.intercept()`
5. Use Page Object Pattern for complex applications
6. Keep test data in fixtures for maintainability

## Continuous Integration

For CI/CD pipelines, use the headless mode:

```bash
npm run cypress:run
```

## Environment Configuration

You can set different base URLs for different environments:

```bash
CYPRESS_baseUrl=https://staging.example.com npm run cypress:run
```