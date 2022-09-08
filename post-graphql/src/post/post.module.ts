import { Module } from '@nestjs/common';
import { PostCreator, PostFinder } from './application';
import { PostPostgresRepository } from './infrastructure/persistence/postPostgres.repository';
import { PostResolver } from './infrastructure/graphql/post.resolver';

@Module({
  imports: [],
  providers: [
    PostCreator,
    PostFinder,
    {
      provide: 'IPostRepository',
      useClass: PostPostgresRepository,
    },
    PostResolver,
  ],
})
export class PostModule {}
