import { User } from './user';

export interface IUserRepository {
  findById(id: string): Promise<User>;
  create(user: User): Promise<void>;
}
