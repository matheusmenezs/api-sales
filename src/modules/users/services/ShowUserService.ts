import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('This user not found.');
    }
    return user;
  }
}

export default ShowUserService;
