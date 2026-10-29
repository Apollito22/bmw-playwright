# Automação de testes web — BMW Brasil

Trabalho da disciplina de Testes de Software, desenvolvido com
Playwright e TypeScript, seguindo a base de código disponibilizada em aula.

## Integrantes

- Matheus Miranda
- Vinicius de Faveri

## Objetivo

Automatizar funcionalidades públicas do site da BMW Brasil,
validando filtros de veículos, detalhes de modelos, pesquisa de
concessionárias e cenários negativos.

## Páginas utilizadas

- Catálogo: https://www.bmw.com.br/pt/all-models.html
- Concessionárias: https://www.bmw.com.br/dlo/pt-br/bmw/dealer-locator.html

## Estrutura

- `locators/`: identifica os elementos das páginas.
- `actions/`: reúne as ações realizadas nas páginas.
- `fixtures/`: disponibiliza os objetos usados pelos testes.
- `tests/`: contém os cenários e suas validações.
- `.github/workflows/`: configura a execução no GitHub Actions.
- `playwright.config.ts`: configura navegadores e execução.
- `tsconfig.json`: configura a checagem estrita dos tipos.

Todo o código-fonte de locators, actions, fixtures, testes e configuração
do Playwright está em arquivos `.ts`.

## Cenários e interações

| Cenário                                   | Testes | Cliques e preenchimentos |
|---|---:|---:|
| Abertura do catálogo                      |    1   | 0 |
| Filtro SUV e limpeza                      |    1   | 2 |
| Bloqueio da combinação SUV e Série 3 e limpeza | 1 | 2 |
| SUV elétrico e painel de detalhes do iX1  |    1   | 5 |
| Pesquisa e seleção de concessionária      |    1   | 2 |
| Pesquisa de concessionária inexistente    |    1   | 2 |
| Sedã, Coupé e Cabrio a gasolina           |    3   | 9 |
| **Total**| **9**  | **22** |

A contagem considera uma execução dos nove testes em um navegador.
Navegações e validações não foram incluídas nas 22 interações.
O tratamento eventual de cookies e a reabertura das sugestões com o teclado
também ficam fora dessa contagem; são etapas de preparação da página.

Os cenários negativos verificam:
- Ausência de sugestões para um nome fictício inexistente.
- Bloqueio da opção Série 3 quando a categoria SUV está selecionada e
  reativação da opção após limpar os filtros.

## Instalação

Pré-requisitos: Node.js 24, npm e Git.

Depois de clonar o repositório e entrar na pasta do projeto:

```bash
npm ci
npx playwright install
```

Na primeira utilização, com Node.js, npm e Git instalados e acesso ao
repositório privado, também é possível baixar, instalar e executar:

```bash
git clone https://github.com/Apollito22/bmw-playwright.git &&
cd bmw-playwright &&
npm ci &&
npx playwright install --with-deps chromium &&
npm run typecheck &&
npx playwright test --project=chromium --workers=1
```

Esse bloco deve ser executado em uma pasta onde ainda não exista uma
pasta `bmw-playwright`. Não é necessário clonar novamente para cada execução.

## Checagem de TypeScript

Antes de executar os testes, confira os tipos:

```bash
npm run typecheck
```

Esse comando executa `tsc --noEmit`: verifica os tipos e não gera arquivos
JavaScript. O projeto utiliza `Page`, `Locator`, propriedades `readonly`,
parâmetros e retornos tipados e fixtures com tipos explícitos.

