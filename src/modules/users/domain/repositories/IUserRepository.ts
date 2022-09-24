import { ICreateUser } from '../model/ICreateUser';
import { IUser } from '../model/IUser';

export interface IUserRepository {
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(user: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  remove(user: IUser): Promise<void>;
  findAll(): Promise<IUser[]>;
}
