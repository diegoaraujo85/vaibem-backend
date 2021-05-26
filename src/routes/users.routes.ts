import { Router } from 'express';

import UsersController from '@controllers/UsersController';

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.get('/:id', usersController.show,);

usersRouter.put('/:id', usersController.update,);

usersRouter.delete('/:id', usersController.delete,);

export default usersRouter;
