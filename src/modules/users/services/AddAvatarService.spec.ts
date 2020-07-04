import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AddAvatarService from './AddAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatarService: AddAvatarService;

describe('Avatar Update', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateAvatarService = new AddAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@jest.com',
      password: '123456',
    });

    await updateAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await expect(user.avatar).toBe('avatar.jpg');
  });

  it('Should not be able to update user avatar from non existing user', async () => {
    await expect(
      updateAvatarService.execute({
        userId: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to delete old user avatar when is updating with new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@jest.com',
      password: '123456',
    });

    await updateAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateAvatarService.execute({
      userId: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    await expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    await expect(user.avatar).toBe('avatar2.jpg');
  });
});
