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
    // Load .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM dynamic config
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'), // LẤY URL TỪ .env
        ssl: { rejectUnauthorized: false }, // BẮT BUỘC CHO RENDER
        entities: [Student, Subject, Score],
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),

    StudentsModule,
    SubjectsModule,
    ScoresModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
