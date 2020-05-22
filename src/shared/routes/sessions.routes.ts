import { Router } from 'express';

import CreateSessionService from '../../modules/users/services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.get('/', async (request, response) => {
  return response.json({ message: 'matched' });
});

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = new CreateSessionService();

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;