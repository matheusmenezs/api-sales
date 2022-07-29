import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import {
  createValidator,
  deleteValidator,
  showValidator,
  updateValidator,
} from './UserValidator';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const userController = new UserController();

const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, userController.list);
usersRouter.get('/:id', isAuthenticated, showValidator, userController.show);
usersRouter.post('/', createValidator, userController.create);
usersRouter.put('/:id', updateValidator, userController.update);
usersRouter.delete('/:id', deleteValidator, userController.delete);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
