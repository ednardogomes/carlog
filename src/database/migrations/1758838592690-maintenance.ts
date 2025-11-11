import { MigrationInterface, QueryRunner } from 'typeorm';

export class Maintenance1758838592690 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE maintenances (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                vehicle_id uuid NOT NULL,
                km varchar(10),
                service varchar(255),
                cost numeric(10, 2),
                maintenance_date DATE,
                description text,
                created_at timestamptz NOT NULL DEFAULT now(),
                CONSTRAINT pk_maintenance_id PRIMARY KEY (id),
                CONSTRAINT fk_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE maintenances;
        `);
    }
}
