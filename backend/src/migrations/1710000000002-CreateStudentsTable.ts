import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudentsTable1710000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "students",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "sbd",
                        type: "varchar",
                        isUnique: true,
                    },

                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("students");
    }
}
