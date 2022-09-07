import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { UserCreator, UserFinder } from './aplication';
import { UserMongoRepository } from './infrastructure/persistence/userMongo.repository';

@Module({
  imports: [MongoModule.forFeature(['users'])],
  providers: [
    UserCreator,
    UserFinder,
    {
      provide: 'IUserRepository',
      useClass: UserMongoRepository,
    },
  ],
})
export class UserModule {}
