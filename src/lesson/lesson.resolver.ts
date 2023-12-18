/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { LessonService } from './lesson.service';
import { Lesson } from './model/lesson.model';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query((returns) => Lesson)
  lesson() {
    return {
      id: 'fajskdfjk123',
      name: 'lesson',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Mutation((returns) => Lesson)
  createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ) {
    return this.lessonService.createLesson(name, startDate, endDate);
  }
}
