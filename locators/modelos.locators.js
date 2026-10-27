class ModelosLocators{
    constructor(page){
        this.titulo = page.getByRole('heading', {
            name: 'Descubra todos os modelos BMW.',
            exact: true,
        });
    }
}
module.exports = {ModelosLocators}