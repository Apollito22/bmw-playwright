const { test: base, expect } = require('@playwright/test');
const { ModelosActions } = require('../actions/modelos.actions');
const {
    ConcessionariasActions,
} = require('../actions/concessionarias.actions');

const test = base.extend({
    modelos: async ({ page }, use) => {
        const modelos = new ModelosActions(page);
        await use(modelos);
    },

    concessionarias: async ({ page }, use) => {
        const concessionarias = new ConcessionariasActions(page);
        await use(concessionarias);
    },
});

module.exports = { test, expect };