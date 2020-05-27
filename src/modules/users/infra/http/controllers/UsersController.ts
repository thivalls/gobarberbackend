import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = container.resolve(UsersRepository);
    const users = await usersRepository.find({
      select: ['id', 'name', 'email'],
    });

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  }
}
