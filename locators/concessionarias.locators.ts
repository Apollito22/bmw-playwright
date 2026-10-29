import type { Locator, Page } from '@playwright/test';

export class ConcessionariasLocators {
    private readonly page: Page;
    readonly campoNome: Locator;
    readonly sugestoes: Locator;

    constructor(page: Page) {
        this.page = page;

        this.campoNome = page.getByRole('combobox', {
            name: 'Pesquise o nome do Concessionário',
            exact: true,
        });

        this.sugestoes = page.getByRole('option');
    }

    sugestao(nome: string): Locator {
        return this.page.getByRole('option', { name: nome });
    }

    resultado(nome: string): Locator {
        return this.page.getByRole('button', { name: nome });
    }
}
