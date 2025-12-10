// src/scores/scores.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Score } from './score.entity';
import { Student } from 'src/students/student.entity';
import { Subject } from 'src/subjects/subject.entity';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Score)
        private readonly scoreRepository: Repository<Score>,

        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,

        @InjectRepository(Subject)
        private readonly subjectRepo: Repository<Subject>,
    ) { }

    // Tạo điểm mới
    async create(scoreData: Partial<Score>): Promise<Score> {
        const score = this.scoreRepository.create(scoreData);
        return this.scoreRepository.save(score);
    }

    // Lấy tất cả điểm
    async findAll(): Promise<Score[]> {
        return this.scoreRepository.find({
            relations: {
                student: true,
                subject: true,
            },
        });
    }

    // Lấy điểm theo student id
    async findByStudent(studentId: number): Promise<Score[]> {
        return this.scoreRepository.find({
            where: { student: { id: studentId } },
            relations: {
                student: true,
                subject: true,
            },
        });
    }

    // Lấy điểm theo subject id
    async findBySubject(subjectId: number): Promise<Score[]> {
        return this.scoreRepository.find({
            where: { subject: { id: subjectId } },
            relations: {
                student: true,
                subject: true,
            },
        });
    }
    // Tìm theo sbd
    async findByStudentSbd(sbd: string): Promise<Score[]> {
        const student = await this.studentRepository.findOne({ where: { sbd } });
        if (!student) return [];
        return this.scoreRepository.find({
            where: { student: { id: student.id } },
            relations: ['subject', 'student'],
            order: { id: 'ASC' },
        });
    }
    // Lấy điểm theo id
    async findById(id: number): Promise<Score> {
        const score = await this.scoreRepository.findOne({
            where: { id },
            relations: {
                student: true,
                subject: true,
            },
        });

        if (!score) throw new NotFoundException('Score not found');
        return score;
    }

    // Update điểm
    async update(id: number, updateData: Partial<Score>): Promise<Score> {
        await this.scoreRepository.update(id, updateData);
        return this.findById(id);
    }

    // Xóa điểm
    async remove(id: number): Promise<void> {
        const result = await this.scoreRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Score not found');
        }
    }

    // ===================== REPORT =====================

    // Biểu đồ 1: phân bố điểm theo môn
    async getScoreDistribution(subjectCode: string) {
        const subject = await this.subjectRepo.findOne({ where: { code: subjectCode } });
        if (!subject) return [];

        const scores = await this.scoreRepository.find({ where: { subject: { id: subject.id } } });

        const distribution = { '>=8': 0, '6-<8': 0, '4-<6': 0, '<4': 0 };

        scores.forEach(s => {
            const val = parseFloat(s.score) || 0;
            if (val >= 8) distribution['>=8']++;
            else if (val >= 6) distribution['6-<8']++;
            else if (val >= 4) distribution['4-<6']++;
            else distribution['<4']++;
        });

        return Object.entries(distribution).map(([range, count]) => ({ range, count }));
    }

    // Biểu đồ 2: Top 10 sinh viên theo tổng Toán + Lý + Hóa
    async getTopStudents() {
        // Lấy 3 môn cần tính tổng
        const subjects = await this.subjectRepo.find({
            where: { code: In(['toan', 'vat_li', 'hoa_hoc']) }
        });

        if (!subjects || subjects.length !== 3) return [];

        const subjectIds = subjects.map(s => s.id);
        const subjectCodes = subjects.map(s => s.code);

        // Lấy tất cả điểm của 3 môn này
        const scores = await this.scoreRepository.find({
            where: { subject: { id: In(subjectIds) } },
            relations: ['student', 'subject'],
        });

        // Gom điểm theo sinh viên
        const studentMap: Record<number, Record<string, number>> = {};
        const studentNames: Record<number, string> = {};

        scores.forEach(s => {
            const sid = s.student.id;
            if (!studentMap[sid]) studentMap[sid] = {};
            studentMap[sid][s.subject.code] = parseFloat(s.score) || 0;
            studentNames[sid] = s.student.sbd; // hoặc dùng tên sinh viên nếu có
        });

        // Tính tổng chỉ với sinh viên có đầy đủ 3 môn
        const totals: { name: string; total: number }[] = [];

        for (const sid in studentMap) {
            const studentScores = studentMap[sid];
            // Kiểm tra sinh viên có đủ điểm 3 môn
            const hasAllSubjects = subjectCodes.every(code => studentScores[code] !== undefined && studentScores[code] !== null);
            if (!hasAllSubjects) continue;

            const total = subjectCodes.reduce((sum, code) => sum + studentScores[code], 0);
            totals.push({ name: studentNames[sid], total });
        }

        // Sắp xếp giảm dần và lấy top 10
        return totals.sort((a, b) => b.total - a.total).slice(0, 10);
    }
}
