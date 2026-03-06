import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Teacher } from '../teacher/teacher.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      relations: ['teacher', 'assignments'],
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['teacher', 'assignments'],
    });

    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }

    return student;
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
    });

    if (dto.teacherId) {
      const teacher = await this.teacherRepository.findOne({
        where: { id: dto.teacherId },
      });
      if (!teacher) {
        throw new NotFoundException(
          `Teacher with id ${dto.teacherId} not found`,
        );
      }
      student.teacher = teacher;
    }

    return this.studentRepository.save(student);
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    if (dto.teacherId !== undefined) {
      if (dto.teacherId === null) {
        student.teacher = null;
      } else {
        const teacher = await this.teacherRepository.findOne({
          where: { id: dto.teacherId },
        });
        if (!teacher) {
          throw new NotFoundException(
            `Teacher with id ${dto.teacherId} not found`,
          );
        }
        student.teacher = teacher;
      }
    }

    Object.assign(student, {
      firstName: dto.firstName ?? student.firstName,
      lastName: dto.lastName ?? student.lastName,
      email: dto.email ?? student.email,
    });

    return this.studentRepository.save(student);
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
  }
}
