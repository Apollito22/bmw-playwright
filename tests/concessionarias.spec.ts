import { test, expect } from '../fixtures/bmw.fixture';

test('deve pesquisar uma concessionária pelo nome', async ({
    concessionarias,
}) => {
    const nome = 'Euroville - Belo Horizonte';

    await concessionarias.abrir();
    await concessionarias.pesquisar('Euroville');

    await expect(
        concessionarias.elementos.sugestao(nome)
    ).toBeVisible({ timeout: 15_000 });

    await concessionarias.selecionar(nome);

    const resultado = concessionarias.elementos.resultado(nome);

    await expect(resultado).toBeVisible();
    await expect(resultado).toContainText('Av. Raja Gabaglia');
    await expect(resultado).toContainText('Belo Horizonte');
});

test('não deve sugerir concessionária para nome inexistente', async ({
    concessionarias,
}) => {
    const nomeInexistente = 'ZZZConcessionariaInexistente987654';

    await concessionarias.abrir();

    await concessionarias.pesquisar('Euroville');

    await expect(
        concessionarias.elementos.sugestao('Euroville - Belo Horizonte')
    ).toBeVisible({ timeout: 15_000 });

    await concessionarias.pesquisar(nomeInexistente);

    await expect(concessionarias.elementos.campoNome)
        .toHaveValue(nomeInexistente);

    await expect(concessionarias.elementos.sugestoes)
        .toHaveCount(0);
});
