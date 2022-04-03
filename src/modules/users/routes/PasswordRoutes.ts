import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import { emailValidator } from './UserValidator';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/forgot', emailValidator, forgotPasswordController.generate);

export default passwordRouter;
