const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/index.js',
    specPattern: 'cypress/integration',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 38000,
  },
});
