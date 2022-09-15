import { Post } from './post';

export interface IPostRepository {
  create(post: Post): Promise<void>;
  findById(id: string): Promise<Post>;
  findByAuthor(authorId: string): Promise<Post[]>;
}
