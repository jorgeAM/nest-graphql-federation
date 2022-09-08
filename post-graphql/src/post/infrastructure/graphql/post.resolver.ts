import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostCreator, PostFinder } from 'src/post/application';
import { CreatePostInput } from './input';
import { Post } from './post';

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
}
