import type { Locator, Page } from '@playwright/test';

export class CookiesLocators {
    readonly aviso: Locator;
    readonly painel: Locator;
    readonly botaoAceitar: Locator;

    constructor(page: Page) {
        this.painel = page.locator('epaas-consent-drawer-shell');
        this.aviso = this.painel.getByRole('dialog', {
            name: 'cookie-banner',
            exact: true,
        });
        this.botaoAceitar = this.painel.getByRole('button', {
            name: 'Aceitar tudo',
            exact: true,
        });
    }
}
