# MedClinic API

API de gerenciamento de uma clínica médica de pequeno porte.

**Etapa atual:** base de autenticação e autorização do sistema — cadastro de usuários, login com emissão de token JWT e controle de acesso por perfis (RBAC). As funcionalidades de domínio (especialidades, médicos, pacientes e consultas) fazem parte da próxima etapa.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| Node.js + TypeScript | Runtime e tipagem estática |
| Express.js | Framework HTTP |
| TypeORM | ORM e migrations |
| PostgreSQL | Banco de dados relacional |
| bcryptjs | Criptografia de senha (hash) |
| jsonwebtoken | Emissão e validação de token JWT |
| class-validator / class-transformer | Validação de dados (DTOs) |

## Requisitos

- Node.js 18 ou superior
- PostgreSQL
- npm

## Configuração do banco de dados

1. Crie o banco de dados na sua instância PostgreSQL e preencha as credenciais no `.env`.
2. Execute a migration, que cria a tabela `usuarios` e o tipo enum `usuarios_role_enum`:

   ```bash
   npm run typeorm -- migration:run -d src/database/data-source.ts
   ```

O schema do banco é controlado exclusivamente pelas migrations (o `synchronize` do TypeORM está desativado).

## Variáveis de ambiente

Copie o exemplo e preencha com os seus valores:

```bash
cp .env.example .env
```

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `PORT` | Porta da API | `3000` |
| `DB_HOST` / `DB_PORT` | Host e porta do PostgreSQL | `localhost` / `5432` |
| `DB_USER` / `DB_PASSWORD` | Credenciais do banco | — |
| `DB_DATABASE` | Nome do banco | `med-clinic-db` |
| `DB_SSL` | Usa SSL na conexão | `true` |
| `JWT_SECRET` | Chave secreta do token JWT | — |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | `1d` |

## Instalação e execução

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure o `.env` (item anterior).
3. Execute a migration de criação do banco.
4. Inicie a aplicação:

   ```bash
   npm run dev   # desenvolvimento (com reload)
   npm run build # compilar para produção
   npm start     # executar a build
   ```

A API fica disponível em `http://localhost:3000` (porta configurável via `PORT`).

## Arquitetura

Organização em camadas (MVC), com o seguinte fluxo de requisição:

```
Cliente HTTP → Rota → Middleware (auth/RBAC) → Controller → Service → Repository (TypeORM) → PostgreSQL
```

```
MedClinica-API/
└── src/
    ├── server.ts              # Ponto de entrada; registra rotas e middlewares
    ├── routes/                # Endpoints da API (auth, users, admin)
    ├── controllers/           # Tratam requisição/resposta e delegam aos services
    ├── services/              # Regras de negócio e validações
    ├── repositories/          # Comunicação com o banco via TypeORM
    ├── entities/              # Entidades (Usuario)
    ├── dtos/                  # Data Transfer Objects (validação de entrada)
    ├── middlewares/           # authMiddleware, exigeRole (RBAC), errorHandler, notFound
    ├── database/              # DataSource e migrations
    ├── utils/                 # Funções auxiliares (bcrypt, jwt, validarDto)
    └── types/                 # Tipos globais do Express (req.usuario)
```

## Endpoints

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| `POST` | `/auth/register` | Cadastra um novo usuário | Público |
| `POST` | `/auth/login` | Autentica e retorna o token JWT | Público |
| `GET` | `/users/me` | Dados do usuário autenticado | Autenticado |
| `GET` | `/admin/ping` | Verificação de autorização (ADMIN) | Autenticado + ADMIN |

### POST /auth/register

`POST http://localhost:3000/auth/register`

```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "senha123"
}
```

- `role` é opcional (padrão: `ATENDENTE`); para criar um administrador: `"role": "ADMIN"`.
- **201** → usuário cadastrado (sem a senha). **400** → validação. **409** → e-mail já cadastrado.

### POST /auth/login

`POST http://localhost:3000/auth/login`

```json
{
  "email": "joao@exemplo.com",
  "senha": "senha123"
}
```

- **200** → `{ "token", "id", "role" }` — token JWT com identificador e perfil, com expiração definida em `JWT_EXPIRES_IN`.
- **400** → validação. **401** → `Credenciais inválidas.`

### GET /users/me

`GET http://localhost:3000/users/me` — header `Authorization: Bearer <token>`

- **200** → dados do usuário autenticado (sem a senha). **401** → token ausente/inválido/expirado. **404** → usuário não encontrado.

### GET /admin/ping

`GET http://localhost:3000/admin/ping` — header `Authorization: Bearer <token>`

- **200** → `{ "mensagem": "pong" }`. **401** → não autenticado. **403** → `Acesso negado.` (perfil sem permissão).

## Perfis de acesso (RBAC)

| Perfil | Acesso |
| --- | --- |
| `ADMIN` | Completo — acessa também os endpoints administrativos (ex.: `/admin/ping`) |
| `ATENDENTE` | Operacional restrito — não possui acesso administrativo |

Os usuários são criados por meio do `POST /auth/register`; o perfil padrão é `ATENDENTE`, e administradores exigem `"role": "ADMIN"`.

## Vídeo de apresentação

Acesse o vídeo de apresentação para assistir a demonstração da API em funcionamento, incluindo cadastro, login e controle de acesso.

- [Vídeo](youtube.com)

## Autor

**Felipe** — Desenvolvedor

- [LinkedIn](https://www.linkedin.com/in/feh-lipe-dev/)
