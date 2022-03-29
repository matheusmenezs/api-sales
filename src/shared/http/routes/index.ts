import { Router } from 'express';
import productsRouter from '@modules/products/routes/ProductsRoutes';
import usersRouter from '@modules/users/routes/UsersRoutes';
import sessionsRouter from '@modules/users/routes/SessionsRoutes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
