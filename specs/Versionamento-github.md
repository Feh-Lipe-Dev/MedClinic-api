# VERSIONAMENTO COM GITHUB {#44-versionamento-com-github}

## Branches mínimas para projeto individual

- main
- develop
- feat/setup-projeto
- feat/auth
- feat/rbac
- docs/readme

**Fluxo de desenvolvimento recomendado:**

- Criar uma nova branch a partir da develop;
- Implementar a funcionalidade proposta;
- Realizar commits semânticos durante o desenvolvimento;
- Integrar a funcionalidade na branch develop;
- Após a conclusão desta etapa, realizar a integração da develop na main.

### Commits mínimos

Projeto Individual: mínimo de 12 commits semânticos demonstrando a evolução contínua do projeto. Exemplos de mensagens de commit:

- feat: cria estrutura inicial do projeto
- feat: configura conexão com PostgreSQL via TypeORM
- feat: cria entidade de usuário
- feat: implementa cadastro de usuários
- feat: implementa criptografia de senha com bcrypt
- feat: implementa login com emissão de JWT
- feat: implementa middleware de autenticação
- feat: implementa middleware de autorização (RBAC)
- feat: cria endpoints de verificação (users/me, admin/ping)
- refactor: reorganiza camada de services
- fix: corrige tratamento de token expirado
- docs: atualiza README
