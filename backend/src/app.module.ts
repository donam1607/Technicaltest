import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ScoresModule } from './scores/scores.module';
import { Student } from './students/student.entity';
import { Subject } from './subjects/subject.entity';
import { Score } from './scores/score.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'diemthi_user',
      password: '123456',
      database: 'diem_thi',
      entities: [Student, Subject, Score],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
    }),
    StudentsModule,
    SubjectsModule,
    ScoresModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
