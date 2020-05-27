import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import authSession from '@modules/users/infra/http/middlewares/auth';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const upload = multer(uploadConfig);
const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  authSession,
  upload.single('avatar'),
  userAvatarController.create,
);

export default usersRouter;
