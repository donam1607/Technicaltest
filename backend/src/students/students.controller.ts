import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Post()
    async create(@Body() studentData: Partial<Student>): Promise<Student> {
        return this.studentsService.create(studentData);
    }

    @Get()
    async findAll(): Promise<Student[]> {
        return this.studentsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Student> {
        return this.studentsService.findById(id);
    }

    // 🔥 Route đúng để tìm theo số báo danh
    @Get('sbd/:sbd')
    async findBySbd(@Param('sbd') sbd: string): Promise<Student> {
        return this.studentsService.findBySbd(sbd);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateData: Partial<Student>,
    ): Promise<Student> {
        return this.studentsService.update(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        await this.studentsService.remove(id);
        return { message: 'Student deleted successfully' };
    }
}
