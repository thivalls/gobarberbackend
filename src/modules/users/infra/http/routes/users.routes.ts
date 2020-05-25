import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import AddAvatarService from '@modules/users/services/AddAvatarService';

import uploadConfig from '@config/upload';
import authSession from '@modules/users/infra/http/middlewares/auth';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const users = await usersRepository.find({
    select: ['id', 'name', 'email'],
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createUserService = new CreateUserService(usersRepository);

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

    const usersRepository = new UsersRepository();
    const avatarService = new AddAvatarService(usersRepository);

    const user = await avatarService.execute({ userId, avatarFilename });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
