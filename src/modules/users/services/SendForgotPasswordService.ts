import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUserTokenRepository,
  ) {}
  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.usersTokenRepository.generate(user.id);

    console.log(token);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
