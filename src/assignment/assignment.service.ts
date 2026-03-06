import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../student/student.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find({
      relations: ['teacher', 'student'],
    });
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['teacher', 'student'],
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with id ${id} not found`);
    }

    return assignment;
  }

  async create(dto: CreateAssignmentDto): Promise<Assignment> {
    const teacher = await this.teacherRepository.findOne({
      where: { id: dto.teacherId },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${dto.teacherId} not found`);
    }

    const student = await this.studentRepository.findOne({
      where: { id: dto.studentId },
    });
    if (!student) {
      throw new NotFoundException(`Student with id ${dto.studentId} not found`);
    }

    const assignment = this.assignmentRepository.create({
      title: dto.title,
      description: dto.description ?? null,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      teacher,
      student,
    });

    return this.assignmentRepository.save(assignment);
  }

  async update(id: number, dto: UpdateAssignmentDto): Promise<Assignment> {
    const assignment = await this.findOne(id);

    if (dto.teacherId) {
      const teacher = await this.teacherRepository.findOne({
        where: { id: dto.teacherId },
      });
      if (!teacher) {
        throw new NotFoundException(
          `Teacher with id ${dto.teacherId} not found`,
        );
      }
      assignment.teacher = teacher;
    }

    if (dto.studentId) {
      const student = await this.studentRepository.findOne({
        where: { id: dto.studentId },
      });
      if (!student) {
        throw new NotFoundException(
          `Student with id ${dto.studentId} not found`,
        );
      }
      assignment.student = student;
    }

    if (dto.title !== undefined) {
      assignment.title = dto.title;
    }

    if (dto.description !== undefined) {
      assignment.description = dto.description ?? null;
    }

    if (dto.dueDate !== undefined) {
      assignment.dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
    }

    return this.assignmentRepository.save(assignment);
  }

  async remove(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    await this.assignmentRepository.remove(assignment);
  }
}
