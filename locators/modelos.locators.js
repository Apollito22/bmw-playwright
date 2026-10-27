class ModelosLocators{
    constructor(page){
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

        this.precoMaximo = page.getByRole('spinbutton', {
            name: 'Até',
            exact: true,
        });
    }
}
module.exports = {ModelosLocators}