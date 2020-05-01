import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.get('/', async (request, response) => {
  return response.json({ message: 'matched' });
});

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();

    const { user } = await createSessionService.execute({ email, password });

    // retornar token (rota) user provisorio
    return response.json({ user });
  } catch (errorCreateSessionService) {
    return response
      .status(400)
      .json({ error: errorCreateSessionService.message });
  }
});

export default sessionsRouter;
