import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class DeleteUserService {
  public async execute(id: string): Promise<void> {
    const user = await UsersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }
    await UsersRepository.remove(user);
  }
}
export default DeleteUserService;
