import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../student/student.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date | null;

  @ManyToOne(() => Teacher, (teacher) => teacher.assignments, {
    nullable: false,
  })
  teacher: Teacher;

  @ManyToOne(() => Student, (student) => student.assignments, {
    nullable: false,
  })
  student: Student;
}
