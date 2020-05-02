import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import authSession from '../middlewares/auth';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import AddAvatarService from '../services/AddAvatarService';

import multerConfig from '../config/multer';

const uploadFile = multer(multerConfig);
const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find({
    select: ['id', 'name', 'email'],
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
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

usersRouter.patch(
  '/avatar',
  authSession,
  uploadFile.single('avatar'),
  async (request, response) => {
    try {
      const avatarFilename = request.file.filename;
      const userId = request.user.id;

      const avatarService = new AddAvatarService();

      const user = await avatarService.execute({ userId, avatarFilename });

      delete user.password;

      return response.json(user);
    } catch (AddAvatarServiceError) {
      return response
        .status(400)
        .json({ error: AddAvatarServiceError.message });
    }
  },
);

export default usersRouter;
