const { test, expect } = require('../fixtures/bmw.fixture');

test('deve abrir o catálogo de modelos da BMW', async ({ modelos }) => {
    await modelos.abrir();

    await expect(modelos.elementos.titulo).toBeVisible();
});

test('deve filtrar SUVs e restaurar o catálogo ao limpar', async ({ modelos }) => {
    await modelos.abrir();

    await expect(modelos.elementos.modelosSeda.first()).toBeVisible();

    await modelos.filtrarSuv();

    await expect(modelos.elementos.filtroSuv).toHaveAttribute('aria-pressed', 'true');

    await expect(modelos.elementos.modelosSuv.first()).toBeVisible();
    
    await expect(modelos.elementos.modelosSeda).toHaveCount(0);

    await modelos.limparFiltros();

    await expect(modelos.elementos.filtroSuv).not.toHaveAttribute('aria-pressed', 'true');

    await expect(modelos.elementos.modelosSeda.first()).toBeVisible();
});