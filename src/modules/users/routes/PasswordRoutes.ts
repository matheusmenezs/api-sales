import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { emailValidator, resetValidator } from './PasswordValidator';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', emailValidator, forgotPasswordController.generate);
passwordRouter.post('/reset', resetValidator, resetPasswordController.create);

export default passwordRouter;
