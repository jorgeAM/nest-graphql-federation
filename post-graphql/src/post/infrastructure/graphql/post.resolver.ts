import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { PostCreator, PostFinder } from 'src/post/application';
import { CreatePostInput } from './input';
import { Post } from './post';
import { User } from './user';

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private postCreator: PostCreator,
    private postFinder: PostFinder,
  ) {}

  @Query((returns) => Post)
  post(@Args('id') id: string) {
    return this.postFinder.run(id);
  }

  @Mutation((returns) => Post)
  createPost(@Args('createPostInput') input: CreatePostInput) {
    return this.postCreator.run(input);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.postFinder.run(reference.id);
  }

  @ResolveField((of) => User)
  user(@Parent() post: Post): any {
    return { __typename: 'User', id: post.author };
  }
}
