import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/model/IUser';
import DiskStorageProvider from '@shared/providers/storage/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/storage/S3StorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);
    const storageProvider = new DiskStorageProvider();

    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      const storageProvider = new S3StorageProvider();
      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const fileName = await storageProvider.saveFile(avatarFilename);

      user.avatar = fileName;
    } else {
      const storageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const fileName = await storageProvider.saveFile(avatarFilename);

      user.avatar = fileName;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
