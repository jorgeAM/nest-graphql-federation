import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../domain';
import { AllUserFinder, UserCreator, UserFinder } from '../../application';
import { CreateUserInput } from './input';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userCreator: UserCreator,
    private readonly userFinder: UserFinder,
    private readonly allUserFinder: AllUserFinder,
  ) {}

  @Query()
  async user(@Args('id') id: string): Promise<User> {
    return this.userFinder.run(id);
  }

  @Query()
  async users(): Promise<User[]> {
    return this.allUserFinder.run();
  }

  @Mutation((returns) => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userCreator.run(input);
  }
}
