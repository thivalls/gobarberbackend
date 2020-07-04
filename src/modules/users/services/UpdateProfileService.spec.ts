// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeHashProfile from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProfile;
let updateProfile: UpdateProfileService;

describe('Profile Update', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProfile();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@jest.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@jest.com',
      old_password: '123456',
      password: '654321',
    });

    await expect(updatedUser.name).toBe('John Tre');
  });

  it('Should not be able to update an inexistent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'whatever id hash',
        name: 'John One',
        email: 'johnone@jest.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update with already used email', async () => {
    await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@jest.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@jest.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John One',
        email: 'johnone@jest.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@jest.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@jest.com',
      old_password: '123456',
      password: '654321',
    });

    await expect(updatedUser.password).toBe('654321');
  });

  it('Should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@jest.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@jest.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@jest.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@jest.com',
        old_password: 'wrong-old-password',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
