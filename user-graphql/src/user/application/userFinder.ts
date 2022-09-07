import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, User } from '../domain';

@Injectable()
export class UserFinder {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async run(id: string): Promise<User> {
    const user = this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
