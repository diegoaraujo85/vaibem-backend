import { Router } from 'express';

import ensureAuthenticated from '@controllers/middlewares/ensureAuthenticated';
import establishmentsRouter from '@routes/establishments.routes';
import sessionsRouter from '@routes/sessions.routes';
import usersRouter from '@routes/users.routes';

const routes = Router();

routes.get('/test', (request, response) => {
  return response.json({ test: true });
});

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated); // todas as rotas abaixo irão usar o middleware de autenticação

routes.use('/users', usersRouter);

routes.use('/establishments', establishmentsRouter);


export default routes;