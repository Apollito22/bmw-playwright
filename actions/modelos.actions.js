const { ModelosLocators } = require('../locators/modelos.locators');

class ModelosActions {
    constructor(page) {
        this.page = page;
        this.elementos = new ModelosLocators(page);
    }

    async abrir() {
        await this.page.goto(
            'https://www.bmw.com.br/pt/all-models.html'
        );
    }
}

module.exports = { ModelosActions };