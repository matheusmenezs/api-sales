import { Request, Response } from 'express';
import SendForgotPasswordService from '../services/SendForgotPasswordService';

class ForgotPasswordController {
  public async generate(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordService();
    await sendForgotPasswordEmail.execute(email);

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
