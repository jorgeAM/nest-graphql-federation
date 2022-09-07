import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @MinLength(3)
  name: string;
  @Field()
  @MinLength(3)
  surname: string;
  @Field()
  @IsEmail()
  email: string;
}
