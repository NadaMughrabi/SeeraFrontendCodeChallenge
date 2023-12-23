const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'h164pj',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: false,
    reportPageTitle: 'Report',
    embeddedScreenshots: true,
    video: true,
    inlineAssets: false,
    saveAllAttempts: false,
  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    }, setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },

    baseUrl: 'https://www.almosafer.com/',
    viewportHeight: 1100,
    viewportWidth:1700,
    browser: 'chrome',
    headless: true,
  },
});

require('@applitools/eyes-cypress')(module);
