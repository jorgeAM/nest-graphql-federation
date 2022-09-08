import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field((type) => GraphQLTimestamp)
  createdAt: Date;

  @Field((type) => GraphQLTimestamp)
  updatedAt: Date;
}
