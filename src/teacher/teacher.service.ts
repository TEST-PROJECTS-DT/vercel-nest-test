import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({
      relations: ['students', 'assignments'],
    });
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['students', 'assignments'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${id} not found`);
    }

    return teacher;
  }

  create(dto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(dto);
    return this.teacherRepository.save(teacher);
  }

  async update(id: number, dto: UpdateTeacherDto): Promise<Teacher> {
    const teacher = await this.findOne(id);
    Object.assign(teacher, dto);
    return this.teacherRepository.save(teacher);
  }

  async remove(id: number): Promise<void> {
    const teacher = await this.findOne(id);
    await this.teacherRepository.remove(teacher);
  }
}
