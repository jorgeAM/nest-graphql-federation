import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository, Post } from '../domain';

@Injectable()
export class PostFinder {
  constructor(
    @Inject('IPostRepository') private readonly postRepository: IPostRepository,
  ) {}

  async run(id: string): Promise<Post> {
    const post = this.postRepository.findById(id);

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }
}
