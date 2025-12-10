import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSubjectsTable1710000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "subjects",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true,
                },
                {
                    name: "code",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("subjects");
    }
}
