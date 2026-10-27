const { test: base, expect } = require('@playwright/test');
const { ModelosActions } = require('../actions/modelos.actions');

const test = base.extend({
    modelos: async ({ page }, use) => {
        const modelos = new ModelosActions(page);
        await use(modelos);
    },
});

module.exports = { test, expect };