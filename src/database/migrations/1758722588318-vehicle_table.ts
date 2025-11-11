import { MigrationInterface, QueryRunner } from 'typeorm';

export class VehicleTable1758722588318 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.query(`
            CREATE TABLE vehicles (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                make varchar(50) NOT NULL,
                model varchar(50) NOT NULL,
                license_plate varchar(7) UNIQUE NULL,
                color varchar(20) NULL,
                model_year varchar(8) NULL,
                created_at timestamptz NOT NULL DEFAULT now(),
                CONSTRAINT pk_vehicle_id PRIMARY KEY (id)
                CHECK (LENGTH(license_plate) = 7 OR license_plate IS NULL)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS vehicle;');
    }
}
