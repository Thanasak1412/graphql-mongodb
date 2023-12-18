import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Lesson {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
