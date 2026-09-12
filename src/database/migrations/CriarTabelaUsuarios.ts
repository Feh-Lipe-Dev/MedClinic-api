import { MigrationInterface, QueryRunner } from 'typeorm'

export class CriarTabelaUsuarios implements MigrationInterface {
    name = 'CriarTabelaUsuarios1789234608008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await queryRunner.query(
            `CREATE TYPE usuarios_role_enum AS ENUM ('ATENDENTE', 'ADMIN')`
        )
        await queryRunner.query(`
            CREATE TABLE usuarios (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                nome character varying NOT NULL,
                email character varying NOT NULL,
                senha character varying NOT NULL,
                role usuarios_role_enum NOT NULL DEFAULT 'ATENDENTE',
                "criadoEm" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_usuarios" PRIMARY KEY (id),
                CONSTRAINT "UQ_usuarios_email" UNIQUE (email)
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS usuarios`)
        await queryRunner.query(`DROP TYPE IF EXISTS usuarios_role_enum`)
    }
}