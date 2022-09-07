import { User } from './user';

export interface IUserRepository {
  find(): Promise<User[]>;
  findById(id: string): Promise<User>;
  create(user: User): Promise<void>;
}
