import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Thiago',
      email: 'teste@jest.com.br',
      password: '123456',
    });

    await expect(user).toHaveProperty('id');
  });

  it('Should not be able to create user with same email', async () => {
    await createUser.execute({
      name: 'Thiago',
      email: 'teste@jest.com.br',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Thiago',
        email: 'teste@jest.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createUser.execute({
        name: 'Thiago',
        email: 'teste@jest.com.br',
        password: '123456',
      }),
    ).rejects.toEqual({
      message: 'This email already exists',
      statusCode: 400,
    });
  });
});
