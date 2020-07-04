import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail && checkEmail.id !== user_id) {
      throw new AppError('This email has been alread used');
    }

    user.name = name;
    user.email = email;

    if (password && old_password) {
      const checkOldPassorwd = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassorwd) {
        throw new AppError('The old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (password && !old_password) {
      throw new AppError('The old password is required');
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
