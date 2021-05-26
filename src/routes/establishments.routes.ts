import { Router } from 'express';

import EstablishmentsController from '@controllers/EstablishmentsController';

const establishmentsController = new EstablishmentsController();

const establishmentsRouter = Router();

establishmentsRouter.get('/', establishmentsController.index);

establishmentsRouter.post('/', establishmentsController.create,);

establishmentsRouter.get('/location', establishmentsController.getEstablishmentsByLocation,);

establishmentsRouter.get('/:id', establishmentsController.show,);

establishmentsRouter.put('/:id', establishmentsController.update,);

establishmentsRouter.delete('/:id', establishmentsController.delete,);

export default establishmentsRouter;
