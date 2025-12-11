import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ScoresModule } from './scores/scores.module';
import { Student } from './students/student.entity';
import { Subject } from './subjects/subject.entity';
import { Score } from './scores/score.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    // Load .env và make global
    ConfigModule.forRoot({ isGlobal: true }),

    // Kết nối TypeORM với PostgreSQL bằng DATABASE_URL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        // Nếu muốn debug, có thể bật logging
        logging: true,
        autoLoadEntities: true, // tự load entity từ modules
        synchronize: false, // tránh mất dữ liệu trong production
        migrations: ['dist/migrations/*.js'],
      }),
    }),

    StudentsModule,
    SubjectsModule,
    ScoresModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
