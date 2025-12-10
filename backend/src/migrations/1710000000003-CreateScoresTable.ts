import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateScoresTable1710000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "scores",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true,
                },
                {
                    name: "score",
                    type: "varchar",
                
                },
                {
                    name: "studentId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "subjectId",
                    type: "int",
                    isNullable: false,
                },

            ],
        }));

        // FK → students.id
        await queryRunner.createForeignKey("scores", new TableForeignKey({
            columnNames: ["studentId"],
            referencedColumnNames: ["id"],
            referencedTableName: "students",
            onDelete: "CASCADE",
        }));

        // FK → subjects.id
        await queryRunner.createForeignKey("scores", new TableForeignKey({
            columnNames: ["subjectId"],
            referencedColumnNames: ["id"],
            referencedTableName: "subjects",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("scores");
    }
}
