import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateSessionService from './CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSessionService: CreateSessionService;

describe('Create Session', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new session', async () => {
    const createUsersServices = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsersServices.execute({
      name: 'Thiago',
      email: 'teste@jest.com.br',
      password: '123456',
    });

    const response = await createSessionService.execute({
      email: 'teste@jest.com.br',
      password: '123456',
    });

    await expect(response).toHaveProperty('token');
    await expect(response.user).toEqual(user);
  });

  it('Should be not able to authenticate with a non existing user', async () => {
    await expect(
      createSessionService.execute({
        email: 'johndoe@jest.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be not able to authenticate with invalid credentials', async () => {
    const createUsersServices = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsersServices.execute({
      name: 'John Doe',
      email: 'johndoe@jest.com.br',
      password: '123456',
    });

    await expect(
      createSessionService.execute({
        email: 'johndoe@jest.com.br',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
