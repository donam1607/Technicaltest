// src/scores/score.entity.ts

import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Student } from '../students/student.entity';
import { Subject } from '../subjects/subject.entity';

@Entity('scores')
export class Score extends BaseEntity {
  @ManyToOne(() => Student, (student) => student.scores, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.scores, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  subject: Subject;

  @Column({ type: 'varchar' })
  score: string;
}
