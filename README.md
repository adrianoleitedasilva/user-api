# User Management API

Esta é uma API RESTful criada em Node.js que permite gerenciar usuários. Ela suporta operações de criação, atualização, exclusão e listagem de usuários. A API utiliza o SQLite como banco de dados por padrão, mas está preparada para ser migrada para MySQL. Além disso, foi configurada com Swagger para documentação interativa.

## Funcionalidades

A API oferece os seguintes endpoints:

- **GET** `/users`: Lista todos os usuários
- **POST** `/users`: Cria um novo usuário
- **PUT** `/users/:id`: Atualiza os dados de um usuário específico
- **DELETE** `/users/:id`: Deleta um usuário específico

### Dados do Usuário

- `name` (string): Nome do usuário
- `age` (integer): Idade do usuário
- `birthdate` (string): Data de nascimento
- `phone` (string): Telefone
- `email` (string): E-mail
- `mother_name` (string): Nome da mãe
- `father_name` (string): Nome do pai
- `address` (string): Endereço

## Tecnologias Utilizadas

- **Node.js** - Plataforma de desenvolvimento
- **Express.js** - Framework para criação da API
- **SQLite** - Banco de dados relacional utilizado por padrão
- **MySQL** - Preparado para migração futura
- **Swagger** - Documentação da API

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- SQLite ou MySQL configurado (no momento, a API usa SQLite)

### Passos para configurar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/adrianoleitedasilva/user-api.git
cd user-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo .env:

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
# Configurações do banco de dados MySQL (para futura migração)
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=user_db

# Configuração do servidor
PORT=3000
```

4. Inicie o servidor:

```bash
node app.js
```

5. Rotas da API

### Listar todos os usuários
- **Rota**: GET /users
- **Descrição**: Retorna uma lista com todos os usuários cadastrados.
- **Exemplo de resposta**:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 30,
    "birthdate": "1994-10-10",
    "phone": "123456789",
    "email": "john@example.com",
    "mother_name": "Jane Doe",
    "father_name": "James Doe",
    "address": "123 Main St"
  }
]
```

### Criar um novo usuário
- **Rota**: POST /users
- **Descrição**: Cria um novo usuário.
- **Corpo da requisição**:

```bash
{
  "name": "John Doe",
  "age": 30,
  "birthdate": "1994-10-10",
  "phone": "123456789",
  "email": "john@example.com",
  "mother_name": "Jane Doe",
  "father_name": "James Doe",
  "address": "123 Main St"
}
```

### Atualizar um usuário existente
- **Rota**: PUT /users/:id
- **Descrição**: Atualiza os dados de um usuário existente.
- **Parâmetros**:
  - **id**: ID do usuário a ser atualizado.
- **Corpo da requisição**: (mesmo formato do POST /users)

### Deletar um usuário
- **Rota**: DELETE /users/:id
- **Descrição**: Deleta um usuário específico.
- **Parâmetros**:
  - **id**: ID do usuário a ser deletado.
 
## Documentação da API
A documentação interativa da API pode ser acessada através do Swagger:

```bash
URL: http://localhost:3000/api-docs
```

## Futuras Melhorias
- Migração para o banco de dados MySQL.
- Autenticação e autorização dos endpoints.
- Validação dos dados de entrada.
