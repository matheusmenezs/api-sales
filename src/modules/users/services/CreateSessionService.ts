import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/model/IUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersReposirory: IUserRepository,
  ) {}
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersReposirory.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
