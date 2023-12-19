/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { StudentService } from '../student/student.service';
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { Lesson } from './model/lesson.model';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentsService: StudentService,
  ) {}

  @Query((returns) => [Lesson])
  lessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Query((returns) => Lesson)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => Lesson)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => Lesson)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;

    return this.lessonService.assignStudentToLesson(lessonId, studentIds);
  }

  @Mutation((returns) => Lesson)
  updateStudentLesson(
    @Args('updateStudentsLessonInput')
    updateStudentLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = updateStudentLessonInput;

    return this.lessonService.updateStudentLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentsService.getManyStudents(lesson.students);
  }
}
