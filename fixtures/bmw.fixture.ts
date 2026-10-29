import { test as base } from '@playwright/test';
import { ModelosActions } from '../actions/modelos.actions';
import { ConcessionariasActions } from '../actions/concessionarias.actions';
import { CookiesActions } from '../actions/cookies.actions';

type BmwFixtures = {
    modelos: ModelosActions;
    concessionarias: ConcessionariasActions;
};

export const test = base.extend<BmwFixtures>({
    modelos: async ({ page }, use) => {
        const cookies = new CookiesActions(page);
        await cookies.registrarTratamento();
        await use(new ModelosActions(page));
    },

    concessionarias: async ({ page }, use) => {
        const concessionarias = new ConcessionariasActions(page);
        const cookies = new CookiesActions(page);
        await cookies.registrarTratamento(async () => {
            await concessionarias.reabrirSugestoes();
        });
        await use(concessionarias);
    },
});

export { expect } from '@playwright/test';
