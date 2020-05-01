import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request: Request, response: Response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find();
  return response.json(users);
});

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const userCreateService = new CreateUserService();

    const user = await userCreateService.execute({ name, email, password });
    return response.json(user);
  } catch (errorCreateUserService) {
    return response.status(400).json({ error: errorCreateUserService.message });
  }
});

export default usersRouter;
