import { v4 as uuidv4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository, Post } from '../domain';

interface PostCreatorPayload {
  title: string;
  author: string;
}

@Injectable()
export class PostCreator {
  constructor(
    @Inject('IPostRepository') private readonly postRepository: IPostRepository,
  ) {}

  async run(payload: PostCreatorPayload): Promise<Post> {
    const { title, author } = payload;

    const id = uuidv4() as string;

    const post = new Post(id, title, author);

    await this.postRepository.create(post);

    return post;
  }
}
