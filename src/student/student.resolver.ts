/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Student } from './model/student.model';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query((returns) => [Student])
  students(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query((returns) => Student)
  student(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudent(id);
  }

  @Mutation((returns) => Student)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
