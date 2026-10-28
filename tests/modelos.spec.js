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

test('deve impedir a combinação de SUV com Série 3', async ({
    modelos,
}) => {
    await modelos.abrir();

    await expect(modelos.elementos.filtroSerie3).toBeEnabled();

    await modelos.filtrarSuv();

    await expect(modelos.elementos.filtroSuv)
        .toHaveAttribute('aria-pressed', 'true');

    await expect(modelos.elementos.filtroSerie3).toBeDisabled();

    await expect(modelos.elementos.filtroSerie3)
        .not.toHaveAttribute('aria-pressed', 'true');

    await expect(modelos.elementos.modelosSeda).toHaveCount(0);

    await modelos.limparFiltros();

    await expect(modelos.elementos.filtroSerie3).toBeEnabled();

    await expect(modelos.elementos.modelosSeda.first()).toBeVisible();
});

test('deve consultar detalhes de um SUV elétrico e limpar filtros', async ({
    modelos,
}) => {
    await modelos.abrir();

    await modelos.filtrarSuv();

    await expect(modelos.elementos.suvsGasolina.first()).toBeVisible();

    await modelos.filtrarEletrico();

    await expect(modelos.elementos.filtroEletrico).toHaveAttribute('aria-pressed', 'true');

    await expect(modelos.elementos.suvsGasolina).toHaveCount(0);

    await expect(modelos.elementos.modeloIx1).toBeVisible();

    await modelos.abrirDetalhesIx1();


    await expect(modelos.elementos.linkDetalhesIx1).toBeVisible();

    await expect(modelos.elementos.linkDetalhesIx1).toHaveAttribute('href', /\/bmw-ix1\.html$/);

    await modelos.fecharDetalhes();

    await expect(modelos.elementos.linkDetalhesIx1).toBeHidden();

    await modelos.limparFiltros();

    await expect(modelos.elementos.filtroEletrico).not.toHaveAttribute('aria-pressed', 'true');

    await expect(modelos.elementos.modelosSeda.first()).toBeVisible();
});

const categoriasGasolina = [
    {
        categoria: 'Sedã',
        modelo: 'BMW 320i GP',
    },
    {
        categoria: 'Coupé',
        modelo: 'BMW M2 Coupé',
    },
    {
        categoria: 'Cabrio',
        modelo: 'BMW 420i Cabrio M Sport',
    },
];

for (const caso of categoriasGasolina) {
    test(`deve filtrar ${caso.categoria} a gasolina e limpar filtros`, async ({
        modelos,
    }) => {
        await modelos.abrir();

        await modelos.filtrarCategoria(caso.categoria);

        await expect(modelos.elementos.filtroCategoria(caso.categoria)).toHaveAttribute('aria-pressed', 'true');

        await expect(modelos.elementos.modelosSuv).toHaveCount(0);

        await modelos.filtrarGasolina();

        await expect(modelos.elementos.filtroGasolina).toHaveAttribute('aria-pressed', 'true');

        const veiculo = modelos.elementos.modeloPorNome(caso.modelo);

        await expect(veiculo).toBeVisible();

        await expect(veiculo).toContainText(caso.categoria);

        await expect(veiculo).toContainText('Gasolina');

        await modelos.limparFiltros();

        await expect(modelos.elementos.filtroCategoria(caso.categoria))
            .not.toHaveAttribute('aria-pressed', 'true');

        await expect(modelos.elementos.filtroGasolina)
            .not.toHaveAttribute('aria-pressed', 'true');

        await expect(modelos.elementos.modelosSuv.first()).toBeVisible();
    });
}