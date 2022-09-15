import {
  Directive,
  Field,
  GraphQLTimestamp,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field((type) => User)
  author: User;

  @Field((type) => GraphQLTimestamp)
  createdAt: Date;

  @Field((type) => GraphQLTimestamp)
  updatedAt: Date;
}
