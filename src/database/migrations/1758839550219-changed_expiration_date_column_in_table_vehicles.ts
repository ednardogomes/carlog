import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangedExpirationDateColumnInTableVehicles1758839550219
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vehicles
            RENAME COLUMN expiration_date TO created_at;;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vehicles
            RENAME COLUMN created_at TO expiration_date
        `);
    }
}
