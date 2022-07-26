import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { DataSource } from 'typeorm';
import { CreateProducts1607437608841 } from './migrations/1647802471827-CreateProducts';
import { CreateUsers1648207407461 } from './migrations/1648317183372-CreateUsers';
import { CreateUsersTokens1648821815049 } from './migrations/1648821815049-CreateUsersTokens';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'dbsales',
  entities: [User, UserToken, Product],
  migrations: [
    CreateUsers1648207407461,
    CreateUsersTokens1648821815049,
    CreateProducts1607437608841,
  ],
});
