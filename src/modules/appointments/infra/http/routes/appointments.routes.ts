import { Router } from 'express';

import auth from '@modules/users/infra/http/middlewares/auth';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(auth);

appointmentsRouter.get('/', appointmentsController.index);
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
