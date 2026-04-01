# User API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)

API REST para gerenciamento de usuários, construída com Node.js, Express e Prisma.

## Tecnologias

- **Node.js** — runtime JavaScript
- **Express** — framework HTTP
- **Prisma** — ORM com banco de dados SQLite
- **bcrypt** — criptografia de senhas
- **Zod** — validação de dados
- **dotenv** — variáveis de ambiente
- **nodemon** — reload automático em desenvolvimento

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd user-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute a migration do banco de dados
npx prisma migrate dev --name init

# Inicie o servidor em modo desenvolvimento
npm run dev
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor em produção |
| `npm run dev` | Inicia o servidor com nodemon (reload automático) |
| `npm run migrate` | Executa migrations do Prisma |

## Estrutura do projeto

```
user-api/
├── prisma/
│   └── schema.prisma        # Definição do modelo de dados
├── src/
│   ├── controllers/
│   │   └── userController.js  # Handlers das rotas
│   ├── middlewares/
│   │   └── validateUser.js    # Validação com Zod
│   ├── routes/
│   │   └── userRoutes.js      # Definição das rotas
│   ├── services/
│   │   └── userService.js     # Regras de negócio
│   └── app.js                 # Configuração do Express
├── server.js                  # Ponto de entrada
├── .env                       # Variáveis de ambiente
└── package.json
```

## Modelo de dados

```prisma
model User {
  id        String    @id @default(uuid())
  nome      String
  email     String    @unique
  senha     String
  status    String    @default("ativo")
  deletedAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

> A senha **nunca** é retornada nas respostas da API.
> A exclusão é **lógica**: o campo `deletedAt` é preenchido, o registro não é removido do banco.

## Endpoints

### Criar usuário

```
POST /users
```

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "minhasenha123"
}
```

**Resposta 201:**
```json
{
  "id": "uuid",
  "nome": "João Silva",
  "email": "joao@email.com",
  "status": "ativo",
  "deletedAt": null,
  "createdAt": "2026-04-01T00:00:00.000Z",
  "updatedAt": "2026-04-01T00:00:00.000Z"
}
```

---

### Listar usuários

```
GET /users
```

Retorna todos os usuários ativos (não excluídos logicamente).

**Resposta 200:**
```json
[
  {
    "id": "uuid",
    "nome": "João Silva",
    "email": "joao@email.com",
    "status": "ativo",
    "deletedAt": null,
    "createdAt": "2026-04-01T00:00:00.000Z",
    "updatedAt": "2026-04-01T00:00:00.000Z"
  }
]
```

---

### Buscar usuário por ID

```
GET /users/:id
```

**Resposta 200:**
```json
{
  "id": "uuid",
  "nome": "João Silva",
  "email": "joao@email.com",
  "status": "ativo",
  "deletedAt": null,
  "createdAt": "2026-04-01T00:00:00.000Z",
  "updatedAt": "2026-04-01T00:00:00.000Z"
}
```

---

### Atualizar usuário

```
PUT /users/:id
```

Todos os campos são opcionais. Apenas `nome`, `email`, `senha` e `status` são aceitos.

**Body:**
```json
{
  "nome": "João Atualizado",
  "email": "novo@email.com",
  "senha": "novasenha456",
  "status": "inativo"
}
```

**Resposta 200:**
```json
{
  "id": "uuid",
  "nome": "João Atualizado",
  "email": "novo@email.com",
  "status": "inativo",
  "deletedAt": null,
  "createdAt": "2026-04-01T00:00:00.000Z",
  "updatedAt": "2026-04-01T00:00:00.000Z"
}
```

---

### Excluir usuário (exclusão lógica)

```
DELETE /users/:id
```

O usuário não é removido do banco — apenas o campo `deletedAt` é preenchido com a data atual.

**Resposta 200:**
```json
{
  "message": "User deleted successfully",
  "user": {
    "id": "uuid",
    "nome": "João Silva",
    "email": "joao@email.com",
    "status": "ativo",
    "deletedAt": "2026-04-01T00:00:00.000Z",
    "createdAt": "2026-04-01T00:00:00.000Z",
    "updatedAt": "2026-04-01T00:00:00.000Z"
  }
}
```

---

## Códigos de resposta

| Código | Situação |
|--------|----------|
| `201 Created` | Usuário criado com sucesso |
| `200 OK` | Consulta, atualização ou exclusão com sucesso |
| `400 Bad Request` | Dados inválidos ou campos ausentes |
| `404 Not Found` | Usuário não encontrado |
| `409 Conflict` | E-mail já cadastrado |
| `500 Internal Server Error` | Erro inesperado no servidor |

## Validações

### Criação (`POST /users`)

| Campo | Regra |
|-------|-------|
| `nome` | Obrigatório, mínimo 3 caracteres |
| `email` | Obrigatório, formato válido, único no sistema |
| `senha` | Obrigatória, mínimo 8 caracteres |

### Atualização (`PUT /users/:id`)

| Campo | Regra |
|-------|-------|
| `nome` | Opcional, mínimo 3 caracteres |
| `email` | Opcional, formato válido, único no sistema |
| `senha` | Opcional, mínimo 8 caracteres |
| `status` | Opcional, deve ser `"ativo"` ou `"inativo"` |

> Campos fora do modelo não são aceitos — a requisição retorna `400`.

## Exemplos com curl

```bash
# Criar usuário
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva", "email": "joao@email.com", "senha": "minhasenha123"}'

# Listar usuários
curl http://localhost:3000/users

# Buscar por ID
curl http://localhost:3000/users/<id>

# Atualizar usuário
curl -X PUT http://localhost:3000/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"nome": "Novo Nome"}'

# Excluir usuário
curl -X DELETE http://localhost:3000/users/<id>
```

## Regras de negócio

- A senha é sempre criptografada com `bcrypt` (salt rounds: 10) antes de ser salva
- A senha **nunca** é retornada em nenhuma resposta da API
- E-mail duplicado retorna `409 Conflict`, tanto no cadastro quanto na atualização
- Usuários excluídos logicamente não aparecem na listagem (`GET /users`) nem podem ser buscados por ID
- As datas `createdAt` e `updatedAt` são gerenciadas automaticamente pelo Prisma
- A exclusão é lógica: o campo `deletedAt` recebe a data atual, preservando o histórico no banco
