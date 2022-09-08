import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  author: string;
}
