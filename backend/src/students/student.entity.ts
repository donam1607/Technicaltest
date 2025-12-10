// src/students/student.entity.ts

import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Score } from '../scores/score.entity';

@Entity('students')
export class Student extends BaseEntity {
  @Column({ unique: true })
  sbd: string; // Số báo danh

  // Quan hệ với bảng scores
  @OneToMany(() => Score, (score) => score.student)
  scores: Score[];
}
