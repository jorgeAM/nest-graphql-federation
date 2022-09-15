import { Module } from '@nestjs/common';
import { PostCreator, PostFinder, PostFinderByAuthor } from './application';
import { PostPostgresRepository } from './infrastructure/persistence/postPostgres.repository';
import { PostResolver } from './infrastructure/graphql/post.resolver';
import { UserResolver } from './infrastructure/graphql/user.resolver';

@Module({
  imports: [],
  providers: [
    PostCreator,
    PostFinder,
    PostFinderByAuthor,
    {
      provide: 'IPostRepository',
      useClass: PostPostgresRepository,
    },
    PostResolver,
    UserResolver,
  ],
})
export class PostModule {}
