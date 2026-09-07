# MedClinic API

API de gerenciamento de uma clínica médica de pequeno porte.

**Etapa atual:** base de autenticação e autorização do sistema (cadastro de usuários, login com JWT e controle de acesso por perfis).

## Tecnologias

- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL (Neon Tech)
- JWT (jsonwebtoken)
- Bcryptjs

## Requisitos

- Node.js instalado na máquina
- Banco de dados PostgreSQL (ou string de conexão Neon)
- npm

## Configuração do ambiente

1. Copie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

## Execução

**Desenvolvimento:**

```bash
npm run dev
```

**Build e produção:**

```bash
npm run build
npm start
```

A API escutará na porta definida em `PORT` no arquivo `.env` (padrão: 3000).

## Documentação

Documentação completa dos endpoints, arquitetura e perfis de acesso: em construção nesta etapa.