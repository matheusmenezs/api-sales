import Customer from '@modules/customers/typeorm/entities/Customer';
import Order from '@modules/orders/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';
import UserToken from '@modules/users/typeorm/entities/UserToken';
import { DataSource } from 'typeorm';
import { CreateOrders1609036872019 } from './migrations/1609036872019-CreateOrders';
import { AddCustomerIdToOrders1609037132700 } from './migrations/1609037132700-AddCustomerIdToOrders';
import { CreateOrdersProducts1609038202583 } from './migrations/1609038202583-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1609038414735 } from './migrations/1609038414735-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1609038674490 } from './migrations/1609038674490-AddProductIdToOrdersProducts';
import { CreateProducts1607437608841 } from './migrations/1647802471827-CreateProducts';
import { CreateUsers1648207407461 } from './migrations/1648317183372-CreateUsers';
import { CreateUsersTokens1648821815049 } from './migrations/1648821815049-CreateUsersTokens';
import { CreateCustomers1659024372047 } from './migrations/1659024372047-CreateCustomers';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'dbsales',
  entities: [User, UserToken, Product, Customer, Order, OrdersProducts],
  migrations: [
    CreateUsers1648207407461,
    CreateUsersTokens1648821815049,
    CreateProducts1607437608841,
    CreateCustomers1659024372047,
    CreateOrders1609036872019,
    AddCustomerIdToOrders1609037132700,
    CreateOrdersProducts1609038202583,
    AddOrderIdToOrdersProducts1609038414735,
    AddProductIdToOrdersProducts1609038674490,
  ],
});
