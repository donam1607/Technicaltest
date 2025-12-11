import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true, // toàn bộ app có thể dùng process.env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          url: databaseUrl,
          ssl: {
            rejectUnauthorized: false, // bắt buộc với Render
          },
          entities: [Student, Subject, Score],
          synchronize: false,
          migrations: ['dist/migrations/*.js'],
        };
      },
    }),
    StudentsModule,
    SubjectsModule,
    ScoresModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
