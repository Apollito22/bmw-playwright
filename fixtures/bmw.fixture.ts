import { test as base } from '@playwright/test';
import { ModelosActions } from '../actions/modelos.actions';
import { ConcessionariasActions } from '../actions/concessionarias.actions';

type BmwFixtures = {
    modelos: ModelosActions;
    concessionarias: ConcessionariasActions;
};

export const test = base.extend<BmwFixtures>({
    modelos: async ({ page }, use) => {
        await use(new ModelosActions(page));
    },

    concessionarias: async ({ page }, use) => {
        await use(new ConcessionariasActions(page));
    },
});

export { expect } from '@playwright/test';
