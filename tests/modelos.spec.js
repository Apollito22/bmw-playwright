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

test('deve identificar preço máximo abaixo do mínimo permitido', async ({
    modelos,
}) => {
    await modelos.abrir();
    await modelos.preencherPrecoMaximo('100');

    await expect(modelos.elementos.precoMaximo)
        .toHaveValue('100');

    const abaixoDoMinimo = await modelos.elementos.precoMaximo.evaluate(
        campo => campo.validity.rangeUnderflow
    );

    expect(abaixoDoMinimo).toBe(true);

    await modelos.limparFiltros();

    await expect(modelos.elementos.precoMaximo)
        .toHaveValue('');

    const campoValido = await modelos.elementos.precoMaximo.evaluate(
        campo => campo.validity.valid
    );

    expect(campoValido).toBe(true);
});