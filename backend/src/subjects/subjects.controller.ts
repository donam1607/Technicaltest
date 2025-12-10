// src/subjects/subjects.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './subject.entity';

@Controller('subjects')
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) { }

    @Post()
    async create(@Body() subjectData: Partial<Subject>): Promise<Subject> {
        return this.subjectsService.create(subjectData);
    }

    @Get()
    async findAll(): Promise<Subject[]> {
        return this.subjectsService.findAll();
    }

    // Quan trọng: đặt route này lên trước
    @Get('code/:code')
    async findByCode(@Param('code') code: string): Promise<Subject> {
        return this.subjectsService.findByCode(code);
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Subject> {
        return this.subjectsService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateData: Partial<Subject>): Promise<Subject> {
        return this.subjectsService.update(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        await this.subjectsService.remove(id);
        return { message: 'Subject deleted successfully' };
    }
}
