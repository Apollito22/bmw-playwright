import { expect, type Page } from '@playwright/test';
import { ModelosLocators } from '../locators/modelos.locators';

export class ModelosActions {
    private readonly page: Page;
    readonly elementos: ModelosLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementos = new ModelosLocators(page);
    }

    async abrir(): Promise<void> {
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

    async filtrarSuv(): Promise<void> {
        await this.elementos.filtroSuv.click();
    }

    async limparFiltros(): Promise<void> {
        await this.elementos.limparFiltros.click();
    }

    async filtrarEletrico(): Promise<void> {
        await this.elementos.filtroEletrico.click();
    }

    async abrirDetalhesIx1(): Promise<void> {
        await this.elementos.modeloIx1.click();
        await expect(this.elementos.gradeCartoes).toHaveCSS('pointer-events', 'auto');
    }

    async fecharDetalhes(): Promise<void> {
        await expect(this.elementos.gradeCartoes).toHaveCSS('pointer-events', 'auto');
        await this.elementos.fecharDetalhes.click();
        await expect(this.elementos.linkDetalhesIx1).toBeHidden();
    }

    async filtrarCategoria(nome: string): Promise<void> {
        await this.elementos.filtroCategoria(nome).click();
    }

    async filtrarGasolina(): Promise<void> {
        await this.elementos.filtroGasolina.click();
    }
}
