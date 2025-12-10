import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Student } from './students/student.entity';
import { Subject } from './subjects/subject.entity';
import { Score } from './scores/score.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'diemthi_user',
    password: '123456',
    database: 'diem_thi',

    entities: [Student, Subject, Score],
    migrations: ['dist/migrations/*.js'],

    schema: 'public',          // 👈 BẮT BUỘC KHI PGADMIN BÁO "no schema selected"
    synchronize: false,
    logging: true,
});
