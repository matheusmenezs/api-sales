import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(id);
    if (!user) {
      throw new AppError('This user not found.');
    }
    return user;
  }
}

export default ShowUserService;
