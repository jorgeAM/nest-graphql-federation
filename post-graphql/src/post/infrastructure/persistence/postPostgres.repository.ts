import { Client } from 'pg';
import { Injectable } from '@nestjs/common';
import { Post, IPostRepository } from '../../domain';

interface PostPostgresDTO {
  id: string;
  title: string;
  author: string;
  createdat: Date;
  updatedat: Date;
}

@Injectable()
export class PostPostgresRepository implements IPostRepository {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      user: 'admin',
      host: '127.0.0.1',
      database: 'postgraphql',
      password: '123456',
      port: 5432,
      ssl: false,
    });

    this.client.connect();
  }

  async create(post: Post): Promise<void> {
    const { id, title, author, createdAt, updatedAt } = post;

    const queryText =
      'INSERT INTO posts(id, title, author, createdat, updatedat) VALUES($1, $2, $3, $4, $5)';

    await this.client.query(queryText, [
      id,
      title,
      author,
      createdAt,
      updatedAt,
    ]);
  }

  async findById(id: string): Promise<Post> {
    const res = await this.client.query<PostPostgresDTO>(
      'SELECT * FROM posts WHERE id = $1',
      [id],
    );

    return res.rows.length === 0 && this.toEntity(res.rows[0]);
  }

  private toEntity(dto: PostPostgresDTO): Post {
    const { id, title, author, createdat, updatedat } = dto;

    return new Post(id, title, author, createdat, updatedat);
  }
}
