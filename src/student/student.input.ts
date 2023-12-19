import { IsString, MaxLength, MinLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Field()
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @Field()
  lastName: string;
}
