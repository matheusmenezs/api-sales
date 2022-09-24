import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../domain/repositories/IUserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUserTokenRepository,
  ) {}
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
