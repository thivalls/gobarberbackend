import { Router, Request, Response } from 'express';

const routes = new Router();

routes.get('/', (request: Request, response: Response) =>
  response.json({ route: 'Matched root route' })
);

export default routes;
