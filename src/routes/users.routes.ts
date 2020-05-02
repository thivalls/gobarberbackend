import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request: Request, response: Response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find({
    select: ['id', 'name', 'email'],
  });

  return response.json(users);
});

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (errorCreateUserService) {
    return response.status(400).json({ error: errorCreateUserService.message });
  }
});

export default usersRouter;
