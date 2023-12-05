# Documentação de Testes

Este documento descreve os testes realizados para a aplicação. Os testes estão divididos entre Jest e Cypress, abordando diferentes aspectos da aplicação, incluindo renderização, interação do usuário, validação de botões e funcionalidades específicas.

Para executar os testes: `npm run test`

## Cypress

### 1. Validação da Renderização Inicial

#### Teste: Deve Renderizar a Visão da Tabela no Primeiro momento de acesso
- **Entrada:** Acesso à aplicação pelo endereço `http://localhost:3000/`
- **Saída Esperada:** 
  - Título do layout existente e igual a 'Simple Registration'
  - Botão de registro existente

### 2. Validação do Formulário de Registro

#### Teste: Deve Renderizar o Formulário de Registro Após Clicar no Botão "New Client"
- **Entrada:** Acesso à aplicação pelo endereço `http://localhost:3000/`
- **Saída Esperada:** 
  - Título do layout existente e igual a 'Register Customers'
  - Campos de nome e idade existentes no formulário

#### Teste: Deve Desabilitar o Botão "Salvar" Quando o Campo de Nome Estiver Vazio
- **Entrada:** Acesso à aplicação pelo endereço `http://localhost:3000/` e clicar no botão "New Client"
- **Saída Esperada:** O botão "Salvar" deve estar desabilitado inicialmente e permanecer desabilitado após apagar o conteúdo do campo de nome

#### Teste: Deve Habilitar o Botão "Salvar" Quando o Campo de Nome Não Estiver Vazio
- **Entrada:** Renderizar o componente `<Home />` e clicar no botão "New Client"
- **Saída Esperada:** 
  - O botão "Salvar" deve estar desabilitado inicialmente
  - O botão "Salvar" deve ficar habilitado após preencher o campo de nome

### 3. Validação das Ações na Tabela

#### Teste: Chamar a Função de Exclusão Quando Houver ao menos um Usuário Cadastrado
- **Entrada:** Acesso à aplicação pelo endereço `http://localhost:3000/`
- **Saída Esperada:** 
  - Botão de exclusão existente e clicar no primeiro botão de exclusão
  - Botão de edição existente e clicar no primeiro botão de edição

#### Teste: Chamar a Função de Atualização Quando Houver ao menos um Usuário Cadastrado
- **Entrada:** Acesso à aplicação pelo endereço `http://localhost:3000/` e clicar no botão de edição do primeiro usuário
- **Saída Esperada:** 
  - O campo de nome deve estar vazio inicialmente
  - Após preencher o campo de nome e clicar no botão de atualização, o nome inserido na alteração deve ser exibido na tabela

## Jest

### 1. Visão da Tabela

#### Teste: Renderizar a Tabela com Clientes
- **Entrada:** Renderizar o componente `<Table />` com clientes 3 fictícios
- **Saída Esperada:** 
  - A tabela deve estar presente no documento
  - O número de linhas da tabela deve ser igual a 4 (cabeçalho + 3 clientes)

#### Teste: Renderizar a Tabela Sem Clientes
- **Entrada:** Renderizar o componente `<Table />` sem clientes
- **Saída Esperada:** 
  - A tabela deve estar presente no documento
  - O número de linhas da tabela deve ser igual a 1 (apenas cabeçalho)

#### Teste: Chamar a Função de Exclusão Quando o Botão de Exclusão For Clicado
- **Entrada:** Renderizar o componente `<Table />` com clientes fictícios e clicar no botão de exclusão do primeiro cliente
- **Saída Esperada:** A função `mockDeleteCustomer` deve ser chamada uma vez (executa função Delete do componente)

#### Teste: Chamar a Função de Atualização Quando o Botão de Edição For Clicado
- **Entrada:** Renderizar o componente `<Table />` com clientes fictícios e clicar no botão de edição do primeiro cliente
- **Saída Esperada:** A função `mockSelectedCustomer` deve ser chamada uma vez (executa função Update do componente)

### 2. Visão da Formulário

#### Teste: Retornar Dados do Cliente Quando a Função de Atualização For Chamada
- **Entrada:** Renderizar o componente `<Form />` com um cliente fictício - Mock utilizado
- **Saída Esperada:** 
  - O campo de ID deve ter o valor "1"
  - O campo de nome deve ter o valor "Gustavo Bittencourt"
  - O campo de idade deve ter o valor "26"

#### Teste: Chamar a Função de Novo Cliente Quando o Botão de Registro For Clicado
- **Entrada:** Renderizar o componente `<Button />` com o tipo "register" e clicar no botão de registro
- **Saída Esperada:** A função `mockNewCustomer` deve ser chamada uma vez (executa função de Cadastro do componente)

### 3. Página Inicial - Abordagem de navegação pelos componentes (UserEvents)

#### Teste: Renderizar o Componente `<Home />` Corretamente
- **Entrada:** Renderizar o componente `<Home />`
- **Saída Esperada:** A renderização deve ocorrer sem erros

#### Teste: Renderizar Formulário com Campos de Nome e Idade e Botões
- **Entrada:** Renderizar o componente `<Home />` e clicar no botão "New Client"
- **Saída Esperada:** 
  - O formulário deve estar presente
  - Os botões "Salvar" e "Cancelar" devem estar presentes no formulário

#### Teste: Desabilitar o Botão "Salvar" Quando o Campo de Nome Estiver Vazio
- **Entrada:** Renderizar o componente `<Home />` e clicar no botão "New Client"
- **Saída Esperada:** O botão "Salvar" deve estar desabilitado inicialmente e permanecer desabilitado após apagar o conteúdo do campo de nome

#### Teste: Habilitar o Botão "Salvar" Quando o Campo de Nome Não Estiver Vazio
- **Entrada:** Renderizar o componente `<Home />` e clicar no botão "New Client"
- **Saída Esperada:** 
  - O botão "Salvar" deve estar desabilitado inicialmente
  - O botão "Salvar" deve ficar habilitado após preencher o campo de nome