O Playwright transforma TypeScript para executar, mas não faz a checagem
de tipos por conta própria. A checagem separada também é executada na pipeline.
Referência: [TypeScript no Playwright](https://playwright.dev/docs/test-typescript).

## Execução

Executar os nove testes no Chromium:

```bash
npx playwright test --project=chromium --workers=1
```

Acompanhar a execução com o navegador visível:

```bash
npx playwright test --project=chromium --headed --workers=1
```

Executar em todos os navegadores configurados:

```bash
npx playwright test
```

São 9 cenários por navegador: o comando completo executa 27 testes.

Para executar os três comandos acima em sequência, preservando os logs e
relatórios de cada execução, use o script de verificação:

```bash
bash scripts/verificar-readme.sh
```

O script primeiro verifica os tipos e só continua se não houver erros de
TypeScript. O segundo comando abre os navegadores, portanto deve ser executado
em uma sessão gráfica. O script executa as três etapas de navegador mesmo se alguma falhar e
retorna código diferente de zero quando houver falhas. Cada relatório fica
na pasta `.validacao/`, que não entra no Git.

Abrir o último relatório HTML:

```bash
npx playwright show-report
```

## Pipeline

O GitHub Actions executa os testes automaticamente nos pushes e
pull requests destinados às branches main e master.

A pipeline instala as dependências, verifica os tipos de TypeScript, instala os navegadores,
executa os testes e disponibiliza o relatório HTML como artefato.

O resultado pode ser consultado na aba Actions do repositório.

## Decisões técnicas

- Separação entre locators, actions, fixtures e testes.
- Classes de locators com propriedades `readonly` do tipo `Locator` e
  construtores que recebem `Page`, como no exemplo do professor.
- Actions com parâmetros e retornos tipados e fixtures com seus tipos declarados.
- Seletores por papel, nome acessível e atributo title.
- Esperas automáticas do Playwright e validações com expect.
- As fixtures registram o tratamento do aviso de cookies antes da navegação,
  usando `page.addLocatorHandler`. Se o aviso aparecer, inclusive com atraso,
  a automação clica em "Aceitar tudo" e aguarda o painel desaparecer.
  A escolha vale para o contexto isolado daquele teste, que é descartado
  ao final da execução; não é salva como um perfil pessoal do navegador.
- Se o aviso interromper uma pesquisa de concessionária, as sugestões são
  reabertas com `ArrowDown`, pois o painel pode ter retirado o foco do campo.
  A sugestão esperada tem até 15 segundos para aparecer; a pesquisa, a seleção
  e as validações de endereço continuam obrigatórias.
- Abertura do catálogo aguarda `data-initialized="true"` nos componentes
  de filtros e cartões antes de permitir os cliques. Esse atributo é
  definido pelo carregador da própria BMW após a inicialização.
- A consulta de detalhes aguarda a grade voltar a aceitar cliques após a
  animação, verificando o estado real de `pointer-events`.
- Cartões de condição especial são excluídos ao localizar um modelo do
  catálogo normal, evitando resultados duplicados para o mesmo nome.
- Testes parametrizados para reutilizar o roteiro entre categorias.
- Cenários independentes, sem depender da execução de outro teste.

Referência do tratamento de sobreposições:
[page.addLocatorHandler](https://playwright.dev/docs/api/class-page#page-add-locator-handler).

## Cuidados e limitações

Os testes não criam contas, não fazem compras, não solicitam
propostas e não agendam test drives.

O projeto depende da disponibilidade do site da BMW. Alterações
nos elementos, modelos ou dados públicos podem exigir manutenção.

O antigo teste de preço foi substituído pelo cenário de filtros
incompatíveis. O campo de preço possui normalização própria de valores,
e as leituras transitórias de validação não foram usadas como regra final
dos testes.

O repositório deve permanecer privado, com acesso restrito aos
integrantes da dupla e ao professor.

## Relação com os requisitos do trabalho

| Requisito | Evidência no projeto |
|---|---|
| Caminho feliz | SUV elétrico, detalhes do iX1, fechamento e limpeza |
| Pesquisa com validação | Sugestão de concessionária, seleção e endereço |
| Dois cenários negativos | Nome inexistente e combinação SUV/Série 3 indisponível |
| Validações de comportamento e resultados | Asserções com `expect` nos nove cenários |
| Pelo menos 20 interações | 22 cliques/preenchimentos por navegador, detalhados acima |
| Organização e reutilização | Locators, actions, fixtures e casos parametrizados |
| Git e pipeline | Histórico de commits e workflow no GitHub Actions |
| Base em TypeScript da aula | Classes tipadas, `Page`, `Locator`, `readonly` e imports/exports |

Antes da entrega, conferir no GitHub se o repositório continua privado,
se os dois integrantes e o professor possuem acesso e se a pipeline do
último commit passou. A apresentação deve incluir a execução dos testes,
a estrutura do projeto, os resultados e a explicação das decisões técnicas.
