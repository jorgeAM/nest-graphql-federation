import { Test } from '@nestjs/testing';
import { UserCreator } from '../../application';
import {
  instance,
  imock,
  when,
  verify,
  deepEqual,
  anyOfClass,
  capture,
} from '@johanblumenberg/ts-mockito';
import { IUserRepository, User } from '../../domain';

describe('UserCreator', () => {
  let mockedIUserRepository: IUserRepository;
  let userMockRepository: IUserRepository;
  let userCreator: UserCreator;

  beforeEach(async () => {
    mockedIUserRepository = imock();
    userMockRepository = instance(mockedIUserRepository);

    const moduleRef = await Test.createTestingModule({
      providers: [
        UserCreator,
        {
          provide: 'IUserRepository',
          useValue: userMockRepository,
        },
      ],
    }).compile();

    userCreator = moduleRef.get<UserCreator>(UserCreator);
  });

  it('should be defined', () => {
    expect(userCreator).toBeDefined();
  });

  it.only('should create a user', async () => {
    const payload = {
      name: 'Mati',
      surname: 'Ferrero',
      email: 'mati@coderhouse.com',
    };

    when(mockedIUserRepository.create(anyOfClass(User))).thenResolve();

    await userCreator.run({
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
    });

    verify(mockedIUserRepository.create(anyOfClass(User))).once();

    const [firstArg] = capture(mockedIUserRepository.create).last();

    expect(firstArg.name).toEqual(payload.name);
    expect(firstArg.surname).toEqual(payload.surname);
    expect(firstArg.email).toEqual(payload.email);
  });
});
