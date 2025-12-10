// src/subjects/subjects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subject)
        private readonly subjectRepository: Repository<Subject>,
    ) {}

    // Tạo môn học mới
    async create(subjectData: Partial<Subject>): Promise<Subject> {
        const subject = this.subjectRepository.create(subjectData);
        return this.subjectRepository.save(subject);
    }

    // Lấy tất cả môn học
    async findAll(): Promise<Subject[]> {
        return this.subjectRepository.find({
            relations: {
                scores: true,
            },
        });
    }

    // Tìm theo id
    async findById(id: number): Promise<Subject> {
        const subject = await this.subjectRepository.findOne({
            where: { id },
            relations: {
                scores: true,
            },
        });
        if (!subject) throw new NotFoundException('Subject not found');
        return subject;
    }

    // Tìm theo code
    async findByCode(code: string): Promise<Subject> {
        const subject = await this.subjectRepository.findOne({
            where: { code },
            relations: {
                scores: true,
            },
        });
        if (!subject) throw new NotFoundException('Subject not found');
        return subject;
    }

    // Update môn học
    async update(id: number, updateData: Partial<Subject>): Promise<Subject> {
        await this.subjectRepository.update(id, updateData);
        return this.findById(id);
    }

    // Xóa môn học
    async remove(id: number): Promise<void> {
        await this.subjectRepository.delete(id);
    }
}
