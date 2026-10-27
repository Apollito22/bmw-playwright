const { test, expect } = require('../fixtures/bmw.fixture');

test('deve pesquisar uma concessionária pelo nome', async ({
    concessionarias,
}) => {
    const nome = 'Euroville - Belo Horizonte';

    await concessionarias.abrir();
    await concessionarias.pesquisar('Euroville');

    await expect(
        concessionarias.elementos.sugestao(nome)
    ).toBeVisible();

    await concessionarias.selecionar(nome);

    const resultado = concessionarias.elementos.resultado(nome);

    await expect(resultado).toBeVisible();
    await expect(resultado).toContainText('Av. Raja Gabaglia');
    await expect(resultado).toContainText('Belo Horizonte');
});