import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/ProductsRoutes';
import usersRouter from '@modules/users/routes/UsersRoutes';
import sessionsRouter from '@modules/users/routes/SessionsRoutes';
import passwordRouter from '@modules/users/routes/PasswordRoutes';
import profileRouter from '@modules/users/routes/ProfileRoutes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
