import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const findUserWithSameEmail = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (findUserWithSameEmail) {
      throw Error('This email already exists');
    }

    const user = userRepository.create({ name, email, password });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
