const { defineConfig } = require('cypress');

module.exports = defineConfig({
  "chromeWebSecurity": false,
  "failOnStatusCode": false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
  }
});