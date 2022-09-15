import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found.');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
