import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Teacher, Student])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
