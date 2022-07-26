import { dataSource } from '@shared/typeorm/datasource';
import UserToken from '../entities/UserToken';

export const UserTokensRepository = dataSource.getRepository(UserToken).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  },
  async generate(user_id: string): Promise<UserToken> {
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  },
});
