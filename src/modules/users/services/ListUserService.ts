import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/model/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUserService;
