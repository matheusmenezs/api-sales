import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersReposirory: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<IUser> {
    const emailExists = await this.usersReposirory.findByEmail(email);

    if (emailExists) {
      throw new AppError('This email already exists');
    }

    const hashPassword = await hash(password, 8);

    const user = await this.usersReposirory.create({
      name,
      email,
      password: hashPassword,
    });

    await this.usersReposirory.save(user);

    return user;
  }
}

export default CreateUserService;
