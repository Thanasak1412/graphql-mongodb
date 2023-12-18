/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { Lesson } from './model/lesson.model';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

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
}
