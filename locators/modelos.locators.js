class ModelosLocators {
    constructor(page) {
        this.page = page;

        this.catalogo = page.locator('[data-component-path="allmodels-v1"]');

        this.gradeModelos = page.locator('[data-component-path="allmodelscontainer-v1"]');
        
        this.gradeCartoes = page.locator('#idAllModelsCardsContainer');

        this.titulo = page.getByRole('heading', {
            name: 'Descubra todos os modelos BMW.',
            exact: true,
        });
        
        this.filtroSuv = page.getByRole('button', {
            name: 'SUV',
            exact: true,
        });

        this.modelosSuv = page.getByRole('button', {
            name: /^SUV\s/,
        });

        this.modelosSeda = page.getByRole('button', {
            name: /^Sedã\s/,
        });

        this.limparFiltros = page.getByRole('link', {
            name: 'Limpar tudo',
            exact: true,
        });

        this.filtroEletrico = page.getByRole('button', {
            name: /100% elétrico/,
        });

        this.modeloIx1 = page.getByRole('button', {
            name: /^SUV iX1\s/,
        });

        this.linkDetalhesIx1 = page.getByRole('link', {
            name: 'BMW iX1 xDrive30',
            exact: true,
        });

        this.fecharDetalhes = page.getByRole('button', {
            name: 'Fechar',
            exact: true,
        });

        this.suvsGasolina = this.modelosSuv.filter({
            hasText: 'Gasolina',
        });

        this.filtroGasolina = page.getByTitle('Gasolina', {
            exact: true,
        });

        this.filtroSerie3 = page.getByRole('button', {
            name: '3',
            exact: true,
        });
    }

    filtroCategoria(nome) {
        return this.page.getByRole('button', {
            name: nome,
            exact: true,
        });
    }

    modeloPorNome(nome) {
        return this.page
            .getByRole('button', { name: nome })
            .filter({ hasNotText: 'Condição Especial' });
    }
}
module.exports = { ModelosLocators };
