import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostFinderByAuthor } from 'src/post/application/postFinderByAuthor';
import { Post } from './post';
import { User } from './user';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly postFinderByAuthor: PostFinderByAuthor) {}

  @ResolveField((of) => [Post])
  public posts(@Parent() user: User) {
    return this.postFinderByAuthor.run(user.id);
  }
}
