const {
    ConcessionariasLocators,
} = require('../locators/concessionarias.locators');

class ConcessionariasActions {
    constructor(page) {
        this.page = page;
        this.elementos = new ConcessionariasLocators(page);
    }

    async abrir() {
        await this.page.goto(
            'https://www.bmw.com.br/dlo/pt-br/bmw/dealer-locator.html'
        );
    }

    async pesquisar(nome) {
        await this.elementos.campoNome.fill(nome);
    }

    async selecionar(nome) {
        await this.elementos.sugestao(nome).click();
    }
}

module.exports = { ConcessionariasActions };