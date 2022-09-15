import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository, Post } from '../domain';

@Injectable()
export class PostFinderByAuthor {
  constructor(
    @Inject('IPostRepository') private readonly postRepository: IPostRepository,
  ) {}

  run(authorId: string): Promise<Post[]> {
    return this.postRepository.findByAuthor(authorId);
  }
}
