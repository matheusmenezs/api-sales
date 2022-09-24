import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }
    await this.usersRepository.remove(user);
  }
}
export default DeleteUserService;
