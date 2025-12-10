// src/scores/scores.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { Score } from './score.entity';
import { Student } from 'src/students/student.entity';
import { Subject } from 'src/subjects/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Student, Subject])],
  providers: [ScoresService],
  controllers: [ScoresController],
  exports: [ScoresService],
})
export class ScoresModule { }
