import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { CookiesLocators } from '../locators/cookies.locators';

export class CookiesActions {
    private readonly page: Page;
    readonly elementos: CookiesLocators;

    constructor(page: Page) {
        this.page = page;
        this.elementos = new CookiesLocators(page);
    }

    async registrarTratamento(aposFechar?: () => Promise<void>): Promise<void> {
        // O aviso pode aparecer depois que a página já está utilizável.
        await this.page.addLocatorHandler(this.elementos.aviso, async () => {
            await this.elementos.botaoAceitar.click();
            await expect(this.elementos.painel).toBeHidden();

            if (aposFechar) {
                await aposFechar();
            }
        });
    }
}
