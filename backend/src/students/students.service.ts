import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Tạo sinh viên
  async create(data: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(data);
    return await this.studentRepository.save(student);
  }

  // Lấy toàn bộ sinh viên
  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      relations: ['scores', 'scores.subject'],
    });
  }

  // Tìm theo ID
  async findById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['scores', 'scores.subject'],
    });

    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // 🔥 Tìm theo SBD (quan trọng nhất)
  async findBySbd(sbd: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { sbd },
      relations: ['scores', 'scores.subject'],
    });

    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // Cập nhật
  async update(id: number, updateData: Partial<Student>): Promise<Student> {
    const student = await this.findById(id);

    Object.assign(student, updateData);
    return this.studentRepository.save(student);
  }

  // Xóa
  async remove(id: number): Promise<void> {
    const student = await this.findById(id);
    await this.studentRepository.remove(student);
  }
}
