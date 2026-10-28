const { expect } = require('@playwright/test');
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

        await expect(this.elementos.catalogo).toHaveAttribute(
            'data-initialized', 'true', { timeout: 15000 }
        );
        await expect(this.elementos.gradeModelos).toHaveAttribute(
            'data-initialized', 'true', { timeout: 15000 }
        );
    }

    async filtrarSuv() {
        await this.elementos.filtroSuv.click();
    }

    async limparFiltros() {
        await this.elementos.limparFiltros.click();
    }

    async filtrarEletrico() {
        await this.elementos.filtroEletrico.click();
    }

    async abrirDetalhesIx1() {
        await this.elementos.modeloIx1.click();
        // Durante a animação, a BMW desativa os cliques na grade.
        await expect(this.elementos.gradeCartoes).toHaveCSS('pointer-events', 'auto');
    }

    async fecharDetalhes() {
        await expect(this.elementos.gradeCartoes).toHaveCSS('pointer-events', 'auto');
        await this.elementos.fecharDetalhes.click();
        await expect(this.elementos.linkDetalhesIx1).toBeHidden();
    }

    async filtrarCategoria(nome) {
        await this.elementos.filtroCategoria(nome).click();
    }

    async filtrarGasolina() {
        await this.elementos.filtroGasolina.click();
    }
}

module.exports = { ModelosActions };
