import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid Email or Password');
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new Error('Invalid Email or Password');
    }

    return { user };
    // criar token (service)
  }
}

export default CreateSessionService;
