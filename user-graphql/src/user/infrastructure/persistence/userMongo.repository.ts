import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from 'nest-mongodb';
import { IUserRepository, User } from '../../domain';

type UserDoc = Omit<User, 'id' | 'sayHi'> & { _id: ObjectId; __v: number };

@Injectable()
export class UserMongoRepository implements IUserRepository {
  constructor(
    @InjectCollection('users') private readonly collection: Collection,
  ) {}

  async find(): Promise<User[]> {
    const docs = await this.collection.find().toArray();

    return docs.map((doc: UserDoc) => this.fromDoc(doc));
  }

  async findById(id: string): Promise<User> {
    const query = {
      _id: new ObjectId(id),
    };

    const doc = await this.collection.findOne<UserDoc>(query);

    return this.fromDoc(doc);
  }

  async create(user: User): Promise<void> {
    const doc = this.toDoc(user);

    await this.collection.insertOne(doc);
  }

  private fromDoc(doc: UserDoc): User {
    return new User(
      doc._id.toHexString(),
      doc.name,
      doc.surname,
      doc.email,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  private toDoc(user: User): UserDoc {
    const { id, name, surname, email, createdAt, updatedAt } = user;

    return {
      _id: new ObjectId(id),
      name,
      surname,
      email,
      createdAt,
      updatedAt,
      __v: 0,
    };
  }
}
