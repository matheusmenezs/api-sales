import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', async (request: Request, response: Response) => {
  response.status(200).json({ message: 'Hello World!' });
});

export default routes;
