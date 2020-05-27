import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import authSession from '@modules/users/infra/http/middlewares/auth';
import UsersController from '../controllers/UsersController';
import AvatarsController from '../controllers/AvatarsController';

const upload = multer(uploadConfig);
const usersRouter = Router();
const usersController = new UsersController();
const avatarsController = new AvatarsController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  authSession,
  upload.single('avatar'),
  avatarsController.create,
);

export default usersRouter;
