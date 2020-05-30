import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateSessionService from './CreateSessionService';

describe('Create Session', () => {
  it('Should be able to create a new session', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsersServices = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createSessionService = new CreateSessionService(
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

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should be not able to authenticate with a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsersServices = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createSessionService.execute({
        email: 'johndoe@jest.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await createUsersServices.execute({
      name: 'John Doe',
      email: 'johndoe@jest.com.br',
      password: '123456',
    });

    expect(
      createSessionService.execute({
        email: 'johndoe@jest.com.br',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
