import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';
import { Assignment } from '../assignment/assignment.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Teacher, (teacher: Teacher | null) => teacher?.students, {
    nullable: true,
  })
  teacher: Teacher | null;

  @OneToMany(() => Assignment, (assignment: Assignment) => assignment.student)
  assignments: Assignment[];
}
