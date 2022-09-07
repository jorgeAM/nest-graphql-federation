import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { IUserRepository, User } from '../domain';

interface UserCreatorPayload {
  name: string;
  surname: string;
  email: string;
}

@Injectable()
export class UserCreator {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async run(payload: UserCreatorPayload): Promise<User> {
    const { name, surname, email } = payload;

    const id = new ObjectId();

    const user = new User(id.toHexString(), name, surname, email);

    await this.userRepository.create(user);

    return user;
  }
}
