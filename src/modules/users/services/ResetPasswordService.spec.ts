// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPassowordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPassowordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPasswordService = new ResetPassowordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('Should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({
      token,
      password: '123123',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });

  it('Should not be able to reset password with invalid token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123123',
      }),
    ).rejects.toEqual({
      message: 'Invalid token',
      statusCode: 400,
    });
  });

  // it('Should not be able to reset password from a non-existing user', async () => {
  //   const user = await fakeUsersRepository.create({
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: '123456',
  //   });

  //   const { token, user_id } = await fakeUserTokensRepository.generate(user.id);

  //   await expect(
  //     resetPasswordService.execute({
  //       token: { ...token, user_id: 'non-existing-user-id' },
  //       password: '123123',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);

  //   await expect(
  //     resetPasswordService.execute({
  //       token: { ...token, user_id: 'non-existing-user-id' },
  //       password: '123123',
  //     }),
  //   ).rejects.toEqual({
  //     message: 'User not found',
  //     statusCode: 400,
  //   });
  // });
});
