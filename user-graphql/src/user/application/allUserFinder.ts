import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, User } from '../domain';

@Injectable()
export class AllUserFinder {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async run(): Promise<User[]> {
    return this.userRepository.find();
  }
}
