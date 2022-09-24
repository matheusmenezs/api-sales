import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute({ user_id }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
