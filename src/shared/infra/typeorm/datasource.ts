import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { DataSource } from 'typeorm';

import { CreateUsers1648207407471 } from './migrations/1648207407471-CreateUsers';
import { CreateUsersTokens1648407407461 } from './migrations/1648407407461-CreateUsersTokens';
import { CreateProducts1648307407461 } from './migrations/1648307407461-CreateProducts';
import { CreateCustomers1648507507481 } from './migrations/1648507507481-CreateCustomers';
import { CreateOrders1648607507481 } from './migrations/1648607507481-CreateOrders';
import { AddCustomerIdToOrders1648707507481 } from './migrations/1648707507481-AddCustomerIdToOrders';
import { CreateOrdersProducts1648807507481 } from './migrations/1648807507481-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1648907507481 } from './migrations/1648907507481-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1648909507481 } from './migrations/1648909507481-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'dbsales',
  entities: [User, UserToken, Product, Customer, Order, OrdersProducts],
  migrations: [
    CreateUsers1648207407471,
    CreateUsersTokens1648407407461,
    CreateProducts1648307407461,
    CreateCustomers1648507507481,
    CreateOrders1648607507481,
    AddCustomerIdToOrders1648707507481,
    CreateOrdersProducts1648807507481,
    AddOrderIdToOrdersProducts1648907507481,
    AddProductIdToOrdersProducts1648909507481,
  ],
});
