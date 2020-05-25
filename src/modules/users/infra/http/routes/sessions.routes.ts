import { Router } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.get('/', async (request, response) => {
  return response.json({ message: 'matched' });
});

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createSessionService = new CreateSessionService(usersRepository);

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
