import { Request, Response } from 'express';
import SendForgotPasswordService from '@modules/users/services/SendForgotPasswordService';
import { container } from 'tsyringe';

class ForgotPasswordController {
  public async generate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordService,
    );
    await sendForgotPasswordEmail.execute(email);

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
