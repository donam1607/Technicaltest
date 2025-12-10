// src/scores/scores.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException, Query } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { Score } from './score.entity';

@Controller('scores')
export class ScoresController {
    constructor(private readonly scoresService: ScoresService) { }

    @Post()
    async create(@Body() scoreData: Partial<Score>): Promise<Score> {
        return this.scoresService.create(scoreData);
    }

    @Get()
    async findAll(): Promise<Score[]> {
        return this.scoresService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Score> {
        return this.scoresService.findById(id);
    }

    @Get('student/:studentId')
    async findByStudent(@Param('studentId') studentId: number): Promise<Score[]> {
        return this.scoresService.findByStudent(studentId);
    }
    @Get('get_student/:sbd')
    async getScoresBySbd(@Param('sbd') sbd: string) {
        const scores = await this.scoresService.findByStudentSbd(sbd);
        if (!scores || scores.length === 0) {
            throw new NotFoundException(`No scores found for student sbd: ${sbd}`);
        }
        return scores;
    }
    @Get('subject/:subjectId')
    async findBySubject(@Param('subjectId') subjectId: number): Promise<Score[]> {
        return this.scoresService.findBySubject(subjectId);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateData: Partial<Score>,
    ): Promise<Score> {
        return this.scoresService.update(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        await this.scoresService.remove(id);
        return { message: 'Score deleted successfully' };
    }

    // ----------------- Report -----------------

    // Biểu đồ phân bố điểm theo môn
    // query param: ?subjectCode=toan
    @Get('report/distribution')
    async getScoreDistribution(@Query('subjectCode') subjectCode: string) {
        if (!subjectCode) {
            throw new NotFoundException('subjectCode query parameter is required');
        }
        return this.scoresService.getScoreDistribution(subjectCode);
    }

    // Top 10 sinh viên tổng điểm Toán-Lý-Hóa
    @Get('report/top10')
    async getTopStudents() {
        return this.scoresService.getTopStudents();
    }
}
