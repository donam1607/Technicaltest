// src/subjects/subject.entity.ts

import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Score } from '../scores/score.entity';

@Entity('subjects')
export class Subject extends BaseEntity {
    @Column({ unique: true })
    code: string; // Mã môn (toan, ngu_van, vat_li, ...)

    @Column()
    name: string; // Tên môn (Toán, Ngữ văn, Vật lý, ...)

    @OneToMany(() => Score, (score) => score.subject)
    scores: Score[];
}
