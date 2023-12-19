import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Student } from './model/student.entity';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly dataSource: DataSource,
  ) {}

  getStudents() {
    return this.studentRepository.find();
  }

  getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuidv4(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.dataSource.getMongoRepository(Student).find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
