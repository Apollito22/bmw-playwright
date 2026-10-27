class ConcessionariasLocators {
    constructor(page) {
        this.page = page;

        this.campoNome = page.getByRole('combobox', {
            name: 'Pesquise o nome do Concessionário',
            exact: true,
        });

        this.sugestoes = page.getByRole('option');
    }

    sugestao(nome) {
        return this.page.getByRole('option', { name: nome });
    }

    resultado(nome) {
        return this.page.getByRole('button', { name: nome });
    }
}

module.exports = { ConcessionariasLocators };