import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import { IUser } from '../domain/model/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute({
    id,
    name,
    email,
    password,
  }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found.');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
