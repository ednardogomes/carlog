import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFkUserAndColumnUserIdToVehiclesTable1762966017999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vehicles
            ADD COLUMN user_id UUID NOT NULL,
            ADD CONSTRAINT fk_vehicles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vehicles
            DROP CONSTRAINT fk_vehicles_user,
            DROP COLUMN user_id
            `)
    }

}
