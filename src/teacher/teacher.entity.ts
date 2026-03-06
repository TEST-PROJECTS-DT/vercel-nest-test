import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Assignment } from '../assignment/assignment.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Student, (student: Student) => student.teacher)
  students: Student[];

  @OneToMany(() => Assignment, (assignment: Assignment) => assignment.teacher)
  assignments: Assignment[];
}
