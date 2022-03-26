import { Router } from 'express';
import UserController from '../controllers/UsersController';
import {
  createValidator,
  deleteValidator,
  showValidator,
  updateValidator,
} from './UserValidator';

const usersRouter = Router();
const userController = new UserController();

usersRouter.get('/', userController.list);
usersRouter.get('/:id', showValidator, userController.show);
usersRouter.post('/', createValidator, userController.create);
usersRouter.put('/:id', updateValidator, userController.update);
usersRouter.delete('/:id', deleteValidator, userController.delete);

export default usersRouter;
