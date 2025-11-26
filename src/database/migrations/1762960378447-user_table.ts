import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTable1762960378447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.query(`
            CREATE TABLE users (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name varchar(255) NOT NULL,
                surname varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                created_at timestamptz NOT NULL DEFAULT now(),
                CONSTRAINT pk_users_id PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS users')
    }
}
