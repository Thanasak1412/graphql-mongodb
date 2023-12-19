import { IsDateString, IsString, IsUUID, MinLength } from 'class-validator';

import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLessonInput {
  @Field()
  @MinLength(1)
  @IsString()
  name: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String], { defaultValue: [] })
  @IsString({ each: true })
  students: string[];
}

@InputType()
export class AssignStudentsToLessonInput {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  @IsUUID()
  lessonId: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [ID])
  @IsUUID('4', { each: true })
  studentIds: string[];
}
