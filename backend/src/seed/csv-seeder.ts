import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '../students/student.entity';
import { Subject } from '../subjects/subject.entity';
import { Score } from '../scores/score.entity';

import * as fs from 'fs';
import csvParser from 'csv-parser';
import { DataSource } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const dataSource: DataSource = app.get(getDataSourceToken());
    const studentRepo = app.get(getRepositoryToken(Student));
    const subjectRepo = app.get(getRepositoryToken(Subject));
    const scoreRepo = app.get(getRepositoryToken(Score));

    // ---------------------------------------------------------------------
    // 1) TRUNCATE tất cả bảng có liên kết FK (CÁCH ĐÚNG NHẤT)
    // ---------------------------------------------------------------------
    console.log("🔄 Clearing tables...");

    await dataSource.query(`
    TRUNCATE TABLE scores, students, subjects RESTART IDENTITY CASCADE;
  `);

    console.log("✔ Tables cleared!");

    // ---------------------------------------------------------------------
    // 2) Đọc CSV
    // ---------------------------------------------------------------------
    const rows: any[] = [];

    await new Promise<void>((resolve) => {
        fs.createReadStream('./diem_thi_thpt_2024.csv')
            .pipe(csvParser())
            .on('data', (row) => rows.push(row))
            .on('end', () => resolve());
    });

    console.log(`📌 CSV Loaded: ${rows.length} dòng`);

    // ---------------------------------------------------------------------
    // 3) Danh sách môn học theo CSV
    // ---------------------------------------------------------------------
    const SUBJECTS = [
        { code: 'toan', name: 'Toán' },
        { code: 'ngu_van', name: 'Ngữ văn' },
        { code: 'ngoai_ngu', name: 'Ngoại ngữ' },
        { code: 'vat_li', name: 'Vật lý' },
        { code: 'hoa_hoc', name: 'Hóa học' },
        { code: 'sinh_hoc', name: 'Sinh học' },
        { code: 'lich_su', name: 'Lịch sử' },
        { code: 'dia_li', name: 'Địa lý' },
        { code: 'gdcd', name: 'GDCD' }
    ];

    // ---------------------------------------------------------------------
    // 4) Tạo subject
    // ---------------------------------------------------------------------
    console.log("🔄 Creating subjects...");

    const subjectEntities: Subject[] = [];

    for (const s of SUBJECTS) {
        const subject = subjectRepo.create(s);
        subjectEntities.push(await subjectRepo.save(subject));
    }

    const subjectMap = Object.fromEntries(subjectEntities.map(s => [s.code, s.id]));

    console.log("✔ Subjects created!");

    // ---------------------------------------------------------------------
    // 5) Import dữ liệu CSV vào Student + Scores
    // ---------------------------------------------------------------------
    console.log("🔄 Inserting students & scores...");

    for (const row of rows) {
        if (!row.sbd || row.sbd.trim() === '') continue;

        const student = await studentRepo.save(
            studentRepo.create({
                sbd: row.sbd,
            })
        );

        // ---- Lưu điểm ----
        for (const sub of SUBJECTS) {
            const value = row[sub.code];

            if (!value || value.trim() === '') continue;

            await scoreRepo.save(
                scoreRepo.create({
                    student,
                    subject: { id: subjectMap[sub.code] } as any,
                    score: value || ""
                })
            );
        }

        // ---- Lưu mã ngoại ngữ (ô cuối CSV) ----
        if (row.ma_ngoai_ngu && row.ma_ngoai_ngu.trim() !== '') {
            // Có thể lưu vào bảng subject riêng hoặc cột extra — tùy bạn
            // Hiện tại: tạo subject "ma_ngoai_ngu" nếu chưa có

            let foreignSubject = await subjectRepo.findOne({ where: { code: 'ma_ngoai_ngu' } });

            if (!foreignSubject) {
                foreignSubject = await subjectRepo.save(
                    subjectRepo.create({ code: 'ma_ngoai_ngu', name: 'Mã ngoại ngữ' })
                );
            }

            await scoreRepo.save(
                scoreRepo.create({
                    student,
                    subject: foreignSubject,
                    score: row.ma_ngoai_ngu || "", // hoặc null — tùy bạn
                })
            );
        }
    }

    console.log("🎉 Seed completed!");
    await app.close();
}

bootstrap();
