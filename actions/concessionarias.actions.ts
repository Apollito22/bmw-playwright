import type { Page } from '@playwright/test';
import { ConcessionariasLocators } from '../locators/concessionarias.locators';

export class ConcessionariasActions {
    private readonly page: Page;
    readonly elementos: ConcessionariasLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementos = new ConcessionariasLocators(page);
    }

    async abrir(): Promise<void> {
        await this.page.goto(
            'https://www.bmw.com.br/dlo/pt-br/bmw/dealer-locator.html'
        );
    }

    async pesquisar(nome: string): Promise<void> {
        await this.elementos.campoNome.fill(nome);
    }

    async selecionar(nome: string): Promise<void> {
        await this.elementos.sugestao(nome).click();
    }

    async reabrirSugestoes(): Promise<void> {
        const campo = this.elementos.campoNome;

        // Fechar o consentimento pode tirar o foco e recolher as sugestões.
        if (await campo.isVisible() && await campo.inputValue()) {
            await campo.press('ArrowDown');
        }
    }
}
