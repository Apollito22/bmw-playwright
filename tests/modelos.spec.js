const { test, expect } = require('../fixtures/bmw.fixture');

test('deve abrir o catálogo de modelos da BMW', async ({ modelos }) => {
    await modelos.abrir();

    await expect(modelos.elementos.titulo).toBeVisible();
});