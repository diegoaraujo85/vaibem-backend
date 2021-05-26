import { celebrate, Joi, Segments } from 'celebrate';
/** Segments.BODY QUERY PARAMS */
import { Router } from 'express';

import SessionController from '@controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionsRouter;
