import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import authSession from '../middlewares/auth';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import AddAvatarService from '../services/AddAvatarService';

import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find({
    select: ['id', 'name', 'email'],
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  authSession,
  upload.single('avatar'),
  async (request, response) => {
    const avatarFilename = request.file.filename;
    const userId = request.user.id;

    const avatarService = new AddAvatarService();

    const user = await avatarService.execute({ userId, avatarFilename });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
