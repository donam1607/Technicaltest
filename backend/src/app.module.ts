import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ScoresModule } from './scores/scores.module';
import { Student } from './students/student.entity';
import { Subject } from './subjects/subject.entity';
import { Score } from './scores/score.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    // Load biến môi trường từ .env
    ConfigModule.forRoot({ isGlobal: true }),

    // Kết nối PostgreSQL qua DATABASE_URL
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,        // lấy từ file .env
      entities: [Student, Subject, Score],
      synchronize: false,                  // production nên false
      migrations: ['dist/migrations/*.js'],
      ssl: { rejectUnauthorized: false },  // cần khi dùng cloud DB
    }),

    // Các module
    StudentsModule,
    SubjectsModule,
    ScoresModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
