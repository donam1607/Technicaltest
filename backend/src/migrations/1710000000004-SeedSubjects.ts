import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedSubjects1710000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO subjects (code, name) VALUES
        ('toan', 'Toán'),
        ('ngu_van', 'Ngữ văn'),
        ('ngoai_ngu', 'Ngoại ngữ'),
        ('vat_li', 'Vật lý'),
        ('hoa_hoc', 'Hóa học'),
        ('sinh_hoc', 'Sinh học'),
        ('lich_su', 'Lịch sử'),
        ('dia_li', 'Địa lý'),
        ('gdcd', 'GDCD'),
        ('ma_ngoai_ngu', 'Mã ngoại ngữ');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM subjects`);
  }
}
