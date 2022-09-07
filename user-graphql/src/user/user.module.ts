import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { AllUserFinder, UserCreator, UserFinder } from './application';
import { UserMongoRepository } from './infrastructure/persistence/userMongo.repository';
import { UserResolver } from './infrastructure/graphql/user.resolver';

@Module({
  imports: [MongoModule.forFeature(['users'])],
  providers: [
    UserCreator,
    UserFinder,
    AllUserFinder,
    {
      provide: 'IUserRepository',
      useClass: UserMongoRepository,
    },
    UserResolver,
  ],
})
export class UserModule {}
