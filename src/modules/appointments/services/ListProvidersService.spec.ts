import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('List all providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers', async () => {
    const fulano = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@jest.com',
      password: '123456',
    });

    const ciclano = await fakeUsersRepository.create({
      name: 'Ciclano',
      email: 'ciclano@jest.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Beutrano',
      email: 'beutrano@jest.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([fulano, ciclano]);
  });
});
