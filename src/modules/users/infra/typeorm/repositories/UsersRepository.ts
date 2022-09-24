import { Repository } from 'typeorm';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { dataSource } from '@shared/infra/typeorm/datasource';
import User from '../entities/User';
import { IUser } from '@modules/users/domain/model/IUser';
import { ICreateUser } from '@modules/users/domain/model/ICreateUser';

export class UsersRepository implements IUserRepository {
  private ormRepository: Repository<IUser>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async findByName(name: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user);

    return user;
  }

  public async remove(user: IUser): Promise<void> {
    await this.ormRepository.remove(user);
  }
  public async findAll(): Promise<IUser[]> {
    const users = await this.ormRepository.find();
    return users;
  }
}
